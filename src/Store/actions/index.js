import * as types from '../actionTypes'
import ZenApi from '../../services/ZenApi'
import Cookies from '../../services/cookies'
import LocalStorage from '../../services/localstorage'

export const openTransaction = id => {
  return { type: types.TRANSACTION_OPEN, payload: id }
}

export const setToken = token => {
  return { type: types.SET_TOKEN, payload: token }
}

export const updateData = changed => (dispatch, getState) => {
  const { token, lastSync } = getState()
  ZenApi.getData(token, { lastSync, changed })
    .then(json => dispatch({ type: types.MERGE_SERVER_DATA, payload: json }))
    .catch(err => console.warn('!!!', err))
}

export const initState = () => dispatch => {
  const localToken = Cookies.get('token')
  const localData = LocalStorage.get('data')
  if (localToken) {
    dispatch({ type: types.SET_TOKEN, payload: localToken })
    if (localData) {
      dispatch({ type: types.SET_LOCAL_STATE, payload: localData })
    } else {
      dispatch({ type: types.UPDATE_DATA })
    }
  }
}

export const deleteTransaction = id => (dispatch, getState) => {
  const { token, lastSync, transaction } = getState()
  const changedTransaction = {
    ...transaction[id],
    deleted: true,
    changed: Date.now() / 1000
  }
  dispatch({ type: types.ADD_FAKE_TRANSACTION, payload: changedTransaction })
  const changed = {
    transaction: [changedTransaction]
  }
  ZenApi.getData(token, { lastSync, changed })
    .then(json => {
      dispatch({ type: types.MERGE_SERVER_DATA, payload: json })
      dispatch({
        type: types.REMOVE_FAKE_TRANSACTION,
        payload: changedTransaction.id
      })
    })
    .catch(err => {
      console.warn('!!!', err)
      dispatch({
        type: types.REMOVE_FAKE_TRANSACTION,
        payload: changedTransaction.id
      })
    })
}

export const restoreTransaction = id => (dispatch, getState) => {
  const { token, lastSync, transaction } = getState()
  const changed = {
    transaction: [
      {
        ...transaction[id],
        deleted: false,
        changed: Date.now() / 1000
      }
    ]
  }
  ZenApi.getData(token, { lastSync, changed })
    .then(json => dispatch({ type: types.MERGE_SERVER_DATA, payload: json }))
    .catch(err => console.warn('!!!', err))
}

export const applyChangesToTransaction = tr => (dispatch, getState) => {
  const { token, lastSync, transaction } = getState()
  const changedTransaction = {
    ...transaction[tr.id],
    ...tr,
    changed: Date.now() / 1000
  }
  dispatch({ type: types.ADD_FAKE_TRANSACTION, payload: changedTransaction })
  const changed = { transaction: [changedTransaction] }

  ZenApi.getData(token, { lastSync, changed })
    .then(json => {
      dispatch({ type: types.MERGE_SERVER_DATA, payload: json })
      dispatch({
        type: types.REMOVE_FAKE_TRANSACTION,
        payload: changedTransaction.id
      })
    })
    .catch(err => {
      console.warn('!!!', err)
      dispatch({
        type: types.REMOVE_FAKE_TRANSACTION,
        payload: changedTransaction.id
      })
    })
}
