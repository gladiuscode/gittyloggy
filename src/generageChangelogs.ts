import { readFile } from "fs/promises";
import * as path from "path";

const LOGS_PATH = path.join(process.cwd(), 'data', 'logs.txt');

const checkEnv = () => {
    if (!process.env.VERSION) throw new Error('VERSION env variable is missing');
    if (!process.env.PIPELINE_URL) throw new Error('PIPELINE_URL env variable is missing');
    if (!process.env.PEOPLE_TAGS) throw new Error('PEOPLE_TAGS env variable is missing');
    if (!process.env.TAG) throw new Error('TAG env variable is missing');
}

const readLogs = async () => readFile(LOGS_PATH, 'utf-8');

const getLastTagIndex = (commits: string[], tag: string) => commits.findIndex(commit => commit.includes(tag));

const getCommitsBeforeLastTag = (commits: string[], tagIndex: number) => commits.slice(0, tagIndex);

const getPeopleTags = () => process.env.PEOPLE_TAGS.split(',').map(tag => `@${tag}`).join(' ');

const generageChangelogs = async () => {
    checkEnv();

    const logs = await readLogs();
    const iterableLogs = logs.split('\n');

    const firstTagIndex = getLastTagIndex(iterableLogs, process.env.TAG);
    if (firstTagIndex === -1) return console.log(`No ${process.env.TAG} tag found in logs`);

    const commits = getCommitsBeforeLastTag(iterableLogs, firstTagIndex);

    const commitsWithoutTags = commits.map(commit => commit.replace(/(\(.*\))/, '').trim());

    const commitsWithOnlyMergedPRs = commitsWithoutTags.filter(commit => commit.toLowerCase().includes('merged'));

    const peopleTags = getPeopleTags();

    return `
${peopleTags}  
    
Versione: ${process.env.VERSION}
[Link Rilascio](${process.env.PIPELINE_URL}) 

Changelogs

${commitsWithOnlyMergedPRs.join('\n')}

Generato da GittyLoggy (Sono uno script in Typescript 🤖)
    `
}

export default generageChangelogs;

