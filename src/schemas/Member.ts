import { Schema, model } from "mongoose"

const Member = model(
  "Member",
  new Schema({
    tag: {
      type: String,
      required: true
    },
    guildId: {
      type: String,
      required: true
    },
    talkPoints: {
      type: Number,
      default: 1
    }
  })
)

export default Member

interface IMember {
  tag: string
  guildId: string
  talkPoints: number
}

export async function getRank(user: IMember, guildId: string) {
  const guildMembers = await Member.find({ guildId }).sort({ talkPoints: -1 })
  const me = guildMembers.find((value) => value.tag === user.tag)
  const rank = me ? guildMembers.indexOf(me) + 1 : -1

  return rank
}

export async function getLeaderboard(guildId: string) {
  const topMembers = await Member.find({ guildId }).sort({ talkPoints: -1 }).limit(10)

  return topMembers
}
