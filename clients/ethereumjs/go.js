const fs = require('fs')

const packages = ["block", "blockchain", "client", "common", "devp2p", "ethash", "evm", "genesis", "rlp", "statemanager", "trie", "tx", "util", "verkle", "vm", "wallet"]

const exclude = ["node_modules", "packages"]

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