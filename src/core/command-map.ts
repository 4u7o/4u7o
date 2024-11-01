import { type Command, SlashCommand } from "4u7o";

class CommandMap extends Map<string, SlashCommand | Command> {
  public override set(key: string, value: SlashCommand | Command): this {
    return super.set(key, value);
  }

  public override get(key: string): SlashCommand | Command | undefined {
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
