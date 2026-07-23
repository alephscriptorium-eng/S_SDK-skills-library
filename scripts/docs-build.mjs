import { createRequire, syncBuiltinESMExports } from 'node:module';
import { build } from 'vitepress';

const require = createRequire(import.meta.url);
const path = require('node:path');
const originalJoin = path.join.bind(path);
const rootDocs = path.resolve(process.cwd(), 'docs');

let currentPageFile = '';
path.join = (...args) => {
  const out = originalJoin(...args);
  if (
    String(args[0]).includes('docs/.vitepress/.temp') &&
    String(args[1]).endsWith('.js')
  ) {
    currentPageFile = String(args[1]);
  }
  return out;
};

syncBuiltinESMExports();

function normalizePath(file) {
  return String(file)
    .replace(/\\/g, '/')
    .replace(/^([A-Z]):/, (_, drive) => `${drive.toLowerCase()}:`);
}

const origFind = Array.prototype.find;
Array.prototype.find = function (pred, thisArg) {
  const src = String(pred);
  const looksLikeRollup =
    this.length && typeof this[0] === 'object' && this[0] && 'type' in this[0];
  if (looksLikeRollup && src.includes('facadeModuleId === srcPath')) {
    const res = origFind.call(this, pred, thisArg);
    if (res) return res;

    const pageRoute = currentPageFile.replace(/\.js$/, '').replace('_', '/');
    const candidate = normalizePath(path.resolve(rootDocs, pageRoute));
    return origFind.call(
      this,
      (chunk) =>
        chunk.type === 'chunk' &&
        chunk.facadeModuleId &&
        normalizePath(chunk.facadeModuleId) === candidate,
      thisArg
    );
  }
  return origFind.call(this, pred, thisArg);
};

await build('docs');
