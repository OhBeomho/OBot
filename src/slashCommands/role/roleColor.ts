import {
  ColorResolvable,
  CommandInteraction,
  PermissionFlagsBits,
  PermissionsBitField,
  Role,
  SlashCommandBuilder
} from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("role-color")
    .setDescription("역할의 색상을 변경합니다.")
    .addRoleOption((option) =>
      option.setName("role").setDescription("색상을 변경할 역할").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("color").setDescription("역할의 색상").setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const color = String(interaction.options.get("color")?.value || "")
    const role = interaction.options.get("role")?.role as Role
    if (
      !(interaction.member?.permissions as Readonly<PermissionsBitField>).has(
        PermissionFlagsBits.ManageRoles
      )
    ) {
      await interaction.reply("당신의 권한이 부족합니다.")
      return
    } else if (!color) {
      await interaction.reply("색상을 입력해 주세요.")
      return
    } else if (!role) {
      await interaction.reply("색상을 변경할 역할을 선택해 주세요.")
      return
    } else if (color.length !== 7 || !/#[a-fA-F\d]{6}/g.test(color)) {
      await interaction.reply(
        "역할 색상은 #rrggbb 형식으로 입력해야 합니다.\n_예시 - 하얀색: #ffffff_"
      )
      return
    }

    await role.setColor(color as ColorResolvable)
    await interaction.reply(`**${role.name}** 역할의 색상을 ${color}으로 변경했습니다!`)
  }
}
