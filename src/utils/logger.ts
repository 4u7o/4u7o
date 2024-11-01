import { dayts, config, Const, LogLevel } from "4u7o";
import { WebhookClient } from "discord.js";

class _4u7oWebhook extends WebhookClient {
  private static instance: _4u7oWebhook;

  constructor() {
    super({ url: config.discord.WEBHOOK_URL });
  }

  static getInstance() {
    if (!this.instance) {
      return (this.instance = new _4u7oWebhook());
    }
    return this.instance;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: unknown,
  ): string {
    const timestamp = dayts.now();
    let formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    if (context) {
      formattedMessage += `\nContext: ${JSON.stringify(context, null, 2)}`;
    }

    return `\`\`\`ts\n${formattedMessage}\`\`\``;
  }

  private log(level: LogLevel, message: string, context?: unknown) {
    const formattedMessage = this.formatMessage(level, message, context);
    this.send({
      content: formattedMessage,
      username: Const.WEBHOOK_USERNAME,
      avatarURL: Const.WEBHOOK_AVATAR_URL,
    });
  }

  info(message: string, context?: unknown) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: unknown) {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: unknown, context?: unknown) {
    const errorMessage =
      message instanceof Error
        ? `${message.message}\n${message.stack}`
        : (message as string);
    this.log(LogLevel.ERROR, errorMessage, context);
  }
}

export const logger = _4u7oWebhook.getInstance();
