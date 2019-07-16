import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import TransactionList from './transaction-list.component'
import {
  nonceSortedCompletedTransactionsSelector,
  nonceSortedPendingTransactionsSelector,
} from '../../../selectors/transactions'
import { getSelectedAddress, getAssetImages, getCurrentEthBalance } from '../../../selectors/selectors'
import { selectedTokenSelector } from '../../../selectors/tokens'
import { updateNetworkNonce } from '../../../store/actions'

const mapStateToProps = state => {
  const accountBalance = getCurrentEthBalance(state)
  const seedPhraseBackedUp = state.metamask.seedPhraseBackedUp

  return {
    completedTransactions: nonceSortedCompletedTransactionsSelector(state),
    pendingTransactions: nonceSortedPendingTransactionsSelector(state),
    selectedToken: selectedTokenSelector(state),
    selectedAddress: getSelectedAddress(state),
    assetImages: getAssetImages(state),
    shouldShowSeedPhraseReminder: parseInt(accountBalance, 16) > 0 && !seedPhraseBackedUp,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateNetworkNonce: address => dispatch(updateNetworkNonce(address)),
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedAddress, ...restStateProps } = stateProps
  const { updateNetworkNonce, ...restDispatchProps } = dispatchProps

  return {
    ...restStateProps,
    ...restDispatchProps,
    ...ownProps,
    updateNetworkNonce: () => updateNetworkNonce(selectedAddress),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(TransactionList)
