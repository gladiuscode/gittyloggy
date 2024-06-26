import {exec} from 'child_process';
import ConfigUtils from './utils/config';

const createLogs = async () =>
  new Promise<string>((resolve, reject) =>
    exec('git log --pretty=format:"%d %s"', (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout);
    }),
  );

const getLastTagIndex = (commits: string[], tag: string) =>
  commits.findIndex(commit => commit.includes(tag));

const getCommitsBeforeLastTag = (commits: string[], tagIndex: number) =>
  commits.slice(0, tagIndex);

const buildChangelogs = async () => {
  const config = await ConfigUtils.build();

  const logs = await createLogs();

  const iterableLogs = logs.split('\n');

  const firstTagIndex = getLastTagIndex(iterableLogs, config.TAG);

  if (firstTagIndex === -1)
    return console.log(`No ${config.TAG} tag found in logs`);

  const commits = getCommitsBeforeLastTag(iterableLogs, firstTagIndex);

  const commitsWithoutTags = commits.map(commit =>
    commit.replace(/(\(.*\))/, '').trim(),
  );

  const commitsWithOnlyMergedPRs = config.ONLY_MERGED_PRS
    ? commitsWithoutTags.filter(commit =>
        commit.toLowerCase().includes('merged'),
      )
    : commitsWithoutTags;

  if (!commitsWithOnlyMergedPRs.length)
    return console.log(
      `No commits found in logs. Are you sure this ${config.VERSION} version has to be released?`,
    );

  const peopleTags = config.PEOPLE_TAGS.split(',')
    .map(tag => `@${tag}`)
    .join(' ');

  return `
${peopleTags}  
    
Version: ${config.VERSION}
[Pipeline](${config.PIPELINE_URL}) 

Changelogs

${commitsWithOnlyMergedPRs.join('\n')}

🤖 Generated by [GittyLoggy](https://github.com/gladiuscode/gittyloggy) 🤖
    `;
};

export default buildChangelogs;
