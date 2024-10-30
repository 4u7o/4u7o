import type { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";
import type { CommandInfo, ExecuteCIIFunction } from ".";

export interface Command {
  info: CommandInfo;
  execute: unknown;
}

export abstract class BaseCommand implements Command {
  public info: CommandInfo;
  abstract execute: unknown;

  constructor(info: CommandInfo) {
    this.info = info;
  }
}

export class SlashCommand extends BaseCommand {
  public builder: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: ExecuteCIIFunction;
  constructor(
    info: CommandInfo,
    builder: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
    execute: ExecuteCIIFunction,
  ) {
    super(info);
    this.execute = execute;
    this.builder = builder;
  }
}
