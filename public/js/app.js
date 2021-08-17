import { StorageController } from "./classes/storage.js"; // storage
import { ItemController } from "./classes/item.js"; // Item
import { UIController } from "./classes/ui.js"; //UI
/* ======= App controller ========== */
const AppController = ((ItemController, StorageController, UIController) => {
    //Load event Listeners
    const loadEventListeners = () => {
        //get Ui selectors
        const UISelectors = UIController.getSelectors();
        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        //add & buy items events
        document.querySelector(UISelectors.itemList).addEventListener('click', setToaddItems);
        document.querySelector(UISelectors.itemList).addEventListener('click', setToBuyItems);
        document.querySelector(UISelectors.updateItemsBtn).addEventListener('click', addMoreItemsSubmit);
        document.querySelector(UISelectors.buyBtn).addEventListener('click', buyItemsSubmit);
        //hide add and buy content
        document.querySelector(UISelectors.backBtn).addEventListener('click', hideAddStock);
        document.querySelector(UISelectors.backToList).addEventListener('click', hideBuyStock);
    };
    //add item submit
    const itemAddSubmit = (e) => {
        //get form input from UI controller
        const input = UIController.getItemInput();
        //check for input 
        if (input.name !== '' && input.price !== '' && input.qty !== '') {
            //add items
            const newItem = ItemController.addItem(input.name, input.price, input.qty);
            //Add item to UI list
            UIController.addListItem(newItem);
            //stoore in LocalStprage
            StorageController.storeItem(newItem);
            //show success message
            UIController.addStockSuccess();
            //clear fields after submit
            UIController.clearInput();
        }
        else {
            UIController.addStockWarning();
        }
        e.preventDefault();
    };
    //Update product  Items 
    const addMoreItemsSubmit = (e) => ;
});
{
    //get input from ui
    const input = UIController.getNumOfItems();
    if (input.qty != '') {
        //update item
        const updatedItem = ItemController.updateItem(input.qty);
        //update ui
        UIController.updateListItem(updatedItem);
        //add more items to existing product in LS
        StorageController.updateItemStorage(updatedItem);
        //success alert
        UIController.addItemsSuccess();
        //return to the List
        UIController.hideAddStockContent();
        //clear input value
        document.querySelector('.edit-qty').value = '';
    }
    else {
        UIController.addItemsMessage();
    }
    e.preventDefault();
}
//buy items
const buyItemsSubmit = (e) => {
    //get input from ui
    const input = UIController.getUserItems();
    //get user email
    const userEmail = document.querySelector('#user-email');
    const qtyInput = document.querySelector('#buy-item-qty');
    let emails = JSON.parse(localStorage.getItem('emails'));
    if (userEmail.value != '' && qtyInput.value != '') {
        const email = StorageController.storeUserEmailToStorage(userEmail.value);
        //update item
        const updatedItem = ItemController.buyItem(input.qty);
        //update ui
        UIController.updateListItem(updatedItem);
        //clear email input 
        UIController.clearUserEmail();
        //show success message
        UIController.buyItemsSuccess();
        //return to the List
        UIController.hideAddStockContent();
        //add more items to existing product in LS
        StorageController.updateItemStorage(updatedItem);
    }
    else {
        UIController.buyItemsWarning();
    }
    e.preventDefault();
};
//add items click event
const setToaddItems = (e) => {
    if (e.target.classList.contains('add-item')) {
        //get List Items ID
        const listId = e.target.parentNode.parentNode.parentNode.id;
        //break into array
        const listIdArr = listId.split('-');
        //get actual id
        const id = parseInt(listIdArr[1]);
        //get item
        const itemTOEdit = ItemController.getItemById(id);
        //set current Item
        ItemController.setCurrentItem(itemTOEdit);
        //add item to form
        UIController.addItemToForm();
    }
    e.preventDefault();
};
//buy items click event
const setToBuyItems = (e) => {
    if (e.target.classList.contains('remove-item')) {
        //get List Items ID
        const listId = e.target.parentNode.parentNode.parentNode.id;
        //break into array
        const listIdArr = listId.split('-');
        //get actual id
        const id = parseInt(listIdArr[1]);
        //get item
        const itemTOEdit = ItemController.getItemById(id);
        //set current Item
        ItemController.setCurrentItem(itemTOEdit);
        //add item to form
        UIController.buyItemToForm();
    }
    e.preventDefault();
};
//hide add content
const hideAddStock = (e) => {
    UIController.hideAddStockContent();
    e.preventDefault();
};
//hide add content
const hideBuyStock = (e) => {
    UIController.hideBuyStockContent();
    e.preventDefault();
};
//return initializer for the app
//public methods
return {
    init: () => {
        //edit state
        UIController.clearEditState();
        //fetch items from data structure
        const items = ItemController.getItems();
        //check if any items
        if (items.length === 0) {
            UIController.hideList();
        }
        else {
            //populate List with items
            UIController.populateItemList(items);
        }
        //display used Emails
        StorageController.getEmails();
        //Load event listeners
        loadEventListeners();
        UIController.updateListItem(items);
    }
};
(ItemController, StorageController, UIController);
//initialize App
AppController.init();
function newItem(newItem) {
    throw new Error("Function not implemented.");
}
