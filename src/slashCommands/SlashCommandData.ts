import { CommandInteraction } from "discord.js"

export default interface SlashCommandData {
  data: any
  execute: (interaction: CommandInteraction) => Promise<void>
}
