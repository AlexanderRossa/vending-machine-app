import React from 'react'
import { ACTIONS } from './App'

export default function Coin({ dispatch, value }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.INSERT_COIN, payload: { value: value } })} >
      {value}
    </button>
  )
}