const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../../ui/app/actions')

module.exports = connect(mapStateToProps)(ConfirmChangePassword)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}

inherits(ConfirmChangePassword, Component)
function ConfirmChangePassword () {
  Component.call(this)
}

ConfirmChangePassword.prototype.render = function () {
  const state = this.props
  const passwordInputAdditionalStyle = {
    width: '265px',
    border: '2px solid #C7CDD8',
    // marginTop: 10,
    marginBottom: 20,
  }
  return h('.flex-column.flex-grow', {
    style: {
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '30px 46px 30px'
    },
  }, [
    // subtitle and nav
    h('.flex-row.flex-center', [
      h('img.cursor-pointer', { src: '/images/Assets/BackArrow.svg',
        onClick: () => {
          this.props.dispatch(actions.showConfigPage())
        },
        style: {
          position: 'absolute',
          left: '15px',
        },
      }),
      h('h2.page-subtitle', 'Change Password'),
    ]),
    h('div', {
      style: {
        marginTop: '26px',
      },
    }, [
      h('.error', {
        style: {
          display: state.warning ? 'block' : 'none',
        },
      }, state.warning),
      h('span', {style:{fontSize: '12px', fontWeight: 'bold'}}, 'Old password'),
      h('input.large-input', {
        type: 'password',
        id: 'old-password-box',
        ref: 'OldPasswordBox',
        style: passwordInputAdditionalStyle,
      }),
      h('span', {style:{fontSize: '12px', fontWeight: 'bold'}}, 'New password'),
      h('input.large-input', {
        type: 'password',
        id: 'new-password-box',
        ref: 'NewPasswordBox',
        style: passwordInputAdditionalStyle,
      }),
      h('span', {style:{fontSize: '12px', fontWeight: 'bold'}}, 'Confirm new password'),
      h('input.large-input', {
        type: 'password',
        id: 'password-box-confirm',
        ref: 'PasswordBoxConfirm',
        style: passwordInputAdditionalStyle,
        onKeyPress: this.createOnEnter.bind(this),
      }),
    ]),
    h('p.confirm-label', {
        style: {
          textAlign: 'center',
          marginTop: '15px',
          background: '#FFF2F5',
          color: '#FF0035',
          border: '1px solid',
          padding: '20px 20px',
          fontSize: '12px',
          fontFamily: 'Inter-Regular'
        },
      },
      `Are you sure you want to change the password for unlocking of your wallet?`),
    h('.flex-row.flex-right', {
      style: {
        marginTop: '35px',
      },
    }, [
      h('button.btn-violet',
        {
          style:{
            display: 'flex',
            position: 'absolute',
            left: '46px',
            height: '40px',
            width: '119px',
            paddingLeft: '51px',
            paddingTop: '12px',
            background: '#FF0035',
          },
          onClick: () => {
            this.props.dispatch(actions.showConfigPage())
          },
        },
        'No'),
      h('button',
        {
          style:{
            display: 'flex',
                  position: 'absolute',
                  right: '46px',
                  height: '40px',
                  width: '119px',
                  paddingLeft: '49px',
                  paddingTop: '12px',
          },
          onClick: () => {
            this.ChangePassword()
          },
        },
        'Yes'),
    ]),
  ])
}

ConfirmChangePassword.prototype.componentWillUnmount = function () {
  this.props.dispatch(actions.displayWarning(''))
}

ConfirmChangePassword.prototype.createOnEnter = function (event) {
  if (event.key === 'Enter') {
    this.ChangePassword()
  }
}

ConfirmChangePassword.prototype.ChangePassword = function () {
  const { props, refs } = this
  const oldPasswordBox = refs.OldPasswordBox
  const oldPassword = oldPasswordBox.value
  const newPasswordBox = refs.NewPasswordBox
  const newPassword = newPasswordBox.value
  const newPasswordConfirmBox = refs.PasswordBoxConfirm
  const newPasswordConfirm = newPasswordConfirmBox.value

  if (newPassword.length < 8) {
    this.warning = 'Password not long enough'

    props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (newPassword !== newPasswordConfirm) {
    this.warning = 'Passwords don\'t match'
    props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (newPassword === oldPassword) {
    this.warning = 'New password should differ from the current one'
    props.dispatch(actions.displayWarning(this.warning))
    return
  }
  props.dispatch(actions.changePassword(oldPassword, newPassword))
    .then(() => {
      props.dispatch(actions.showConfigPage())
    })
    .catch((err) => {
      this.warning = err.message
      props.dispatch(actions.displayWarning(this.warning))
    })
}
