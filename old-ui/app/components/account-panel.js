const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const Identicon = require('./identicon')
const EthBalance = require('../components/eth-balance')
const formatBalance = require('../util').formatBalance
const addressSummary = require('../util').addressSummary

module.exports = AccountPanel


inherits(AccountPanel, Component)
function AccountPanel () {
  Component.call(this)
}

AccountPanel.prototype.render = function () {
  var state = this.props
  var identity = state.identity || {}
  const { network, conversionRate, currentCurrency ,checksumAddress} = state
  function shorten(b, amountL = 7, /*amountR = 4,*/ stars = 3) {

    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
  
        b.length - 4,
  
        b.length
  
    )}`;
  }
  var account = state.account || {}
  var isFauceting = state.isFauceting

  var panelState = {
    key: `accountPanel${identity.address}`,
    identiconKey: identity.address,
    identiconLabel: identity.name || '',
    attributes: [
      {
        key: 'Address',
        value: addressSummary(state.network, identity.address),
      },
      balanceOrFaucetingIndication(account, isFauceting, state.network),
    ],
  }

  return (

    h('.identity-panel.flex-row.flex-space-between', {
      style: {
        background: ((state.style && state.style.background) || '#ffffff'),
        padding: '30px',
        borderBottom: '1px solid #E3E7EB',
        flex: '1 0 auto',
        cursor: panelState.onClick ? 'pointer' : undefined,
      },
      onClick: panelState.onClick,
    }, [

      // account identicon
      // h('.identicon-wrapper.flex-column.select-none', [
        // h(Identicon, {
        //   address: panelState.identiconKey,
        //   imageify: state.imageifyIdenticons,
        //   diameter: 60,
        // }),
      // ]),

      // account address, balance
      h('.identity-data.flex-column.flex-justify-center.flex-grow.select-none', [
        h('h2.font-medium', {
          style: {
            color: '#2a2a2a',
            // marginBottom: '20px',
            margin: '0 auto 0 auto',
            // fontFamily: 'Inter',
            fontSize: '14px',
            lineHeight: '16px',
            fontWeight: '600',
          },
        }, panelState.identiconLabel),
        h('span', {
          style: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingTop: '3px',
            // width: '8em',
            height: '19px',
            margin: '0 auto 0 auto',
            fontSize: '12px',
            // fontFamily: 'Inter',
            textRendering: 'geometricPrecision',
            color: '#848484',
          }
        }, shorten(checksumAddress)),
      
        // panelState.attributes.map((attr) => {
        //   return h('.flex-row.flex-space-between', {
        //     key: '',
        //   },
        //     [
        //     // h('label.font-pre-medium.no-select', {
        //     //   style: {
        //     //     color: '#ffffff',
        //     //     marginBottom: i === 0 ? '10px' : '0px',
        //     //     lineHeight: '14px',
        //     //   },
        //     // }, attr.key),
        //     // h('span.font-pre-medium', {
        //     //   style: {
        //     //     color: '#ffffff',
        //     //     lineHeight: '14px',
        //     //   },
        //     // }, attr.value),
            
            
        //   ])
        // }),

        h(EthBalance, {
            
          value: account && account.balance,
          conversionRate,
          currentCurrency,
          network,

          style: {
            lineHeight: '7px',
            // margin:'25px 0 0 23px',
            marginTop: '22px',
            justifyContent: 'center',
          },
        }),

      ]),

    ])

  )
}

function balanceOrFaucetingIndication (account, isFauceting, network) {
  // Temporarily deactivating isFauceting indication
  // because it shows fauceting for empty restored accounts.
  if (/* isFauceting*/ false) {
    return {
      key: 'Account is auto-funding.',
      value: 'Please wait.',
    }
  } else {
    return {
      key: 'Balance',
      value: formatBalance(account.balance, undefined, undefined, network),
    }
  }
}
