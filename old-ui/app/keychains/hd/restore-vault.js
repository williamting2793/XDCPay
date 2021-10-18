const inherits = require('util').inherits
const PersistentForm = require('../../../lib/persistent-form')
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../ui/app/actions')

module.exports = connect(mapStateToProps)(RestoreVaultScreen)

inherits(RestoreVaultScreen, PersistentForm)
function RestoreVaultScreen () {
  PersistentForm.call(this)
}

function mapStateToProps (state) {
  return {
    warning: state.appState.warning,
    forgottenPassword: state.appState.forgottenPassword,
  }
}

RestoreVaultScreen.prototype.render = function () {
  var state = this.props
  this.persistentFormParentId = 'restore-vault-form'

  return (

    h('div', {
      style: {
        width: '100%',
      },
    }, [
      h('.section-title', { style: {
        width: '100%',
        height: '38px',
        background: '#E3E7EB',
        marginTop: '-38px',
      }},
        h('img', {style: { marginTop:'8px', marginLeft:'9px' }, src: "/images/Assets/XDC-Icon-16X16.png"} ),
      ),
      h('.initialize-screen.flex-column.flex-center.flex-grow', {
        style: {
          paddingLeft: '30px',
          paddingRight: '30px',
        },
      }, [
        h('h3.flex-center', {
          style: {
            fontFamily: 'Nunito SemiBold',
            background: '#ffffff',
            color: '#2A2A2A',
            width: '100%',
            fontSize: '15px',
            paddingTop: 40,
          },
        }, [
          h('.page-subtitle', {style:{fontWeight: 600}}, 'Restore Vault'),
        ]),

        // wallet seed entry
        // h('h3.flex-left', {
        //   style: {
        //     width: '100%',
        //     marginBottom: '20px',
        //     fontFamily: 'Nunito SemiBold',
        //   },
        // }, 'Wallet Seed'),
        h('textarea.twelve-word-phrase', {
          style: {marginTop: '24px'},
          placeholder: 'Enter your secret twelve word phrase here to restore your vault.',
        }),

        // password
        h('input.large-input', {
          type: 'password',
          id: 'password-box',
          placeholder: 'New Password (min 8 chars)',
          dataset: {
            persistentFormId: 'password',
          },
          style: {
            width: '265px',
            height: '40px',
            marginTop: 20,
            border: '2px solid #C7CDD8',
          },
        }),

        // confirm password
        h('input.large-input', {
          type: 'password',
          id: 'password-box-confirm',
          placeholder: 'Confirm Password',
          onKeyPress: this.createOnEnter.bind(this),
          dataset: {
            persistentFormId: 'password-confirmation',
          },
          style: {
            width: '265px',
            height: '40px',
            marginTop: 20,
            border: '2px solid #C7CDD8',
          },
        }),

        (state.warning) && (
          h('div', {
            style: {
              // marginLeft: '46px',
              marginTop: '20px',
              width: '265px',
            },
          }, [
            h('div.error.in-progress-notification', state.warning),
          ])
        ),

        // submit

        h('.flex-row.flex-space-between.flex-right', {
          style: {
            marginTop: 24,
            width: '265px',
          },
        }, [

          // cancel
          h('button.btn-violet', {
            onClick: this.showInitializeMenu.bind(this),
            style: {
              width: '120px',
              height: '40px',
              background: '#E3E7EB',
              color: '#2A2A2A',
              marginRight: '25px',
            },
          }, 'Cancel'),

          // submit
          h('button', {
            onClick: this.createNewVaultAndRestore.bind(this),
            style: {
              width: '120px',
              height: '40px',
              background: '#03BE46'
            }
          }, 'Restore'),

        ]),
      ]),
    ])
  )
}

RestoreVaultScreen.prototype.showInitializeMenu = function () {
  if (this.props.forgottenPassword) {
    this.props.dispatch(actions.backToUnlockView())
  } else {
    this.props.dispatch(actions.showInitializeMenu())
  }
}

RestoreVaultScreen.prototype.createOnEnter = function (event) {
  if (event.key === 'Enter') {
    this.createNewVaultAndRestore()
  }
}

RestoreVaultScreen.prototype.createNewVaultAndRestore = function () {
  // check password
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
  // check seed
  var seedBox = document.querySelector('textarea.twelve-word-phrase')
  var seed = seedBox.value.trim()

  // true if the string has more than a space between words.
  if (seed.split('  ').length > 1) {
    this.warning = 'There can only be a space between words'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // true if seed contains a character that is not between a-z or a space
  if (!seed.match(/^[a-z ]+$/)) {
    this.warning = 'Seed words only have lowercase characters'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (seed.split(' ').length !== 12) {
    this.warning = 'Seed phrases are 12 words long'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // submit
  this.warning = null
  this.props.dispatch(actions.displayWarning(this.warning))
  this.props.dispatch(actions.createNewVaultAndRestore(password, seed))
}
