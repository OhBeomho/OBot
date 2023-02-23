import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"

const etcText = `**슬래시 명령어**
/list - 이 목록을 보여줍니다.
/ping - Pong 으로 답합니다.
/version - 현재 버전과 업데이트 내용을 보여줍니다.

**채팅 명령어**
.clean _number_ - _number_개의 메시지를 제거합니다. (14일 이상 된 메시지 삭제 불가)`

const roleText = `**슬래시 명령어**
/create-role - 새 역할을 만듭니다.
/delete-role - 역할을 삭제합니다.
/add-role - 사용자에게 역할을 추가합니다.
/remove-role - 사용자에게서 역할을 제거합니다.

**채팅 명령어**
없음`

const memberText = `**슬래시 명령어**
/avatar - 사용자의 아바타를 보여줍니다.
/kick - 사용자를 추방합니다.

**채팅 명령어**
.kick-many _mentions_ - 멘션된 사용자들을 모두 추방합니다.`

const talkpointsText = `**슬래시 명령어**
/t-points - 사용자의 t-points 와 t-points 랭킹을 보여줍니다.
/leaderboard - 해당 서버의 t-points 상위 10명을 보여줍니다.

**채팅 명령어**
없음`

export default {
  data: new SlashCommandBuilder().setName("list").setDescription("명령어 목록"),
  async execute(interaction: CommandInteraction) {
    const embeds = [
      new EmbedBuilder().setTitle("역할 관련 명령어").setDescription(roleText),
      new EmbedBuilder().setTitle("멤버 관련 명령어").setDescription(memberText),
      new EmbedBuilder().setTitle("T-Points 관련 명령어").setDescription(talkpointsText),
      new EmbedBuilder().setTitle("기타 명령어").setDescription(etcText)
    ].map((embed) => embed.setColor("Blue"))

    await interaction.reply({ embeds })
  }
}
