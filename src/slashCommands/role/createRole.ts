import { ColorResolvable, CommandInteraction, SlashCommandBuilder } from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("create-role")
    .setDescription("역할을 만듭니다.")
    .addStringOption((option) =>
      option.setName("name").setDescription("역할의 이름").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("color").setDescription("역할의 색상 (#rrggbb) 형식으로 입력")
    ),
  async execute(interaction: CommandInteraction) {
    const roleName = String(interaction.options.get("name")?.value || "")
    const roleColor = String(interaction.options.get("color")?.value || "")

    if (!roleName) {
      await interaction.reply("역할의 이름을 입력해 주세요.")
      return
    } else if (roleColor && (roleColor.length !== 7 || !/#[a-fA-F\d]{6}/g.test(roleColor))) {
      await interaction.reply(
        "역할 색상은 #rrggbb 형식으로 입력해야 합니다.\n_예시 - 하얀색: #ffffff_"
      )
      return
    }

    await interaction.guild?.roles.create({
      name: roleName,
      color: (roleColor as ColorResolvable) || "#ffffff"
    })

    await interaction.reply(`**${roleName}** 역할을 생성했습니다!`)
  }
}
