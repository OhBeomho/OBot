import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
  SlashCommandBuilder
} from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("한 명을 추방합니다. 추방 사유를 정할 수 있습니다.")
    .addUserOption((option) => option.setName("user").setDescription("추방할 사용자").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("추방 사유")),
  async execute(interaction: CommandInteraction) {
    if (!interaction.inGuild()) return

    const member = interaction.member as GuildMember
    const kickMember = interaction.options.getMember("user") as GuildMember
    const reason = String(
      interaction.options.get("reason") || member.user.tag + "이(가) 당신을 추방하였습니다."
    )

    if (!member.permissions.has(PermissionFlagsBits.KickMembers))
      await interaction.reply("당신은 추방할 권한이 없습니다.")
    else if (member.user.tag === kickMember.user.tag)
      await interaction.reply("본인을 추방할 수 없습니다.")
    else if (!kickMember) await interaction.reply("추방할 사용자를 선택해 주세요.")
    else if (member.roles.highest.comparePositionTo(kickMember.roles.highest) < 1)
      await interaction.reply(
        kickMember.user.tag + "이(가) 당신보다 더 높은(같은) 권한을 가지고 있어 추방할 수 없습니다."
      )
    else if (!kickMember.kickable)
      await interaction.reply(
        kickMember.user.tag +
          "이(가) 저보다 더 높은 권한을 가지고 있거나 저의 권한이 부족해 추방할 수 없습니다."
      )
    else {
      await kickMember.kick(reason)
      await interaction.reply(kickMember.user.tag + "을(를) 추방시켰습니다.")
    }
  }
}
