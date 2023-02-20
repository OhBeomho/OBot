// Type definition for process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      APP_ID: string
      DB_URI: string
      DB_NAME: string
    }
  }
}

export {}
