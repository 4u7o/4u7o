import type { Command } from "4u7o";

class CommandMap extends Map<string, Command> {
  public override set(key: string, value: Command): this {
    return super.set(key, value);
  }

  public override get(key: string): Command | undefined {
    return super.get(key);
  }

  public override delete(key: string): boolean {
    return super.delete(key);
  }

  public override clear(): void {
    super.clear();
  }
}

export { CommandMap };
