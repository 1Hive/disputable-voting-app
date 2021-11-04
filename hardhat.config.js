require("dotenv").config();

require("@1hive/hardhat-aragon");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("solidity-coverage");

const { node_url, accounts } = require("./utils/network");

process.removeAllListeners("warning");
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000, // Set to 1000 for bytesize restricted envs
          },
        },
      },
      {
        version: "0.5.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
    ],
  },
  aragon: {
    appEnsName: "disputable-voting.open.aragonpm.eth",
    appContractName: "DisputableVoting",
    appRoles: [
      {
        name: "Create new votes",
        id: "CREATE_VOTES_ROLE",
        params: ["Sender"],
      },
      {
        name: "Challenge votes",
        id: "CHALLENGE_ROLE",
        params: [],
      },
      {
        name: "Modify vote time",
        id: "CHANGE_VOTE_TIME_ROLE",
        params: ["New vote time"],
      },
      {
        name: "Modify support",
        id: "CHANGE_SUPPORT_ROLE",
        params: ["New required support"],
      },
      {
        name: "Modify quorum",
        id: "CHANGE_QUORUM_ROLE",
        params: ["New minimum acceptance quorum"],
      },
      {
        name: "Modify delegated voting period",
        id: "CHANGE_DELEGATED_VOTING_PERIOD_ROLE",
        params: ["New delegated voting period"],
      },
      {
        name: "Modify quiet ending configuration",
        id: "CHANGE_QUIET_ENDING_ROLE",
        params: ["New quiet ending period", "New quiet ending extension"],
      },
      {
        name: "Modify execution delay",
        id: "CHANGE_EXECUTION_DELAY_ROLE",
        params: ["New execution delay"],
      },
      {
        name: "Set agreement",
        id: "SET_AGREEMENT_ROLE",
        params: [],
      },
    ],
  },
  networks: {
    hardhat: {
      // process.env.HARDHAT_FORK will specify the network that the fork is made from.
      // this line ensure the use of the corresponding accounts
      accounts: accounts(process.env.HARDHAT_FORK),
      forking: process.env.HARDHAT_FORK
        ? {
            url: node_url(process.env.HARDHAT_FORK),
            blockNumber: process.env.HARDHAT_FORK_NUMBER
              ? parseInt(process.env.HARDHAT_FORK_NUMBER)
              : undefined,
          }
        : undefined,
    },
    localhost: {
      url: node_url("localhost"),
      accounts: accounts(),
      ensRegistry: "0x4E065c622d584Fbe5D9078C3081840155FA69581",
    },
    mainnet: {
      url: node_url("mainnet"),
      accounts: accounts("mainnet"),
    },
    rinkeby: {
      url: node_url("rinkeby"),
      accounts: accounts("rinkeby"),
      ensRegistry: "0x98Df287B6C145399Aaa709692c8D308357bC085D",
    },
    ropsten: {
      url: node_url("ropsten"),
      accounts: accounts("ropsten"),
      ensRegistry: "0x6afe2cacee211ea9179992f89dc61ff25c61e923",
    },
    xdai: {
      url: node_url("xdai"),
      accounts: accounts("xdai"),
      ensRegistry: "0xaafca6b0c89521752e559650206d7c925fd0e530",
    },
    polygon: {
      url: node_url("polygon"),
      accounts: accounts("polygon"),
      ensRegistry: "0x7EdE100965B1E870d726cD480dD41F2af1Ca0130",
    },
    mumbai: {
      url: node_url("mumbai"),
      accounts: accounts("mumbai"),
      ensRegistry: "0xB1576a9bE5EC445368740161174f3Dd1034fF8be",
    },
    arbitrum: {
      url: node_url("arbitrum"),
      accounts: accounts("arbitrum"),
      ensRegistry: "0xB1576a9bE5EC445368740161174f3Dd1034fF8be",
    },
    arbtest: {
      url: node_url("arbtest"),
      accounts: accounts("arbtest"),
      ensRegistry: "0x73ddD4B38982aB515daCf43289B41706f9A39199",
    },
    frame: {
      url: "http://localhost:1248",
      httpHeaders: { origin: "hardhat" },
      timeout: 0,
      gas: 0,
    },
  },
  ipfs: {
    gateway: "https://ipfs.blossom.software/",
    pinata: {
      key: process.env.PINATA_KEY || "",
      secret: process.env.PINATA_SECRET_KEY || "",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  mocha: {
    timeout: 0,
  },
  external: process.env.HARDHAT_FORK
    ? {
        deployments: {
          // process.env.HARDHAT_FORK will specify the network that the fork is made from.
          // these lines allow it to fetch the deployments from the network being forked from both for node and deploy task
          hardhat: ["deployments/" + process.env.HARDHAT_FORK],
          localhost: ["deployments/" + process.env.HARDHAT_FORK],
        },
      }
    : undefined,
};
