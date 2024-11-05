import type { _4u7oClient, CommandType } from "4u7o";
import type {
  ChatInputCommandInteraction,
  Interaction,
  InteractionResponse,
  Message,
} from "discord.js";

export interface CommandInfo {
  name: string;
  type: CommandType;
  description: string;
  category: string;
  aliases: string[];
}

export type ExecuteFunction = (
  interaction: Interaction,
  client: _4u7oClient,
) => Promise<InteractionResponse<boolean> | undefined>;

export type ExecuteCIIFunction = (
  interaction: ChatInputCommandInteraction,
  client: _4u7oClient,
) => Promise<InteractionResponse<boolean> | undefined>;

export type MessageExecuteFunction = (
  message: Message,
  client: _4u7oClient,
) => Promise<OmitPartialGroupDMChannel<Message<boolean>> | undefined>;
