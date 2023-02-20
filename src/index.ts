import "dotenv/config"
import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js"
import slashCommands from "./slashCommands/commands"
import chatCommands from "./chatCommands/commands"
import connect from "./db/connect"
import User from "./schemas/User"

const { TOKEN, APP_ID, DB_URI, DB_NAME } = process.env

const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds
  ]
})
const rest = new REST({ version: "10" }).setToken(String(TOKEN))

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() || !interaction.inGuild()) return

  const command = slashCommands.get(interaction.commandName)
  if (!command) return

  try {
    await command.execute(interaction)
  } catch (err) {
    console.error(err)
    await interaction.reply({ content: "명령어 실행 중 오류 발생", ephemeral: true })
  }
})

client.on(Events.MessageCreate, async (message) => {
  if (!message.inGuild()) return
  else if (message.content.startsWith(".")) {
    const firstWord = message.content.split(/\s{1,}/)[0]
    const command = chatCommands.get(firstWord.substring(1, firstWord.length))

    if (firstWord === ".clean" && message.mentions.users.has(String(client.user?.id))) {
      message.reply("저는 제 자신을 추방할 수 없습니다.")
    } else if (command) {
      try {
        await command(message)
      } catch (err) {
        console.error(err)
        await message.reply(err instanceof Error ? err.message : String(err))
      }
    }

    return
  }

  const user = message.author

  try {
    const userData = await User.findOne({ tag: user.tag })

    if (!userData) {
      await User.create({
        tag: user.tag,
        guildId: message.guildId
      })
      return
    }

    await User.findOneAndUpdate(
      { tag: user.tag },
      { $set: { talkPoints: userData.talkPoints + 1 } }
    )
  } catch (err) {
    console.error(err)
  }
})

async function main() {
  try {
    await rest.put(Routes.applicationCommands(String(APP_ID)), {
      body: slashCommands.map((command) => command.data)
    })
    console.log("Registered slash commands.")

    client.login(TOKEN)
    console.log("Logged in")
  } catch (err) {
    console.error(err)
  }
}

connect(String(DB_URI), String(DB_NAME), main)