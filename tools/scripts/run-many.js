const execSync = require('child_process').execSync;

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);
const isDefaultBranch = Boolean(process.argv[5]);
const headRef = process.argv[6];
const baseRef = process.argv[7];
// const headRef = exec(`git name-rev ${process.argv[5]} | awk {'print $2'} | sed 's#remotes\/##g'`);
// const baseRef = exec(`git name-rev ${process.argv[6]} | awk {'print $2'} | sed 's#remotes\/##g'`);
const nxArgs =
  headRef !== baseRef ? ` --head=${headRef} --base=${baseRef}` : '--all';

const affected = exec(
  `npx nx print-affected --verbose=true --trackDeps --target=${target} ${nxArgs}`
).toString('utf-8');

const array = JSON.parse(affected)
  .tasks.map(t => t.target.project)
  .slice()
  .sort();

const sliceSize = Math.max(Math.floor(array.length / jobCount), 1);

const projects =
  jobIndex < jobCount
    ? array.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
    : array.slice(sliceSize * (jobIndex - 1));

if (projects.length > 0) {
  exec(
    `npx nx run-many --target=${target} --projects=${projects.join(
      ','
    )} --parallel ${restArgs()}`,
    {
      stdio: [0, 1, 2],
    }
  );

  if (isDefaultBranch && target === 'build' && restArgs().match(/\-\-prod/gi)) {
    // const isDockerLoggedIn = exec(`jq -e --arg url ghcr.io '.auths | has($url)' ~/.docker/config.json > /dev/null`);
    // if (!isDockerLoggedIn) {
    //   console.log('Docker is NOT logged in');
    //   exec(`echo $GH_TOKEN | docker login ghcr.io -u $GIT_USERNAME --password-stdin`)
    // } else {
    //   console.log('Docker is logged in');
    // }

    // Login to Docker registry for ghcr.io
    exec(
      `echo $PIPELINE_TOKEN | docker login ghcr.io -u $GIT_USERNAME --password-stdin`
    ).toString('utf-8');
    // exec(`cat /home/runner/.docker/config.json`).toString('utf-8')

    exec(
      `npx nx run-many --target=publish --projects=${projects.join(
        ','
      )} --parallel`,
      {
        stdio: [0, 1, 2],
      }
    );
  }
} else {
  console.log(`No Affected Projects... skipping.`);
}

function restArgs() {
  return process.argv
    .slice(8)
    .map(a => `"${a}"`)
    .join(' ');
}

function exec(cmd, options = {}) {
  console.log(`CMD: ${cmd.toString()}`);
  return execSync(cmd, options);
}
