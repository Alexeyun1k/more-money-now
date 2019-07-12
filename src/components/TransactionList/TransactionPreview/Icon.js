import React from 'react'
import styled, { css } from 'styled-components'
import { Checkbox } from 'antd'

const Body = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-top: -8px;
  margin-right: 16px;
`
const StyledCheckbox = styled(Checkbox)`
  opacity: 0;

  ${Body}:hover & {
    opacity: 1;
  }

  ${props =>
    props.isInSelectionMode &&
    css`
      opacity: 1;
    `}
`

const Sym = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${({ color }) => (color ? color : `#000`)};
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;

  ${Body}:hover & {
    display: none;
  }

  ${props =>
    props.isInSelectionMode &&
    css`
      display: none;
    `}
`
export default class Icon extends React.Component {
  handleChange = e => {
    e.stopPropagation()
    this.props.onToggle()
  }
  render() {
    const { isChecked, isInSelectionMode, symbol, color } = this.props
    return (
      <Body>
        <StyledCheckbox
          isInSelectionMode={isInSelectionMode}
          checked={isChecked}
          onClick={this.handleChange}
        />
        <Sym isInSelectionMode={isInSelectionMode} color={color}>
          {symbol}
        </Sym>
      </Body>
    )
  }
}

// export function Icon({ isChecked, isInSelectionMode, symbol, onToggle }) {}
