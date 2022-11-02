require("babel-register");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "321",
    },
  },
  compilers: {
    solc: {
      version: "^0.8.17",
    },
  },
};
