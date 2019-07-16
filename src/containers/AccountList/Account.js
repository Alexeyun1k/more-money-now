import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { formatMoney } from 'Utils/format'

const Body = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 0;
  margin: 0 -8px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    transition: all 0s;
  }
`
const Title = styled.div`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Amount = styled.div`
  flex-grow: 1;
  margin-left: 16px;
  text-align: right;
`

class Account extends React.Component {
  render() {
    const { title, balance, instrument, className } = this.props
    const formattedBalance = formatMoney(balance, instrument.shortTitle)
    return (
      <Body className={className}>
        <Title title={title}>{title}</Title>
        <Amount>{formattedBalance}</Amount>
      </Body>
    )
  }
}

const mapStateToProps = (state, props) => ({
  // ...getPopulatedAccount(state, props.id)
})

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
