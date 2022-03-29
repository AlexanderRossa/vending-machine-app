import React from 'react'
import { ACTIONS, formatCurrency } from './App'

export default function PurchasedItem({ dispatch, uuid, itemId, name, price }) {
  return (
    <div className="purchased-item">
      <p>{name}</p>
      <p className="purchased-item-price">{formatCurrency(price)}</p>
      <button className="delete-button" onClick={() => dispatch({ type: ACTIONS.DELETE_ITEM_FROM_LIST, payload: { itemId: itemId, uuid: uuid } })} >
        X
      </button>
    </div>
  )
}
