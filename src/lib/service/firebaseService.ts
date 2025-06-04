// services/firebaseService.ts
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getFile, listFiles, uploadFile } from '../api/drive';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { toHex } from '@dfinity/agent';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const env = process.env.NEXT_PUBLIC_ENV;

export interface AuthUserInfo {
  principal: string | null;
  event: string | null;
  contents: string | null;
  user: User | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  idToken: string;
  accessToken: string | undefined;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (): Promise<AuthUserInfo> => {
  provider.addScope('https://www.googleapis.com/auth/drive.appdata');
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const accessToken =
    GoogleAuthProvider.credentialFromResult(result)?.accessToken;
  const idToken = await user.getIdToken();

  console.log('id Token: ', idToken, ', accessToken:', accessToken);

  let files = await listFiles(env ?? '', accessToken ?? '');

  console.log('file data: ', files);

  let contents = '';
  let event = '';

  if (files.length > 0) {
    const file = files[0];
    try {
      const res = await getFile(accessToken ?? '', file.id);
      contents = res;
      event = 'login';
    } catch (e) {
      console.warn('Failed to get file content', e);
      throw new Error('failed to get file');
    }
  } else {
    const arr = new Uint8Array(32);
    //random private key
    crypto.getRandomValues(arr);

    let privateKey = encodeEd25519PrivateKeyToPkcs8Base64(arr);
    try {
      const res = await uploadFile(accessToken ?? '', privateKey);

      console.log('upload data', res);
      event = 'signup';
      contents = res.name;
    } catch (e) {
      console.warn('Failed to upload file content', e);
      throw new Error('failed to upload file');
    }
  }

  //checking this logic
  let p = await trySetupFromPrivateKey(contents);

  console.log('principal: ', p?.principal);

  return {
    principal: p?.principal ?? '',
    event,
    contents,
    user,
    idToken,
    accessToken,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
};

export const logout = async () => await signOut(auth);

export const onUserChanged = (
  cb: (user: User | null) => void,
): (() => void) => {
  return onAuthStateChanged(auth, cb);
};

export const getAuthInstance = () => auth;

function encodeEd25519PrivateKeyToPkcs8Base64(secretKey: Uint8Array): string {
  if (secretKey.length !== 32) throw new Error('Invalid secret key length');

  const pkcs8Prefix = Uint8Array.from([
    0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70,
    0x04, 0x22, 0x04, 0x20,
  ]);

  const pkcs8Key = new Uint8Array(pkcs8Prefix.length + 32);
  pkcs8Key.set(pkcs8Prefix, 0);
  pkcs8Key.set(secretKey, pkcs8Prefix.length);

  return btoa(String.fromCharCode(...pkcs8Key));
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function extractEd25519RawKey(pkcs8: Uint8Array): Uint8Array {
  const len = pkcs8.length;
  if (len < 34) throw new Error('Invalid PKCS#8 data length');

  return pkcs8.slice(len - 32);
}

export const trySetupFromPrivateKey = async (privateKeyBase64: string) => {
  try {
    const privateKeyBytes = base64ToUint8Array(privateKeyBase64);

    let rawKey: Uint8Array;

    if (privateKeyBytes.length === 32) {
      rawKey = privateKeyBytes;
    } else if (privateKeyBytes.length === 83 || privateKeyBytes.length > 32) {
      rawKey = extractEd25519RawKey(privateKeyBytes);
    } else {
      throw new Error(
        `Unsupported key format: got ${privateKeyBytes.length} bytes`,
      );
    }

    const identity = Ed25519KeyIdentity.fromSecretKey(
      rawKey.buffer.slice(0) as ArrayBuffer,
    );

    const principal = identity.getPrincipal().toText();
    const publicKeyHex = toHex(identity.getPublicKey().toDer());

    console.log('Principal:', principal);
    console.log('Public Key:', publicKeyHex);

    return {
      privateKeyBase64,
      principal,
      publicKeyHex,
      identity,
    };
  } catch (err) {
    console.error('Failed to setup identity from private key:', err);
    return null;
  }
};
