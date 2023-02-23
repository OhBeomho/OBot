import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { getLeaderboard } from "../../schemas/Member"

export default {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("t-points 상위 10명을 보여줍니다."),
  async execute(interaction: CommandInteraction) {
    if (!interaction.inGuild()) return

    const top10 = await getLeaderboard(interaction.guildId)
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("TOP 10 T-Points 멤버")
      .setDescription(
        top10.length
          ? top10
              .map(
                (member, index) =>
                  `${index + 1}등 - **${member.tag}** \`T-Points: ${member.talkPoints}\``
              )
              .join("\n")
          : "랭크된 멤버가 없습니다."
      )

    await interaction.reply({ embeds: [embed] })
  }
}
