import { CommandType, logger } from "4u7o";
import type { _4u7oClient, ExecuteCIIFunction, MessageExecuteFunction } from "4u7o";
import type { Interaction } from "discord.js";

export const clientEventLoader = async (client: _4u7oClient) => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    try {
      let triggered;
      if (interaction.isChatInputCommand()) {
        triggered = client.commands.getCommandByAlias(
          `${interaction.commandName}_${CommandType.Slash}`,
        ) as ExecuteCIIFunction;
        await triggered(interaction, client);
      }

      if (!triggered) {
        throw new Error(`Cannot find the command meet the interaction`, { cause: interaction });
      }
    } catch (error) {
      logger.error(error, {
        label: "interactionCreate",
        interaction,
      });
    }
  });

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(".") !== 0) return;
    try {
      const commandName = message.content.slice(1).trim().split(/ +/)[0].toLowerCase();
      const triggered = client.commands.getCommandByAlias(commandName) as MessageExecuteFunction;
      await triggered(message, client);
    } catch (error) {
      logger.error(error, {
        label: "messageCreate",
        message,
      });
    }
  });
};
