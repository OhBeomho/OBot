import { Message, PermissionFlagsBits } from "discord.js"

export default {
  name: "ban-many",
  async execute(message: Message) {
    if (!message.inGuild()) return

    if (message.member && !message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      await message.reply("당신은 밴할 권한이 없습니다.")
      return
    }

    const banMembers = message.mentions.members

    if (!banMembers.size) {
      await message.reply("밴할 대상을 한 명 이상 선택해 주세요.")
    } else if (banMembers.has(message.author.id)) {
      await message.reply("본인을 밴할 수 없습니다.")
    } else {
      await Promise.all(
        banMembers.mapValues((member) => {
          if (
            message.member &&
            message.member.roles.highest.comparePositionTo(member.roles.highest) < 1
          )
            return message.reply(
              member.user.tag + "이(가) 당신보다 더 높은(같은) 권한을 가지고 있어 밴할 수 없습니다."
            )
          else if (!member.bannable)
            return message.reply(
              member.user.tag +
                "이(가) 저보다 더 높은 권한을 가지고 있거나 저의 권한이 부족해 밴할 수 없습니다."
            )
          else
            return member.ban({
              reason: message.author.tag + "이(가) 당신을 밴 하였습니다."
            })
        })
      )
    }
  }
}
