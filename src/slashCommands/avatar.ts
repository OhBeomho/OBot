import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("사용자의 아바타를 보여줍니다.")
    .addUserOption((option) => option.setName("user").setDescription("사용자")),
  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser("user") || interaction.user

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setImage(user.avatarURL({ size: 256 }))
      .setTitle(user.tag + "님의 아바타")
    await interaction.reply({ embeds: [embed] })
  }
}
