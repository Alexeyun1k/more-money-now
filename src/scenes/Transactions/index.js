import React, { Component } from 'react'
import styled from 'styled-components'

import Header from 'components/Header'
import TransactionList from 'components/TransactionList'
import DetailsPanel from 'components/DetailsPanel'
import BulkActions from 'components/BulkActions'
import AccountList from 'components/AccountList'

const Body = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 48px);
  overflow: auto;
`
const Menu = styled.div`
  flex-shrink: 0;
  width: 280px;
  padding: 40px;
  overflow: auto;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`
const StyledTransactionList = styled(TransactionList)`
  flex-grow: 1;
  min-width: 0;
  height: 100%;
`
const SidePanel = styled.div`
  width: 450px;
  overflow: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`

export default class TransactionsView extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Body>
          <Menu>
            <BulkActions />
            <AccountList />
          </Menu>

          <StyledTransactionList groupBy={'DAY'} />

          <SidePanel>
            <DetailsPanel />
          </SidePanel>
        </Body>
      </React.Fragment>
    )
  }
}
