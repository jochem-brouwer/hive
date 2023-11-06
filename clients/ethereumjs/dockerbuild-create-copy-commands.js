// Tool to quickly generate some of the COPY commands

const fs = require('fs')

const packages = ["block", "blockchain", "client", "common", "devp2p", "ethash", "evm", "genesis", "rlp", "statemanager", "trie", "tx", "util", "verkle", "vm", "wallet"]

// Exclude these files on the COPY
// Note: .git is added because otherwise each git commit will retrigger the entire build process
// Also inspect the output to not include any random logs or .gitignore files
const exclude = ["node_modules", "packages", ".git"]

async function ls(path) {
  const dir = await fs.promises.opendir(path)
  const names = []
  for await (const dirent of dir) {
    if (!exclude.includes(dirent.name)) {
        names.push(dirent.name)
    }
  }
  names.sort()
  for (const name of names) {
    console.log(`COPY \${local_path}/${name} ethereumjs-monorepo/${name}`)
  }
}

ls('./ethereumjs-monorepo').catch(console.error)


for (const package of packages) {
    console.log(`COPY \${local_path}/packages/${package}/package.json ethereumjs-monorepo/packages/${package}/package.json`)
}