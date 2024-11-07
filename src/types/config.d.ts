export interface DiscordConfig {
  TOKEN_ID: string;
  CLIENT_ID: string;
  WEBHOOK_URL: string;
}

export interface SpotifyConfig {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export interface OracleConfig {
  region: string;
  bucketName: string;
  bucketUrl: string;
  bucketPARWrite: string;
  bucketPARName: string;
}

export interface AppConfig {
  NODE_ENV: "development" | "production" | "test";
  discord: DiscordConfig;
  spotify: SpotifyConfig;
  oracle: OracleConfig;
}

export interface ProcessVariables extends NodeJS.ProcessEnv {
  APP_ENV: Environment;
  TOKEN_ID: string;
  CLIENT_ID: string;
  DISCORD_WEBHOOK_URL: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  OPENAI_API_KEY: string;
  ORACLE_REGION: string;
  ORACLE_BUCKET: string;
  ORACLE_BUCKET_URL: string;
  ORACLE_BUCKET_PAR_NAME: string;
  ORACLE_BUCKET_PAR_WRITE: string;
}
