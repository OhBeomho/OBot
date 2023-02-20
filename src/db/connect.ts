import mongoose from "mongoose"

export default function(uri: string, dbName: string, callback: () => void) {
  mongoose.set("strictQuery", true)
  mongoose.connect(uri, { dbName }, (err) => {
    if (err) {
      throw err
    }

    console.log("Connected to database.")
    callback()
  })
}
