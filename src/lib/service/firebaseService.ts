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
import { config } from '@/config';
import { logger } from '../logger';

const firebaseConfig = {
  apiKey: config.firebase_api_key,
  authDomain: config.firebase_auth_domain,
  projectId: config.firebase_project_id,
  storageBucket: config.firebase_storage_bucket,
  messagingSenderId: config.firebase_messaging_sender_id,
  appId: config.firebase_app_id,
  measurementId: config.firebase_measurement_id,
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

  logger.debug('id Token: ', idToken, ', accessToken:', accessToken);

  let files = await listFiles(env ?? '', accessToken ?? '');

  logger.debug('file data: ', files);

  let contents = '';
  let event = '';

  if (files.length > 0) {
    const file = files[0];
    try {
      const res = await getFile(accessToken ?? '', file.id);
      contents = res;
      event = 'login';
    } catch (e) {
      logger.error('Failed to get file content', e);
      throw new Error('failed to get file');
    }
  } else {
    const arr = new Uint8Array(32);
    //random private key
    crypto.getRandomValues(arr);

    let privateKey = encodeEd25519PrivateKeyToPkcs8Base64(arr);
    try {
      const res = await uploadFile(accessToken ?? '', privateKey);

      logger.debug('upload data', res);
      event = 'signup';
      contents = res.name;
    } catch (e) {
      logger.error('Failed to upload file content', e);
      throw new Error('failed to upload file');
    }
  }

  //TODO: checking icp logic
  let p = await trySetupFromPrivateKey(contents);

  logger.debug('principal: ', p?.principal);

  //TODO: implement after icp logic (query check email api)

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
export const trySetupFromPrivateKey = async (privateKeyBase64: string) => {
  try {
    const pkcs8 = base64ToUint8Array(privateKeyBase64);

    logger.debug('private key bytes after base64 decoding: ', pkcs8);

    let privateKey = pkcs8.buffer.slice(19, 51) as ArrayBuffer;
    let publicKey = pkcs8.buffer.slice(51, 83) as ArrayBuffer;

    logger.debug('Private Key:', privateKey);
    logger.debug('Public Key:', publicKey);

    const identity = Ed25519KeyIdentity.fromKeyPair(publicKey, privateKey);

    const principal = identity.getPrincipal().toText();
    const publicKeyHex = toHex(identity.getPublicKey().toDer());

    logger.debug('Principal:', principal);
    logger.debug('Public Key:', publicKeyHex);

    return {
      privateKeyBase64,
      principal,
      publicKeyHex,
      identity,
    };
  } catch (err) {
    logger.error('Failed to setup identity from private key:', err);
    return null;
  }
};
