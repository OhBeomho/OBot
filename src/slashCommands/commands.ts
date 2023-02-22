import ping from "./ping"
import avatar from "./avatar"
import talkpoints from "./talkpoints"
import help from "./help"
import leaderboard from "./leaderboard"
import { Collection } from "discord.js"
import SlashCommandData from "./SlashCommandData"
import version from "./version"
import kick from "./kick"

const commands = [ping, avatar, talkpoints, help, leaderboard, version, kick]
const collection = new Collection<string, SlashCommandData>()

for (let command of commands)
  collection.set(command.data.name, { ...command, data: command.data.toJSON() })

export default collection
