import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { logOut } from '../logic/authorization'
import { loadData } from '../store/data/thunks'

const Main = styled.header`
  height: 48px;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const Name = styled.h1`
  font-size: 20px;
  font-weight: 400;
  padding: 0;
  margin: 0;
`
const Buttons = styled.div`
  justify-self: flex-end;
`
const NavLink = styled(Link)`
  margin-left: 16px;
`
const StyledButton = styled(Button)`
  margin-left: 16px;
`

function Header(props) {
  return (
    <Main>
      <Name>More Money Now</Name>
      <div>
        <NavLink to="/transactions">Транзакции</NavLink>
        <NavLink to="/tags">Категории</NavLink>
      </div>
      <Buttons>
        <StyledButton onClick={props.logOut}>Выйти</StyledButton>

        <StyledButton icon="reload" onClick={props.loadData}>
          Обновить данные
        </StyledButton>
      </Buttons>
    </Main>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    loadData: () => dispatch(loadData())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Header)
