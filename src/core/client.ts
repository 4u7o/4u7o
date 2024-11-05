import { CommandTrie, config, logger } from "4u7o";
import type { Module } from "4u7o";
import path from "node:path";
import fs from "node:fs";
import { Client, GatewayIntentBits } from "discord.js";
import DisTube from "distube";
import { clientEventLoader } from "events/client";

export class _4u7oClient extends Client<boolean> {
  private modules: Map<string, Module> = new Map();
  public distube: DisTube | undefined;
  public commands: CommandTrie = new CommandTrie();
  constructor() {
    super({
      intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessagePolls,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessagePolls,
        GatewayIntentBits.GuildVoiceStates,
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
  override async login(token?: string): Promise<string> {
    //Initial modules,...
    await this.loadModules();
    await this.loadEvents();
    token = token || config.discord.TOKEN_ID;
    return super.login(token);
  }

  public async loadEvents() {
    await clientEventLoader(this);
  }

  public async loadModules() {
    const moduleDir = path.resolve(process.cwd(), "src/modules");
    const moduleFiles = fs.readdirSync(moduleDir);
    logger.info(`${moduleFiles.length} modules have been detected`, moduleFiles);

    moduleFiles.forEach(async (file) => {
      try {
        const modulePath = path.join(moduleDir, file);
        const mod: Module = (await import(modulePath)).default;

        mod.load(this);
        this.modules.set(mod.name, mod);
      } catch (error) {
        logger.error(error, { message: `Failed to load module: ${file}` });
      }
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
