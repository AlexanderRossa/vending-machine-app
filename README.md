## Vending Machine App

This is a demo of a Vending Machine I wrote in React and deployed to GitHub pages at https://alexanderrossa.github.io/vending-machine-app.

The machine is quite simple as it was a short project written under time constraints.

### The machine can:
- accept coins
- select items
- keep track of purchased items
- delete the items from the list of purchased items
- reload (return any cash in machine and deselect item)
- reset (reset everything to initial state)

### The behaviours are:
- if coin is inserted:
  - if an item is selected:
    - if there's enough coins to purchase after insertion: purchase it
    - else just add coins to the existing coins
  - else just add coins to the existing coins

- if item is selected:
  - if there's already enough coins to purchase: purchase it
  - else: select the item

Purchase decreases the stock and adds the item to the purchased list.

Deleting item from the list "returns" the item back by increasing stock.

### Running locally

Since this is a standard React app you can simply download the repo and run `npm start` to run it against `localhost`.

Has dependency on `immer` and `lodash`.