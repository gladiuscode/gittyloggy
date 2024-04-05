declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PEOPLE_TAGS: string;
      PIPELINE_URL: string;
      TAG: string;
      VERSION: string;
    }
  }
}

export {}
