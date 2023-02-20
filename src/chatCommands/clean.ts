import { Message } from "discord.js"

export default {
  name: "clean",
  async execute(message: Message) {
    if (message.channel.isDMBased() || message.channel.isVoiceBased()) return

    const deleteCount = Number(message.content.split(/\s{1,}/)[1] || 1)

    if (isNaN(deleteCount)) {
      await message.reply("제거할 메시지 개수를 숫자로 입력해 주세요.")
      return
    }

    await message.delete()
    await message.channel.bulkDelete(deleteCount, true)
  }
}
