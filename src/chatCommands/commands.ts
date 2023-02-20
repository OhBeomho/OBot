import { Collection, Message } from "discord.js"
import clean from "./clean"
import kick from "./kick"

const commands = [clean, kick]
const collection = new Collection<string, (message: Message) => Promise<void>>()

for (let command of commands) {
  const { name, execute } = command
  collection.set(name, execute)
}

export default collection
