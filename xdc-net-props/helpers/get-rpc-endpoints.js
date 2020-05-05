const { networkIDs } = require('./enum')
const {
	MAINNET_CODE,
	ROPSTEN_CODE,
	RINKEBY_CODE,
	GOERLI_CODE,
	KOVAN_CODE,
	SOKOL_CODE,
	POA_CORE_CODE,
	XDAI_CODE,
	XDC_CODE,
	XDC_TESTNET_CODE,
	CLASSIC_CODE,
} = networkIDs

function getRPCEndpoints(network) {
	const netID = parseInt(network)
	switch (netID) {
	case MAINNET_CODE:
		return ['https://mainnet.infura.io/']
	case ROPSTEN_CODE:
		return ['https://ropsten.infura.io/']
	case RINKEBY_CODE:
		return ['https://rinkeby.infura.io/']
	case GOERLI_CODE:
		return ['https://goerli.blockscout.com/']
	case KOVAN_CODE:
		return ['https://kovan.infura.io/']
	case SOKOL_CODE:
		return ['https://sokol.poa.network/']
	case POA_CORE_CODE:
		return ['https://core.poa.network/']
	case XDAI_CODE:
		return ['https://dai.poa.network/']
	case XDC_CODE:
		return ['https://xinpayrpc.xinfin.network']
	case XDC_TESTNET_CODE:
		return ['https://xinpayrpc.apothem.network']
	case CLASSIC_CODE:
		return ['https://classic.blockscout.com/']
	default:
		return []
	}
}

module.exports = {
	getRPCEndpoints
}