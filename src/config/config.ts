import type { AppConfig, DiscordConfig, OracleConfig, ProcessVariables, SpotifyConfig } from "4u7o";

class Config implements AppConfig {
  private static instance: Config;
  public NODE_ENV: "development" | "production" | "test";
  public discord: DiscordConfig;
  public spotify: SpotifyConfig;
  public oracle: OracleConfig;

  private constructor() {
    const processVariables = process.env as ProcessVariables;

    this.NODE_ENV = processVariables.APP_ENV;
    this.discord = {
      CLIENT_ID: processVariables.CLIENT_ID,
      TOKEN_ID: processVariables.TOKEN_ID,
      WEBHOOK_URL: processVariables.DISCORD_WEBHOOK_URL,
    };
    this.spotify = {
      CLIENT_ID: processVariables.SPOTIFY_CLIENT_ID,
      CLIENT_SECRET: processVariables.SPOTIFY_CLIENT_SECRET,
    };
    this.oracle = {
      region: processVariables.ORACLE_REGION,
      bucketName: processVariables.ORACLE_BUCKET,
      bucketUrl: processVariables.ORACLE_BUCKET_URL,
      bucketPARName: processVariables.ORACLE_BUCKET_PAR_NAME,
      bucketPARWrite: processVariables.ORACLE_BUCKET_PAR_WRITE,
    };
  }

  static getInstance(): Config {
    if (!this.instance) {
      this.instance = new Config();
    }
    return this.instance;
  }
}

export const config = Config.getInstance();
