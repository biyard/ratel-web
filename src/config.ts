type Config = {
  env: string;
  firebase_api_key: string;
  firebase_auth_domain: string;
  firebase_project_id: string;
  firebase_storage_bucket: string;
  firebase_messaging_sender_id: string;
  firebase_app_id: string;
  firebase_measurement_id: string;
  api_url: string;

  log_level: string;
};

export const config: Config = {
  env: process.env.NEXT_PUBLIC_ENV || 'dev',
  firebase_api_key: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  firebase_auth_domain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  firebase_project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  firebase_storage_bucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  firebase_messaging_sender_id:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  firebase_app_id: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  firebase_measurement_id:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
  api_url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',

  log_level: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
};
