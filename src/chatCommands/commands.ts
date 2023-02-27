import { Collection, Message } from "discord.js"
import banmany from "./banmany"
import clean from "./clean"
import kickmany from "./kickmany"

const commands = [clean, kickmany, banmany]
const collection = new Collection<string, (message: Message) => Promise<void>>()

for (let command of commands) {
  const { name, execute } = command
  collection.set(name, execute)
}

export default collection
