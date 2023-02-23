import ping from "./etc/ping"
import avatar from "./member/avatar"
import talkpoints from "./talkpoints/talkpoints"
import help from "./etc/help"
import leaderboard from "./talkpoints/leaderboard"
import { Collection } from "discord.js"
import SlashCommandData from "./SlashCommandData"
import version from "./etc/version"
import kick from "./member/kick"
import createRole from "./role/createRole"
import addRole from "./role/addRole"
import deleteRole from "./role/deleteRole"
import removeRole from "./role/removeRole"

const commands = [ping, avatar, talkpoints, help, leaderboard, version, kick, createRole, deleteRole, addRole, removeRole]
const collection = new Collection<string, SlashCommandData>()

for (let command of commands)
  collection.set(command.data.name, { ...command, data: command.data.toJSON() })

export default collection
