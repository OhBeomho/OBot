import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js"
import User from "../schemas/User"

export default {
  data: new SlashCommandBuilder()
    .setName("t-points")
    .setDescription("사용자의 t-points 와 t-points 랭킹을 보여줍니다.")
    .addUserOption((option) => option.setName("user").setDescription("사용자")),
  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser("user") || interaction.user
    const guildId = interaction.guildId
    const userData = await User.findOne({ tag: user.tag })
    const embed = new EmbedBuilder()

    if (!userData) {
      embed.setColor("Red").setTitle(user.tag + "님의 정보가 없습니다.")
      await interaction.reply({ embeds: [embed] })
      return
    }

    const guildUsersData = await User.find({ guildId }).sort({ talkPoints: -1 })
    const me = guildUsersData.find((value) => value.tag === userData.tag)
    const rank = me ? guildUsersData.indexOf(me) + 1 : -1

    embed
      .setColor("Blue")
      .setTitle(user.tag + "님의 T-Points")
      .setDescription(`T-Points: ${userData.talkPoints}\nRank: #${rank}`)
    await interaction.reply({ embeds: [embed] })
  }
}
