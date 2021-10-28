const inherits = require('util').inherits
const EventEmitter = require('events').EventEmitter
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../ui/app/actions')
const Tooltip = require('../components/tooltip')

module.exports = connect(mapStateToProps)(InitializeMenuScreen)

inherits(InitializeMenuScreen, Component)
function InitializeMenuScreen () {
  Component.call(this)
  this.animationEventEmitter = new EventEmitter()
}

function mapStateToProps (state) {
  return {
    // state from plugin
    currentView: state.appState.currentView,
    warning: state.appState.warning,
  }
}

InitializeMenuScreen.prototype.render = function () {
  var state = this.props

  switch (state.currentView.name) {

    default:
      return this.renderMenu(state)

  }
}

// InitializeMenuScreen.prototype.componentDidMount = function(){
//   document.getElementById('password-box').focus()
// }

InitializeMenuScreen.prototype.renderMenu = function (state) {
  return (

    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      // disable fox's animation
      /* h(Mascot, {
        animationEventEmitter: this.animationEventEmitter,
      }),*/

      h('.logo'),

      // h('h1', {
      //   style: {
      //     paddingTop: '50px',
      //     fontSize: '1.3em',
      //     color: '#ffffff',
      //     marginBottom: 10,
      //   },
      // }, 'XDCPay'),


      h('div',{
        style:{
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'row-reverse',
          marginLeft: '-22px',
        },
      }, 
        [
        h('h3', {
          style: {
            fontSize: '15px',
            color: '#2a2a2a',
            display: 'inline',
            fontWeight: 'bold',
          },
        }, 'Encrypt your new DEN'),

      //   h(Tooltip, {
      //     title: 'Your DEN is your password-encrypted storage within XDCPay.',
      //   }, [
      //     h('img', { src: "/images/Assets/QuestionMark.svg",
      //       style: {
      //         position: 'relative',
      //         top: '3px',
      //         marginLeft: '6px',
      //         marginTop: '48px',
      //       },
      //     }),
      //   ]),
      h('div',{className:'tooltip'},
      [
        h('img', { src: "/images/Assets/QuestionMark.svg",
            style: {
              marginRight: '-22px',
              paddingTop: '3px',
              paddingLeft: '5px'
              },
        }),
        // h('img', onmouseover={ src: "/images/Assets/QuestionMarkActive.svg",
        //     style: {
        //       marginRight: '-22px',
        //       paddingTop: '3px',
        //       paddingLeft: '5px'
        //       },
        //     }),
        h('span',{className: 'tooltiptext'},
          'Your DEN is your password-encrypted Storage within XDC Pay'
        ),
      ]
      )
      ]),

      state.warning ? h('div', {
        style: {
          width: '260px',
          padding: '20px 0 0',
        },
      }, [
        h('div.error', state.warning),
      ]) : null,

      // password
      h('input.large-input', {
        type: 'password',
        id: 'password-box',
        placeholder: 'New Password (min 8 chars)',
        style: {
          width: 265,
          height: 40,
          marginTop: 15,
          border: '2px solid #C7CDD8',
          borderRadius: 4,
        },
      }),

      // confirm password
      h('input.large-input', {
        type: 'password',
        id: 'password-box-confirm',
        placeholder: 'Confirm Password',
        onKeyPress: this.createVaultOnEnter.bind(this),
        style: {
          width: 265,
          height: 40,
          marginTop: 15,
          border: '2px solid #C7CDD8',
          borderRadius: 4,
        },
      }),


      h('button', {
        onClick: this.createNewVaultAndKeychain.bind(this),
        style: {
          marginTop: 29,
          width: 265,
          height: 40,
        },
      }, 'Create'),

      h('.flex-row.flex-center.flex-grow', [
        h('p.pointer', {
          onClick: this.showRestoreVault.bind(this),
          style: {
            fontSize: '14px',
            color: '#2149B9',
            marginTop: '74px',
          },
        }, 'Import Existing Den'),
      ]),

    ])
  )
}

InitializeMenuScreen.prototype.createVaultOnEnter = function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    this.createNewVaultAndKeychain()
  }
}

InitializeMenuScreen.prototype.componentDidMount = function () {
  document.getElementById('password-box').focus()
}

InitializeMenuScreen.prototype.componentWillUnmount = function () {
  this.props.dispatch(actions.displayWarning(''))
}

InitializeMenuScreen.prototype.showRestoreVault = function () {
  this.props.dispatch(actions.showRestoreVault())
}

InitializeMenuScreen.prototype.createNewVaultAndKeychain = function () {
  var passwordBox = document.getElementById('password-box')
  var password = passwordBox.value
  var passwordConfirmBox = document.getElementById('password-box-confirm')
  var passwordConfirm = passwordConfirmBox.value

  if (password.length < 8) {
    this.warning = 'Password is not long enough'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (password !== passwordConfirm) {
    this.warning = 'Passwords don\'t match'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }

  this.props.dispatch(actions.createNewVaultAndKeychain(password))
}
