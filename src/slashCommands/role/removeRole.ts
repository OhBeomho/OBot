import { CommandInteraction, GuildMember, Role, SlashCommandBuilder } from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("remove-role")
    .setDescription("사용자에게서 역할을 제거합니다.")
    .addRoleOption((option) =>
      option.setName("role").setDescription("제거할 역할").setRequired(true)
    )
    .addUserOption((option) => option.setName("user").setDescription("역할을 제거할 사용자")),
  async execute(interaction: CommandInteraction) {
    const member = (interaction.options.getMember("user") as GuildMember) || interaction.member
    const role = interaction.options.get("role")?.role as Role

    if (!member) {
      await interaction.reply("역할을 제거할 사용자를 선택해 주세요.")
      return
    } else if (!role) {
      await interaction.reply(member.user.tag + "에게서 제거할 역할을 선택해 주세요.")
      return
    }

    await member.roles.remove(role)
    await interaction.reply(`${member.user.tag}의 ${role.name}역할을 제거했습니다.`)
  }
}
