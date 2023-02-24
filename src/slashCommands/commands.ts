import ping from "./etc/ping"
import avatar from "./member/avatar"
import talkpoints from "./talkpoints/talkpoints"
import list from "./etc/list"
import leaderboard from "./talkpoints/leaderboard"
import { Collection } from "discord.js"
import SlashCommandData from "./SlashCommandData"
import version from "./etc/version"
import kick from "./member/kick"
import createRole from "./role/createRole"
import addRole from "./role/addRole"
import deleteRole from "./role/deleteRole"
import removeRole from "./role/removeRole"
import roleColor from "./role/roleColor"
import roleList from "./role/roleList"

const commands = [ping, avatar, talkpoints, list, leaderboard, version, kick, createRole, deleteRole, addRole, removeRole, roleColor, roleList]
const collection = new Collection<string, SlashCommandData>()

for (let command of commands)
  collection.set(command.data.name, { ...command, data: command.data.toJSON() })

export default collection
