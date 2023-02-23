import "dotenv/config"
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"

const updateText = `**업데이트 내용**
- 채팅 명령어 kick 을 kick-many 로 이름 변경
- 슬래시 명령어 kick, version 추가`

export default {
  data: new SlashCommandBuilder()
    .setName("version")
    .setDescription("현재 버전과 업데이트된 내용을 보여줍니다."),
  async execute(interaction: CommandInteraction) {
    const version = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("현재 버전: v" + String(process.env.VERSION))
      .setDescription(updateText)

    await interaction.reply({ embeds: [version] })
  }
}
