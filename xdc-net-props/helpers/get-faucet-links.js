const { networkIDs } = require("./enum");
const {
  ROPSTEN_CODE,
  RINKEBY_CODE,
  GOERLI_CODE,
  KOVAN_CODE,
  SOKOL_CODE,
  XDC_TESTNET_CODE,
  XDC_DEVNET_CODE,
} = networkIDs;

function getFaucetLinks(network) {
  const netID = parseInt(network);
  switch (netID) {
    case ROPSTEN_CODE:
      return ["https://faucet.metamask.io/"];
    case RINKEBY_CODE:
      return ["https://faucet.rinkeby.io/"];
    case GOERLI_CODE:
      return ["https://goerli-faucet.slock.it/"];
    case KOVAN_CODE:
      return [
        "https://faucet.kovan.network/",
        "https://gitter.im/kovan-testnet/faucet/",
      ];
    case SOKOL_CODE:
      return ["https://faucet.poa.network/"];
    case XDC_TESTNET_CODE:
      return ["http://faucet.apothem.network/"];
    case XDC_DEVNET_CODE:
      return ["http://devnet.apothem.network/#getTestXDC"];
    default:
      return [];
  }
}

module.exports = {
  getFaucetLinks,
};
