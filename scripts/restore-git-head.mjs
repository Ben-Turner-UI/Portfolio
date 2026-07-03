import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gitDir = path.join(repoRoot, '.git');

function readObject(sha) {
  const objectPath = path.join(gitDir, 'objects', sha.slice(0, 2), sha.slice(2));
  const compressed = fs.readFileSync(objectPath);
  const data = zlib.inflateSync(compressed);
  const nullIndex = data.indexOf(0);
  const header = data.slice(0, nullIndex).toString('utf8');
  const content = data.slice(nullIndex + 1);
  const [type] = header.split(' ');
  return { type, content };
}

function walkTree(treeSha, prefix = '') {
  const { content } = readObject(treeSha);
  const files = [];
  let offset = 0;

  while (offset < content.length) {
    const spaceIndex = content.indexOf(0x20, offset);
    const nullIndex = content.indexOf(0x00, spaceIndex + 1);
    const mode = content.slice(offset, spaceIndex).toString('utf8');
    const name = content.slice(spaceIndex + 1, nullIndex).toString('utf8');
    const sha = content.slice(nullIndex + 1, nullIndex + 21).toString('hex');
    offset = nullIndex + 21;
    const fullPath = prefix ? `${prefix}/${name}` : name;

    if (mode.startsWith('40000')) {
      files.push(...walkTree(sha, fullPath));
    } else if (mode.startsWith('100')) {
      files.push({ path: fullPath, sha });
    }
  }

  return files;
}

function readHeadCommit() {
  const head = fs.readFileSync(path.join(gitDir, 'HEAD'), 'utf8').trim();
  if (head.startsWith('ref: ')) {
    const refPath = path.join(gitDir, head.slice(5));
    return fs.readFileSync(refPath, 'utf8').trim();
  }
  return head;
}

const commitSha = readHeadCommit();
const { content: commitContent } = readObject(commitSha);
const treeMatch = commitContent.toString('utf8').match(/^tree ([0-9a-f]{40})/m);
if (!treeMatch) {
  throw new Error('Could not parse commit tree');
}

const files = walkTree(treeMatch[1]);
let restored = 0;

for (const file of files) {
  const { content } = readObject(file.sha);
  const targetPath = path.join(repoRoot, file.path);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content);
  restored += 1;
}

console.log(`Restored ${restored} files from commit ${commitSha.slice(0, 7)} on branch master`);
