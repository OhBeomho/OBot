import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("role-list")
    .setDescription("해당 서버의 역할 목록을 보여줍니다."),
  async execute(interaction: CommandInteraction) {
    const guildName = interaction.guild?.name
    const roles = interaction.guild?.roles
    const roleList = new EmbedBuilder().setColor("Blue").setTitle(guildName + " 서버 역할 목록")

    if (!guildName && !roles) {
      await interaction.reply("서버 이름과 역할을 가져올 수 없습니다.")
      return
    } else if (!roles) {
      roleList.setDescription("역할이 없습니다.")
      await interaction.reply({ embeds: [roleList] })
      return
    }

    let roleText = ""
    for (let role of roles.cache.values()) {
      if (role.tags?.botId) continue

      roleText += `${role}\n`
    }

    roleList.setDescription(roleText)

    await interaction.reply({ embeds: [roleList] })
  }
}
