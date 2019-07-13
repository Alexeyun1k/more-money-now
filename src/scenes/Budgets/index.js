import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Header from 'containers/Header'
import { getAllBudgets } from 'store/data/budgets'
import { getUserInstrument } from 'store/data/users'
import AccountList from 'containers/AccountList'
import TagTable from './TagTable'
import { TransferTable } from './TransferTable'
import BudgetInfo from './BudgetInfo'
import MonthSelector from './MonthSelect'
import isThisMonth from 'date-fns/is_this_month'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
`
const Grow1 = styled.div`
  flex-grow: 1;
  padding: 0 12px;
`
const LeftPanel = styled.div`
  padding: 40px;
`
const StyledAccountList = styled(AccountList)`
  margin-top: 24px;
`
const StyledBudgetInfo = styled(BudgetInfo)`
  margin-top: 24px;
`

class Budgets extends React.Component {
  state = { selected: 0 }

  componentDidMount = () => {
    this.setCurrentMonth()
  }

  setCurrentMonth = () => {
    if (this.props.budgets) {
      const current = this.props.budgets.findIndex(budget =>
        isThisMonth(budget.date)
      )
      this.setState({ selected: current })
    }
  }
  setMonth = i => {
    this.setState({ selected: i })
  }
  render() {
    const { budgets, instrument } = this.props
    const { selected } = this.state
    if (!budgets) return null
    const months = budgets.map(b => b.date)
    return (
      <div>
        <Header />
        <Wrap>
          <LeftPanel>
            <MonthSelector
              months={months}
              current={selected}
              onChange={this.setMonth}
            />
            <StyledBudgetInfo
              month={budgets[selected]}
              instrument={instrument}
            />
            <StyledAccountList />
          </LeftPanel>
          <Grow1>
            <TagTable
              tags={budgets[selected].tags}
              instrument={instrument}
              date={budgets[selected].date}
            />
            <TransferTable
              transfers={budgets[selected].transfers}
              instrument={instrument}
            />
          </Grow1>
        </Wrap>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    instrument: getUserInstrument(state),
    budgets: getAllBudgets(state),
  }
}

export default connect(
  mapStateToProps,
  null
)(Budgets)
