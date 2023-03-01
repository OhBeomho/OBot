import { CommandInteraction, GuildMember, SlashCommandBuilder, EmbedBuilder } from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("member-info")
    .setDescription("서버 멤버의 정보를 보여줍니다.")
    .addUserOption((option) => option.setName("user").setDescription("사용자")),
  async execute(interaction: CommandInteraction) {
    const member = (interaction.options.getMember("user") || interaction.member) as GuildMember
    const memberRoleList = []

    for (let role of member.roles.cache.values()) memberRoleList.push(role)

    const memberInfo = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`${member.user.tag}`)
      .setDescription(
        `**서버 별명**
${member.displayName}

**서버 가입 날짜**
${member.joinedAt?.toLocaleDateString("ko-KR")}

**역할 목록**
${memberRoleList.map((role) => `${role}`).join(" ")}`
      )
      .setThumbnail(member.user.avatarURL())

    await interaction.reply({ embeds: [memberInfo] })
  }
}
