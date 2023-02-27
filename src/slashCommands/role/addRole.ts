import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
  PermissionsBitField,
  Role,
  SlashCommandBuilder
} from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("add-role")
    .setDescription("사용자에게 역할을 추가합니다.")
    .addRoleOption((option) =>
      option.setName("role").setDescription("추가할 역할").setRequired(true)
    )
    .addUserOption((option) => option.setName("user").setDescription("역할을 추가할 사용자")),
  async execute(interaction: CommandInteraction) {
    if (!interaction.inGuild()) return

    const member = (interaction.options.getMember("user") || interaction.member) as GuildMember
    const role = interaction.options.get("role")?.role as Role

    if (
      !(interaction.member.permissions as Readonly<PermissionsBitField>).has(
        PermissionFlagsBits.ManageRoles
      )
    ) {
      await interaction.reply("당신의 권한이 부족합니다.")
      return
    } else if (!member) {
      await interaction.reply("역할을 추가할 사용자를 선택해 주세요.")
      return
    } else if (!role) {
      await interaction.reply(member.user.tag + "에게 추가할 역할을 선택해 주세요.")
      return
    }

    await member.roles.add(role)
    await interaction.reply(`${member.user.tag}에게 ${role.name}역할을 추가했습니다.`)
  }
}
