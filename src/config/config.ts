import type { AppConfig, DiscordConfig, ProcessVariables, SpotifyConfig } from "4u7o";

class Config implements AppConfig {
  private static instance: Config;
  public NODE_ENV: "development" | "production" | "test";
  public discord: DiscordConfig;
  public spotify: SpotifyConfig;

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
  }

  static getInstance(): Config {
    if (!this.instance) {
      this.instance = new Config();
    }
    return this.instance;
  }
}

export const config = Config.getInstance();
