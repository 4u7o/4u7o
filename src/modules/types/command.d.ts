import type { _4u7oClient } from "4u7o";
import type { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

interface Command {
  info: {
    name: string;
    description: string;
    category: string;
    aliases: string[];
  };
  execute: (interaction: Interaction) => Promise<void>;
}

export interface SlashCommand extends Command {
  builder: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction, client: _4u7oClient) => Promise<void>;
}
