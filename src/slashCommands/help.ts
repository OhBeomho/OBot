import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"

const slashCommendText = `/help - 이 목록을 표시합니다.
/t-points - 사용자의 t-points, t-points 랭킹을 보여줍니다.
/avatar - 사용자의 아바타를 보여줍니다.
/ping - Pong 으로 답합니다.`

const chatCommandText = `.clean _number_ - number 만큼 메시지를 지웁니다. (14일 이상 된 메시지 삭제 불가)
.kick _mentions_ - 멘션된 사용자를 추방합니다 (여러명 가능)`

export default {
  data: new SlashCommandBuilder().setName("help").setDescription("도움말"),
  async execute(interaction: CommandInteraction) {
    const slashCommands = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("슬래시 명령어 목록")
      .setDescription(slashCommendText)
    const chatCommands = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("채팅 명령어 목록")
      .setDescription(chatCommandText)
    await interaction.reply({ embeds: [slashCommands, chatCommands] })
  }
}
