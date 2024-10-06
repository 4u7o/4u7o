import { config, logger } from "4u7o";
import { Client, GatewayIntentBits } from "discord.js";

export class _4u7oClient extends Client<boolean> {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessagePolls,
        GatewayIntentBits.DirectMessages,

        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessagePolls,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
      ],
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true,
      },
      failIfNotExists: true,
    });
  }

  /**
   * Connect to the discord bot and run related initial function
   * @override
   * @param token
   */
  override login(token?: string): Promise<string> {
    //Initial modules,...
    token = token || config.discord.TOKEN_ID;
    return super.login(token);
  }

  private initEvents() {
    this.on("ready", () => {
      logger.info("The bot has been ready!");
    });
  }
}
