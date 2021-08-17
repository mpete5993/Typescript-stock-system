import { StorageController } from "../classes/storage.js";

export const ItemController = (() => {
    //Item contrustor
    const Item = function (this: any, id: number, name: string, price: number, qty: number) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.qty = qty;
    }
  
    // Data Structure - State 

    const data = {
      // items: [
      //   //initializing items manually
      //   { id: 0, name: 'Product 1', price: 1250, qty: 15 },
      //   { id: 1, name: 'Product 2', price: 1250, qty: 18  },
      //   { id: 2, name: 'Product 3', price: 13570, qty: 10},
      // ],
      items: StorageController.getItemsFromStorage(),//saving items into LocalStorage
      currentItem: null, //for updating an item
      averagePrice: 0
    }
  
    //give access to data
    return {
      //fetch data
      getItems: () => {
        return data.items;
      },
      //add items
      addItem: (name: string, price: number, qty: number) => {
        let ID;
        //generate ID for items
        if (data.items.length > 0) {
          ID = data.items[data.items.length - 1].id + 1;
        }
        else {
          ID = 0;
        }
        //create new Item
        const newItem = new Item(ID, name, price, qty);
        //add to items array
        data.items.push(newItem);
  
        return newItem;
      },
      updateItem: (qty: number) => {
        //qty  & Price to number
        qty = parseInt(qty);
        //find item
        let found = null;
        data.items.forEach( (item: { id: number; qty: number; })=>  {
  
          if (item.id === data.currentItem.id) {
            let numOfItems:number = parseInt(item.qty);
            item.qty = numOfItems + qty;
            found = item;
          }
        });
        return found;
      },
      buyItem: (qty:any) => {
        //qty to number
        qty = parseInt(qty);
        //find item
        let found = null;
        data.items.forEach(function (item:any) {
  
          if (item.id === data.currentItem!.id) {
            let numOfItems = parseInt(item.qty);
            item.qty = numOfItems - qty;
            found = item;
          }
  
        });
        return found;
      },
      getItemById: (id:any) => {
        let found;
        //loop through the item
        data.items.forEach((item:any) => {
          if (item.id === id) {
            found = item;
          }
        });
        return found;
      },
      setCurrentItem: (item:any): void => {
        data.currentItem = item;
      },
      getCurrentItem: function () {
        return data.currentItem;
      },
      logData: () => {
        return data;
      }
    }
  })();