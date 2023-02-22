import { Message, PermissionFlagsBits } from "discord.js"

export default {
  name: "kick-many",
  async execute(message: Message) {
    if (!message.inGuild()) return

    if (message.member && !message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      await message.reply("당신은 추방할 권한이 없습니다.")
      return
    }

    const kickMembers = message.mentions.members

    if (!kickMembers.size) {
      await message.reply("킥할 대상을 한 명 이상 선택해 주세요.")
    } else if (kickMembers.has(message.author.id)) {
      await message.reply("본인을 추방할 수 없습니다.")
    } else {
      await Promise.all(
        kickMembers.mapValues((member) => {
          if (
            message.member &&
            message.member.roles.highest.comparePositionTo(member.roles.highest) < 1
          )
            return message.reply(
              member.user.tag + "이(가) 당신보다 더 높은(같은) 권한을 가지고 있어 추방할 수 없습니다."
            )
          else if (!member.kickable)
            return message.reply(
              member.user.tag +
                "이(가) 저보다 더 높은 권한을 가지고 있거나 저의 권한이 부족해 추방할 수 없습니다."
            )
          else return member.kick(message.author.tag + "이(가) 당신을 추방하였습니다.")
        })
      )
    }
  }
}
