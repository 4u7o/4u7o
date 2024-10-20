import { _4u7oClient, logger, type Module } from "4u7o";
import { EventEmitter } from "events";

export abstract class BaseModule implements Module {
  public abstract name: string;
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
}
