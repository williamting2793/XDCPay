const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')


module.exports = connect(mapStateToProps)(InfoScreen)

function mapStateToProps (state) {
  return {}
}

inherits(InfoScreen, Component)
function InfoScreen () {
  Component.call(this)
}

InfoScreen.prototype.render = function () {
  const state = this.props
  const version = global.platform.getVersion()
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    h('.flex-column.flex-grow', {
      style: {
        maxWidth: '400px',
      },
    }, [
      
      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('img.cursor-pointer', {
          src:"/images/Assets/BackArrow.svg",
          onClick: (event) => {
            state.dispatch(actions.goHome())
          },
          style: {
            position: 'absolute',
            left: '15px',
          },
        }),
        h('h2', {
          style: {
            fontFamily: 'Inter-Bold',
          }}, 'Info'),
        ]),
        
        // main view
        h('.flex-column.flex-justify-center.flex-grow.select-none', [
          h('.flex-space-around', {
            style: {
              padding: '25px 58px',
            },
          }, [
            // current version number
            
            h('.info', [
              h('div', 'XDCPay'),
              h('div', `Version: ${version}`),
              h('div', {
                onClick: () => { openInNewTab('https://github.com/XinFinOrg/XDCPay')
                  
                },
                style: {
                  marginBottom: '10px',
                  cursor: 'pointer',
                  color: 'rgb(33, 73, 185)',
                },
              }, `Go to Github `),
              
            ]),

          


            
            
            
        ]),
        
      ]),
    ])
  )
}

InfoScreen.prototype.navigateTo = function (url) {
  global.platform.openWindow({ url })
}

