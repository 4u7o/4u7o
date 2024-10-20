import { BaseModule } from "4u7o";
class SystemModule extends BaseModule {
  public name = "SystemModule";

  protected override onLoad(): void {
    // Do something when the module is loaded
  }

  protected override onReload(): void {
    // Do something when the module is reloaded
  }

  protected override onUnload(): void {
    // Do something when the module is unloaded
  }
}

export default new SystemModule();
