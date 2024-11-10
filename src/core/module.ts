import { _4u7oClient, logger, SlashCommand, type Module } from "4u7o";
import { readdirSync } from "node:fs";
import { EventEmitter } from "events";

export abstract class BaseModule implements Module {
  public abstract name: string;
  public abstract dirName: string;
  private eventEmitter = new EventEmitter();

  constructor() {
    this.eventEmitter.on("moduleRegister", this.handleModuleAction.bind(this));
  }

  load(client?: _4u7oClient): void {
    this.emitModuleEvent("load", "start");
    this.onLoad(client);
    this.emitModuleEvent("load", "end");
  }

  reload(): void {
    this.emitModuleEvent("reload", "start");
    this.onReload();
    this.emitModuleEvent("reload", "end");
  }

  unload(): void {
    this.emitModuleEvent("unload", "start");
    this.onUnload();
    this.emitModuleEvent("unload", "end");
  }

  protected abstract onLoad(client?: _4u7oClient): void;
  protected abstract onReload(): void;
  protected abstract onUnload(): void;

  private emitModuleEvent(action: string, phase: string) {
    this.eventEmitter.emit("moduleRegister", {
      action,
      phase,
      moduleName: this.name,
    });
  }

  private handleModuleAction(event: { action: string; phase: string; moduleName: string }) {
    const { action, phase, moduleName } = event;
    if (phase === "start") {
      logger.info(`Starting ${action} module: ${moduleName}`);
    } else if (phase === "end") {
      logger.info(`Completed ${action} module: ${moduleName}`);
    }
  }

  public async loadCommands(client: _4u7oClient): Promise<void> {
    logger.info("Loading commands");
    const folders = readdirSync(`${this.dirName}/commands`, { withFileTypes: true }).filter(
      (folder) => folder.isDirectory(),
    );

    for (const folder of folders) {
      const files = readdirSync(`${this.dirName}/commands/${folder.name}`, {
        withFileTypes: true,
      }).filter((file) => file.isFile() && file.name.endsWith(".ts"));

      const commandList = [];

      for (const file of files) {
        try {
          const command = (await import(`${this.dirName}/commands/${folder.name}/${file.name}`))
            .default as SlashCommand;
          client.commands.insertCommand(command);
          commandList.push(command);
        } catch (error) {
          logger.error(error, {
            message: `Failed to load command: ${file.name}`,
          });
        }
      }
    }
  }
}
