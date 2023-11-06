### Build Ethereumjs Locally:
### Requires a copy of ethereumjs-monorepo/ -> hive/clients/ethereumjs/

FROM node:18-alpine

RUN apk update && apk add --no-cache bash git jq curl python3 gcc make g++ \
    && rm -rf /var/cache/apk/*

RUN npm i -g ts-node

# Default local client path: clients/ethereumjs/<ethereumjs-monorepo>
ARG local_path=ethereumjs-monorepo


COPY ${local_path}/package-lock.json ethereumjs-monorepo/package-lock.json
COPY ${local_path}/package.json ethereumjs-monorepo/package.json

COPY ${local_path}/.editorconfig ethereumjs-monorepo/.editorconfig
COPY ${local_path}/.githooks ethereumjs-monorepo/.githooks
COPY ${local_path}/.github ethereumjs-monorepo/.github
COPY ${local_path}/.gitignore ethereumjs-monorepo/.gitignore
COPY ${local_path}/.gitmodules ethereumjs-monorepo/.gitmodules
COPY ${local_path}/.prettierignore ethereumjs-monorepo/.prettierignore
COPY ${local_path}/.vscode ethereumjs-monorepo/.vscode
COPY ${local_path}/Dockerfile ethereumjs-monorepo/Dockerfile
COPY ${local_path}/README.md ethereumjs-monorepo/README.md
COPY ${local_path}/codecov.yml ethereumjs-monorepo/codecov.yml
COPY ${local_path}/config ethereumjs-monorepo/config
COPY ${local_path}/docker ethereumjs-monorepo/docker
COPY ${local_path}/eslint ethereumjs-monorepo/eslint
COPY ${local_path}/lint-staged.config.js ethereumjs-monorepo/lint-staged.config.js
COPY ${local_path}/package-lock.json ethereumjs-monorepo/package-lock.json
COPY ${local_path}/package.json ethereumjs-monorepo/package.json
COPY ${local_path}/prettier.config.js ethereumjs-monorepo/prettier.config.js
COPY ${local_path}/scripts ethereumjs-monorepo/scripts
COPY ${local_path}/verdaccio.yml ethereumjs-monorepo/verdaccio.yml

COPY ${local_path}/packages/block/package.json ethereumjs-monorepo/packages/block/package.json
COPY ${local_path}/packages/blockchain/package.json ethereumjs-monorepo/packages/blockchain/package.json
COPY ${local_path}/packages/client/package.json ethereumjs-monorepo/packages/client/package.json
COPY ${local_path}/packages/common/package.json ethereumjs-monorepo/packages/common/package.json
COPY ${local_path}/packages/devp2p/package.json ethereumjs-monorepo/packages/devp2p/package.json
COPY ${local_path}/packages/ethash/package.json ethereumjs-monorepo/packages/ethash/package.json
COPY ${local_path}/packages/evm/package.json ethereumjs-monorepo/packages/evm/package.json
COPY ${local_path}/packages/genesis/package.json ethereumjs-monorepo/packages/genesis/package.json
COPY ${local_path}/packages/rlp/package.json ethereumjs-monorepo/packages/rlp/package.json
COPY ${local_path}/packages/statemanager/package.json ethereumjs-monorepo/packages/statemanager/package.json
COPY ${local_path}/packages/trie/package.json ethereumjs-monorepo/packages/trie/package.json
COPY ${local_path}/packages/tx/package.json ethereumjs-monorepo/packages/tx/package.json
COPY ${local_path}/packages/util/package.json ethereumjs-monorepo/packages/util/package.json
COPY ${local_path}/packages/verkle/package.json ethereumjs-monorepo/packages/verkle/package.json
COPY ${local_path}/packages/vm/package.json ethereumjs-monorepo/packages/vm/package.json
COPY ${local_path}/packages/wallet/package.json ethereumjs-monorepo/packages/wallet/package.json

RUN cd ethereumjs-monorepo && git init

RUN cd ethereumjs-monorepo && cp package.json package.json.bak && npm pkg set scripts.postinstall="echo no-postinstall"
RUN cd ethereumjs-monorepo && npm i
RUN cd ethereumjs-monorepo && cp package.json.bak package.json && rm package.json.bak

COPY ${local_path}/node_modules/@ethereumjs ethereumjs-monorepo/node_modules/@ethereumjs

COPY ${local_path}/packages/rlp ethereumjs-monorepo/packages/rlp
RUN cd ethereumjs-monorepo/packages/rlp && npm run build
COPY ${local_path}/packages/util ethereumjs-monorepo/packages/util
RUN cd ethereumjs-monorepo/packages/util && npm run build
COPY ${local_path}/packages/verkle ethereumjs-monorepo/packages/verkle
RUN cd ethereumjs-monorepo/packages/verkle && npm run build
COPY ${local_path}/packages/wallet ethereumjs-monorepo/packages/wallet
RUN cd ethereumjs-monorepo/packages/wallet && npm run build
COPY ${local_path}/packages/common ethereumjs-monorepo/packages/common
RUN cd ethereumjs-monorepo/packages/common && npm run build
COPY ${local_path}/packages/devp2p ethereumjs-monorepo/packages/devp2p
RUN cd ethereumjs-monorepo/packages/devp2p && npm run build
COPY ${local_path}/packages/genesis ethereumjs-monorepo/packages/genesis
RUN cd ethereumjs-monorepo/packages/genesis && npm run build


COPY ${local_path}/packages/trie ethereumjs-monorepo/packages/trie
RUN cd ethereumjs-monorepo/packages/trie && npm run build
COPY ${local_path}/packages/statemanager ethereumjs-monorepo/packages/statemanager
RUN cd ethereumjs-monorepo/packages/statemanager && npm run build
COPY ${local_path}/packages/tx ethereumjs-monorepo/packages/tx
RUN cd ethereumjs-monorepo/packages/tx && npm run build
COPY ${local_path}/packages/evm ethereumjs-monorepo/packages/evm
RUN cd ethereumjs-monorepo/packages/evm && npm run build
COPY ${local_path}/packages/block ethereumjs-monorepo/packages/block
RUN cd ethereumjs-monorepo/packages/block && npm run build
COPY ${local_path}/packages/ethash ethereumjs-monorepo/packages/ethash
RUN cd ethereumjs-monorepo/packages/ethash && npm run build
COPY ${local_path}/packages/blockchain ethereumjs-monorepo/packages/blockchain
RUN cd ethereumjs-monorepo/packages/blockchain && npm run build
COPY ${local_path}/packages/vm ethereumjs-monorepo/packages/vm
RUN cd ethereumjs-monorepo/packages/vm && npm run build

COPY ${local_path}/packages/client ethereumjs-monorepo/packages/client

# Create version.txt
RUN cd ethereumjs-monorepo/packages/client && npm ethereumjs --version > /version.txt

# Add genesis mapper script, startup script, and enode URL retriever script
ADD genesis.json /genesis.json
ADD mapper.jq /mapper.jq
ADD ethereumjs.sh /ethereumjs.sh
ADD enode.sh /hive-bin/enode.sh
ADD jwtsecret /jwtsecret

# Set execute permissions for scripts
RUN chmod +x /ethereumjs.sh /hive-bin/enode.sh

# Expose networking ports
EXPOSE 8545 8546 8551 8547 30303 30303/udp

# NodeJS applications have a default memory limit of 2.5GB.
# This limit is bit tight, it is recommended to raise the limit
# since memory may spike during certain network conditions.
ENV NODE_OPTIONS=--max_old_space_size=6144

ENTRYPOINT ["/ethereumjs.sh"]
