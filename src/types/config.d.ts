export interface DiscordConfig {
  TOKEN_ID: string;
  CLIENT_ID: string;
  WEBHOOK_URL: string;
}

export interface AppConfig {
  NODE_ENV: "development" | "production" | "test";
  discord: DiscordConfig;
}

export interface ProcessVariables extends NodeJS.ProcessEnv {
  APP_ENV: Environment;
  TOKEN_ID: string;
  CLIENT_ID: string;
  DISCORD_WEBHOOK_URL: string;
}
