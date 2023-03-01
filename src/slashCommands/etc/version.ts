import "dotenv/config"
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"

const updateText = `**업데이트 내용**
- /member-info 명령어 추가
- /t-points 명령어가 사용자의 아바타를 보여주게 변경`

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
