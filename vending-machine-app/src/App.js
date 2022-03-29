import './App.css';
import _ from "lodash";
import produce from "immer";

import { useReducer } from "react"
import { v4 as uuidv4 } from 'uuid';

import Item from "./Item";
import Coin from "./Coin";
import PurchasedItem from "./PurchasedItem"

// helper for formatting currencies everywhere
const CURRENCY_SYMBOL = "$"
export function formatCurrency(number) {
  if (number == null) {
    return
  } else {
    return `${CURRENCY_SYMBOL}${number}`
  }
}

// defining some global values to populate the vending machine with and use as a strating point
const COINS = [0.01, 0.05, 0.1, 0.25, 0.5, 1]
const ITEMS = {
  "1": { "name": "Coca", "price": 1.35, "stock": 3 },
  "2": { "name": "Cola", "price": 0.75, "stock": 2 },
  "3": { "name": "Can", "price": 0.2, "stock": 10 },
  "4": { "name": "CocaCola", "price": 2.35, "stock": 1 },
  "5": { "name": "Pepsi Lime", "price": 2.25, "stock": 5 },
  "6": { "name": "Pepsi", "price": 1.75, "stock": 4 },
  "7": { "name": "Lemon", "price": 0.5, "stock": 2 },
  "8": { "name": "Lime", "price": 0.5, "stock": 2 },
  "9": { "name": "Something", "price": 1.26, "stock": 5 },
  "10": { "name": "Else", "price": 0.55, "stock": 20 },
  "11": { "name": "Entirely", "price": 0.51, "stock": 1 },
}
const PURCHASED_ITEMS_DEFAULT = [
  { "uuid": uuidv4(), "itemId": 1 },
  { "uuid": uuidv4(), "itemId": 1 },
  { "uuid": uuidv4(), "itemId": 2 }
]

// the actions that are possible in the app - handled by reducer
export const ACTIONS = {
  "SELECT_ITEM": "select-item",
  "INSERT_COIN": "insert-coin",
  "DELETE_ITEM_FROM_LIST": "delete-item-from-list",
  "RELOAD": "reload",
  "RESET": "reset",
}

// the main state changing logic of the app
function reducer(state, { type, payload }) {
  console.log(`Type: ${type}.`)
  switch (type) {
    case ACTIONS.SELECT_ITEM:
      return { ...state }
    case ACTIONS.INSERT_COIN:
      return { ...state }
    case ACTIONS.DELETE_ITEM_FROM_LIST:
      return { ...state }
    case ACTIONS.RELOAD:
      // reloads the current coins in the machine and item selection
      // doesn't touch the purchased items list or stock levels
      return {
        ...state,
        selectedItemId: 0,
        currentCoins: 0,
        warningDisplay: ""
      };
    case ACTIONS.RESET:
      // full reset to the initial state
      return _.cloneDeep(initialState);
    default:
      return state;
  }
}

// initial values for components
// doing a deep clone on ITEMS to prevent issues with mutability
const initialState = {
  purchasedItems: [...PURCHASED_ITEMS_DEFAULT],
  items: _.cloneDeep(ITEMS),
  selectedItemId: 0,
  currentCoins: 0,
  warningDisplay: ""
}

function App() {
  const [state, dispatch] = useReducer(reducer, _.cloneDeep(initialState));

  return (
    <div className="container">
      <div className="items-grid">
        <div className="display">
          <div className="coins-output">COINS: {formatCurrency(state.currentCoins)}</div>
          <div className="items-output">ITEM: {state.items[state["selectedItemId"]]?.name}</div>
          <div className="warning-output">{state.warningDisplay}</div>
        </div>
        {
          Object.entries(state.items).map(([id, item]) => {
            return <Item key={uuidv4()} dispatch={dispatch} itemId={id} name={item.name} price={item.price} stock={item.stock} />
          })
        }
        <button className="reload-button" onClick={() => dispatch({ type: ACTIONS.RELOAD })}>
          RELOAD<br></br>MACHINE
        </button>
      </div>
      <div>
        <div className="coins-row">
          <p>COINS: </p>
          {
            COINS.map(coinValue => {
              return <Coin key={coinValue} dispatch={dispatch} value={coinValue} />
            })
          }
        </div>
      </div>
      <div className="purchased-items-list">
        <p>PURCHASED ITEMS:</p>
        {
          state.purchasedItems?.map(purchasedItem => {
            const itemInfo = state.items[purchasedItem.itemId];
            return <PurchasedItem
              key={purchasedItem.uuid} dispatch={dispatch} uuid={purchasedItem.uuid}
              itemId={purchasedItem.itemId} name={itemInfo?.name} price={itemInfo?.price}
            />
          })
        }
      </div>
      .
      <div className="reset-button-row">
        <button className="reset-button" onClick={() => dispatch({ type: ACTIONS.RESET })}>
          RESET EVERYTHING
        </button>
      </div>
    </div>
  );
}

export default App;
