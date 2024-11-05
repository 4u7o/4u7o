import type { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";
import type { CommandInfo, ExecuteCIIFunction, MessageExecuteFunction } from ".";

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
  messageExecute?: MessageExecuteFunction;
  constructor(
    info: CommandInfo,
    builder: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
    execute: ExecuteCIIFunction,
    messageExecute?: MessageExecuteFunction,
  ) {
    super(info);
    this.execute = execute;
    this.builder = builder;
    this.messageExecute = messageExecute;
  }
}
