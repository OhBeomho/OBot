import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js"
import Member, { getRank } from "../../schemas/Member"

export default {
  data: new SlashCommandBuilder()
    .setName("t-points")
    .setDescription("사용자의 t-points 와 t-points 랭킹을 보여줍니다.")
    .addUserOption((option) => option.setName("user").setDescription("사용자")),
  async execute(interaction: CommandInteraction) {
    if (!interaction.inGuild()) return

    const user = interaction.options.getUser("user") || interaction.user
    const guildId = interaction.guildId
    const member = await Member.findOne({ tag: user.tag, guildId })
    const embed = new EmbedBuilder()

    if (!member) {
      embed.setColor("Red").setTitle(user.tag + "님의 정보가 없습니다.")
      await interaction.reply({ embeds: [embed] })
      return
    }

    const rank = await getRank(member, guildId)

    embed
      .setColor("Blue")
      .setTitle(user.tag + "님의 T-Points")
      .setDescription(`T-Points: ${member.talkPoints}\nRank: #${rank}`)
      .setThumbnail(user.avatarURL())
    await interaction.reply({ embeds: [embed] })
  }
}
