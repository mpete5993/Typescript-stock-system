export const ItemController = (() => {
    //Item contrustor
    const Item = function (id, name, price, qty) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qty = qty;
    };
    // Data Structure - State 
    const data = {
        // items: [
        //   //initializing items manually
        //   { id: 0, name: 'Product 1', price: 1250, qty: 15 },
        //   { id: 1, name: 'Product 2', price: 1250, qty: 18  },
        //   { id: 2, name: 'Product 3', price: 13570, qty: 10},
        // ],
        items: StorageController.getItemsFromStorage(),
        currentItem: null,
        averagePrice: 0
    };
    //give access to data
    return {
        //fetch data
        getItems: () => {
            return data.items;
        },
        //add items
        addItem: (name, price, qty) => {
            let ID;
            //generate ID for items
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            }
            else {
                ID = 0;
            }
            //create new Item
            newItem = new Item(ID, name, price, qty);
            //add to items array
            data.items.push(newItem);
            return newItem;
        },
        updateItem: (qty) => {
            //qty  & Price to number
            qty = parseInt(qty);
            //find item
            let found = null;
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    let numOfItems = parseInt(item.qty);
                    item.qty = numOfItems + qty;
                    found = item;
                }
            });
            return found;
        },
        buyItem: (qty) => {
            //qty to number
            qty = parseInt(qty);
            //find item
            let found = null;
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    let numOfItems = parseInt(item.qty);
                    item.qty = numOfItems - qty;
                    found = item;
                }
            });
            return found;
        },
        getItemById: (id) => {
            let found;
            //loop through the item
            data.items.forEach((item) => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: (item) => {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        logData: () => {
            return data;
        }
    };
})();
