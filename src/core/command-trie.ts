import { type Command, SlashCommand } from "4u7o";

interface TrieNode {
  children: Map<string, TrieNode>;
  command?: SlashCommand | Command;
  isEndOfWord: boolean;
  isOriginalCommand: boolean;
}

class CommandTrie {
  private root: TrieNode;

  constructor() {
    this.root = { children: new Map(), isEndOfWord: false, isOriginalCommand: false };
  }

  insertCommand(command: SlashCommand | Command): void {
    this.insertAlias(`${command.info.name}_${command.info.type}`, command, true);

    if (command.info.aliases) {
      command.info.aliases.forEach((alias) => {
        this.insertAlias(alias, command, false);
      });
    }
  }

  private insertAlias(
    alias: string,
    command: SlashCommand | Command,
    isOriginalCommand: boolean,
  ): void {
    let node = this.root;

    for (const char of alias) {
      if (!node.children.has(char)) {
        node.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
          isOriginalCommand: false,
        });
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
    node.command = command;
    node.isOriginalCommand = isOriginalCommand;
  }

  getCommandByAlias(alias: string) {
    let node = this.root;
    for (const char of alias) {
      if (!node.children.has(char)) return;
      node = node.children.get(char)!;
    }

    if (node.isEndOfWord && node.command) {
      if (node.command instanceof SlashCommand) {
        if (node.isOriginalCommand) {
          return node.command.execute;
        }
        return node.command.messageExecute;
      }
      return node.command.execute;
    }
  }
}

export { CommandTrie };
