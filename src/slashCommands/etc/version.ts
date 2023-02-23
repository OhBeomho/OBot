import "dotenv/config"
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"

const updateText = `**업데이트 내용**
- 역할 관련 슬래시 커맨드 추가
- /help 를 /list 로 이름 변경`

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
