import ping from "./ping"
import avatar from "./avatar"
import talkpoints from "./talkpoints"
import help from "./help"
import { Collection } from "discord.js"
import SlashCommandData from "./SlashCommandData"

const commands = [ping, avatar, talkpoints, help]
const collection = new Collection<string, SlashCommandData>()

for (let command of commands)
  collection.set(command.data.name, { ...command, data: command.data.toJSON() })

export default collection
