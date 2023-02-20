import { Schema, model } from "mongoose"

const userSchema = new Schema({
  tag: {
    type: String,
    unique: true,
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

export default model("User", userSchema)
