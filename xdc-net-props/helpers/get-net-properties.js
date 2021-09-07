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

function getNetworkDisplayName(network) {
	const netID = parseInt(network)
	switch (netID) {
	case MAINNET_CODE:
		return 'Main Ethereum Network'
	case ROPSTEN_CODE:
		return 'Ropsten Test Network'
	case RINKEBY_CODE:
		return 'Rinkeby Test Network'
	case GOERLI_CODE:
		return 'Görli Test Network'
	case KOVAN_CODE:
		return 'Kovan Test Network'
	case SOKOL_CODE:
		return 'Sokol Test Network'
	case POA_CORE_CODE:
		return 'POA Core'
	case XDAI_CODE:
		return 'xDai Chain'
	case XDC_CODE:
		return 'XDC MainNet'
	case XDC_TESTNET_CODE:
		return 'XDC Apothem TestNet'
	case CLASSIC_CODE:
		return 'Ethereum Classic'
	default:
		return 'Unknown Private Network'
	}
}

function getNetworkCoinName(network) {
	const netID = parseInt(network)
	switch (netID) {
	case SOKOL_CODE:
	case POA_CORE_CODE:
		return 'POA'
	case XDC_CODE:
	case XDC_TESTNET_CODE:
		return 'XDC'
	case XDAI_CODE:
		return 'xDAI'
	case GOERLI_CODE:
		return 'GöETH'
	case CLASSIC_CODE:
		return 'ETC'
	default:
		return 'ETH'
	}
}

function isTestnet(network) {
	const netID = parseInt(network)
	switch (netID) {
	case MAINNET_CODE:
	case POA_CORE_CODE:
	case XDAI_CODE:
	case XDC_CODE:
	case CLASSIC_CODE:
		return false
	default:
		return true
	}
}

module.exports = {
	getNetworkDisplayName,
	getNetworkCoinName,
	isTestnet
}