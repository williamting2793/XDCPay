import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../ui/app/actions'

class ErrorComponent extends Component {
	static propTypes = {
		error: PropTypes.string,
		hideWarning: PropTypes.func,
	}

	render () {
		return this.props.error ? (
			<div style={{
				margin: '-9px 0',
				// textAlign: 'center',
				// position: 'absolute',
				// top: '0',
				// // background: 'rgba(255, 255, 255, 0.85)',
				// width: '100%',
				// paddingLeft: '30px',
				// paddingRight: '30px',
				// paddingTop: '70%',
				// // zIndex: '100',
				// height: '100%',
			}}>
				<div
					style={{
						// backgroundImage: `url('../images/close.svg')`,
						backgroundRepeat: 'no-repeat',
						width: '16px',
						height: '16px',
						cursor: 'pointer',
					}}
					onClick={(e) => this.props.hideWarning()}
				/>
				<div style={{
					// marginLeft: '46px',
					// marginRight: '46px',
				}} >
					<div
						className="error"
						style={{
							wordBreak: 'break-word',
							// margin: '0 45px',
							// border: '1px solid #ff1345',
						}}
					>{this.props.error}</div>
				</div>
			</div>
		) : null
	}
}

function mapDispatchToProps (dispatch) {
	return {
		hideWarning: () => dispatch(actions.hideWarning()),
	}
}

module.exports = connect(null, mapDispatchToProps)(ErrorComponent)
