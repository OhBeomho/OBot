import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
  Role,
  SlashCommandBuilder
} from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("delete-role")
    .setDescription("역할을 삭제합니다.")
    .addRoleOption((option) =>
      option.setName("role").setDescription("삭제할 역할").setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    if (!interaction.inGuild()) return

    const member = interaction.member as GuildMember
    const role = interaction.options.get("role")?.role as Role

    if (!member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      await interaction.reply("당신의 권한이 부족합니다.")
      return
    } else if (!role) {
      await interaction.reply("삭제할 역할을 선택해 주세요.")
      return
    }

    await role.delete()
    await interaction.reply(`**${role.name}** 역할을 삭제했습니다.`)
  }
}
