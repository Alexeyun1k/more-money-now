import React from 'react'
import styled from 'styled-components'

import Transaction from './Transaction'

const GroupContainer = styled.div`
  padding: 0 16px;
`
const Group = styled.div`
  position: relative;
  max-width: 560px;
  margin: 0 auto;
`
const Title = styled.h3`
  position: sticky;
  top: 0;
  z-index: 2;
  margin: 0;
  padding: 8px 0;
  color: rgba(0, 0, 0, 0.56);
  font-weight: 400;
  background-color: #fff;
`

export default class TransactionGroup extends React.PureComponent {
  render() {
    return (
      <GroupContainer style={this.props.style}>
        <Group>
          <Title>{this.props.name}</Title>
          <div>
            {this.props.transactions.map(id => (
              <Transaction key={id.id} id={id.id} />
            ))}
          </div>
        </Group>
      </GroupContainer>
    )
  }
}
