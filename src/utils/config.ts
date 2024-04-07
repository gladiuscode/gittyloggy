import {readFile} from "fs/promises";

export interface Config {
  PEOPLE_TAGS: string;
  PIPELINE_URL: string;
  VERSION: string;
  TAG: string;
  ONLY_MERGED_PRS: boolean;
}

const openConfig = async () => {
  try {
    return await readFile('./gitty.config.json', 'utf-8');
  } catch (error) {
    return;
  }
}

const ConfigUtils = {
  build: async function() {
    const rawConfig = await openConfig();
    if (!rawConfig) {
      throw new Error('[GittyLoggy] - Please check your .gitty.config.json file');
    }
    const config = JSON.parse(rawConfig);

    if (!config.VERSION) throw new Error('VERSION config property is missing');
    if (!config.PIPELINE_URL) throw new Error('PIPELINE_URL config property is missing');
    if (!config.PEOPLE_TAGS) throw new Error('PEOPLE_TAGS config property is missing');
    if (!config.TAG) throw new Error('TAG config property is missing');
    if (!config.ONLY_MERGED_PRS) throw new Error('ONLY_MERGED_PRS config property is missing');

    return config as Config;
  },
}

Object.freeze(ConfigUtils);

export default ConfigUtils;
