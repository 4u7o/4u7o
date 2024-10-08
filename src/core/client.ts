import { config, logger } from "4u7o";
import type { Module } from "4u7o";
import path from "node:path";
import fs from "node:fs";
import { Client, GatewayIntentBits } from "discord.js";

export class _4u7oClient extends Client<boolean> {
  private modules: Map<string, Module> = new Map();

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

  public loadModules() {
    const moduleDir = path.resolve(__dirname, "modules");
    const moduleFiles = fs.readdirSync(moduleDir);

    moduleFiles.forEach(async (file) => {
      const modulePath = path.join(moduleDir, file);
      const mod: Module = (await import(modulePath)).default;

      mod.load();
      this.modules.set(mod.name, mod);

      logger.info(`Loaded module: ${mod.name}`);
    });
  }

  public reloadModule(moduleName: string) {
    const mod = this.modules.get(moduleName);

    if (mod) {
      mod.reload();

      logger.info(`Reloaded module: ${mod.name}`);
    }
  }

  public unloadModule(moduleName: string) {
    const mod = this.modules.get(moduleName);

    if (mod) {
      mod.unload();

      logger.info(`Unloaded module: ${mod.name}`);
    }
  }
}
