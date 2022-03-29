import React from 'react'
import { ACTIONS, formatCurrency } from './App'

export default function Item({ dispatch, itemId, name, price, stock }) {
  return (
    <div className="item">
      <button className="item-button" onClick={() => dispatch({ type: ACTIONS.SELECT_ITEM, payload: { itemId: itemId } })}>
        {name}
        <div className="item-stock">Stock: {stock}</div>
        <div className="item-price">Price: {formatCurrency(price)}</div>
      </button>
    </div>
  )
}
