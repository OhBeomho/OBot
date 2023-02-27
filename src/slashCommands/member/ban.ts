import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
  PermissionsBitField,
  SlashCommandBuilder
} from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("사용자를 서버에서 밴합니다.")
    .addUserOption((option) =>
      option.setName("user").setDescription("밴할 사용자").setRequired(true)
    )
    .addStringOption((option) => option.setName("reason").setDescription("밴 사유")),
  async execute(interaction: CommandInteraction) {
    if (!interaction.inGuild()) return

    const member = interaction.member as GuildMember
    const banMember = interaction.options.getMember("user") as GuildMember
    const reason = String(interaction.options.get("reason")?.value)

    if (!member.permissions.has(PermissionFlagsBits.BanMembers))
      await interaction.reply("당신은 밴할 권한이 없습니다.")
    else if (!banMember) await interaction.reply("밴할 사용자를 선택해 주세요.")
    else if (member.user.tag === banMember.user.tag)
      await interaction.reply("본인을 추방할 수 없습니다.")
    else if (interaction.client.user.tag === banMember.user.tag)
      await interaction.reply("저는 제 자신을 추방할 수 없습니다.")
    else if (member.roles.highest.comparePositionTo(banMember.roles.highest) < 1)
      await interaction.reply(
        banMember.user.tag + "이(가) 당신보다 높은(같은) 권한을 가지고 있어 밴할 수 없습니다."
      )
    else if (!banMember.bannable)
      await interaction.reply(
        banMember.user.tag +
          "이(가) 저보다 더 높은 권한을 가지고 있거나 저의 권한이 부족해 추방할 수 없습니다."
      )
    else {
      await banMember.ban({
        reason: reason || member.user.tag + "이(가) 당신을 서버에서 밴 했습니다."
      })
      await interaction.reply(banMember.user.tag + "을(를) 서버에서 밴 했습니다.")
    }
  }
}
