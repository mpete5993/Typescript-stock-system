"use strict";
/* ======= Storage controller ========== */
var StorageController = (function () {
    //public methods
    return {
        storeItem: function (item) {
            var items;
            //check if any items in LocalStorage
            if (localStorage.getItem('products') == null) {
                items = [];
                //push new items
                items.push(item);
                //set LS
                localStorage.setItem('products', JSON.stringify(items));
            }
            else {
                //get what is already in LS
                items = JSON.parse(localStorage.getItem('products'));
                //push new item
                items.push(item);
                //Re set LS
                localStorage.setItem('products', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function () {
            var items;
            //check if any items in LS
            if (localStorage.getItem('products') == null) {
                items = [];
            }
            else {
                items = JSON.parse(localStorage.getItem('products'));
            }
            return items;
        },
        updateItemStorage: function (updatedItem) {
            var items = JSON.parse(localStorage.getItem('products'));
            items.forEach(function (item, index) {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            //Re set LS
            localStorage.setItem('products', JSON.stringify(items));
        },
        storeUserEmailToStorage: function (email) {
            var emails;
            //check if any items in LocalStorage
            if (localStorage.getItem('emails') === null) {
                emails = [];
                //push new item
                emails.push(email);
                //set items in localStorage
                localStorage.setItem('emails', JSON.stringify(emails));
            }
            else {
                emails = JSON.parse(localStorage.getItem('emails'));
                //push new item
                emails.push(email);
                //set items in localStorage
                localStorage.setItem('emails', JSON.stringify(emails));
            }
        },
        //fetch email list from localStorage 
        getEmails: function () {
            var emails;
            if (localStorage.getItem('emails') === null) {
                emails = [];
            }
            else {
                emails = JSON.parse(localStorage.getItem('emails'));
            }
            emails.forEach(function (email) {
                //get the ul
                var emailList = document.querySelector('.list-group.list-group-flush');
                //create Element 
                var li = document.createElement('li');
                //add class to li
                li.className = 'list-group-item';
                //create text node and append to the li
                li.appendChild(document.createTextNode(email));
                //aapend li to ul
                emailList.appendChild(li);
            });
        }
    };
})();
/* ======= Items controller ========== */
var ItemController = (function () {
    //Item contrustor
    var Item = function (id, name, price, qty) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qty = qty;
    };
    // Data Structure - State 
    var data = {
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
        getItems: function () {
            return data.items;
        },
        //add items
        addItem: function (name, price, qty) {
            var ID;
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
        updateItem: function (qty) {
            //qty  & Price to number
            qty = parseInt(qty);
            //find item
            var found = null;
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    numOfItems = parseInt(item.qty);
                    item.qty = numOfItems + qty;
                    found = item;
                }
            });
            return found;
        },
        buyItem: function (qty) {
            //qty to number
            qty = parseInt(qty);
            //find item
            var found = null;
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    var numOfItems = parseInt(item.qty);
                    item.qty = numOfItems - qty;
                    found = item;
                }
            });
            return found;
        },
        getItemById: function (id) {
            var found;
            //loop through the item
            data.items.forEach(function (item) {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        logData: function () {
            return data;
        }
    };
})();
/* ======= UI controller ========== */
var UIController = (function () {
    var UISelectors = {
        itemList: '.product-wrapper',
        listItems: '.product-wrapper .product-container',
        addBtn: '.add-btn',
        addItemsBtn: '.add-item',
        removeItemsBtn: '.remove-item',
        backToList: '.back-to-list',
        buyBtn: '.buy-btn',
        backBtn: '.back-btn',
        buyItemsContainer: '.buy-items-container',
        addItemsContainer: '.add-items-container',
        itemNameInput: '#product-name',
        itemPriceInput: '#price',
        itemQtyInput: '#qty',
        updateItemsBtn: '.add-more-btn',
        editQtyInput: '.edit-qty',
        userEmailInput: '#user-email',
        buyItemQtyInput: '#buy-item-qty',
        errorMsg: '#buy-item-msg',
        warningMsg: '#add-item-msg',
        addItemsMessage: '.add-items-message',
        showAveragePrice: '.average-price'
    };
    //public methods
    return {
        populateItemList: function (items) {
            var html = '';
            //loop through items array
            items.forEach(function (item) {
                html += "\n          <div class=\"product-container\" id=\"item-" + item.id + "\">\n            <div class=\"row\">\n                <div class=\"col-lg-8\">\n                    <div class=\"row product-info\" >\n                        <div class=\"col-md-12\">\n                            <h6>" + item.name + "</h6>\n                            <span class=\"item-qty\">\n                              No of Items: <span class=\"text-success\"> " + item.qty + "</span>\n                            </span>\n                            <span>\n                              Price : <span class=\"text-success\">R " + item.price + "</span>\n                            </span>\n                        </div>\n                    </div>\n                    \n                </div>\n            </div>\n            <div class=\"row stock-list\" id=\"btn-container\">\n                <div class=\"col-md-2 col-sm-4\">\n                    <button class=\"add-item\"> add stock</i></button>\n                </div>\n                <div class=\"col-md-2 col-sm-4 buy-i\">\n                    <button class=\"remove-item\" id=\"\"> Buy items</i></button>\n                </div>\n            </div>\n        </div>\n        ";
            });
            //Insert items in the stock
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                price: document.querySelector(UISelectors.itemPriceInput).value,
                qty: document.querySelector(UISelectors.itemQtyInput).value,
            };
        },
        getNumOfItems: function () {
            return {
                qty: document.querySelector(UISelectors.editQtyInput).value
            };
        },
        getUserItems: function () {
            return {
                qty: document.querySelector(UISelectors.buyItemQtyInput).value,
            };
        },
        clearUserEmail: function () {
            document.querySelector(UISelectors.userEmailInput).value = '';
            document.querySelector(UISelectors.buyItemQtyInput).value = '';
        },
        /*======= alert messages ====*/
        buyItemsError: function () {
            var errorMsg = document.querySelector(UISelectors.errorMsg);
            errorMsg.innerHTML = "\n      <div class=\"alert alert-danger\">\n        You cannot longer use this email to buy items\n      </div>";
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addStockWarning: function () {
            var errorMsg = document.querySelector(UISelectors.warningMsg);
            errorMsg.innerHTML = "\n      <div class=\"alert alert-warning\">\n         Please fill all the fields<i class=\"fa fa-exclamation-triangle pull-right\" aria-hidden=\"true\"></i>\n      </div>";
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addStockSuccess: function () {
            var errorMsg = document.querySelector(UISelectors.warningMsg);
            errorMsg.innerHTML = " \n        <div class=\"alert alert-success\">\n          Product added successfully.! <i class=\"fa fa-check-circle-o pull-right\" aria-hidden=\"true\"></i>\n        </div>";
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        buyItemsSuccess: function () {
            var errorMsg = document.querySelector(UISelectors.errorMsg);
            errorMsg.innerHTML = "\n      <div class=\"alert alert-success\">\n        Items purchased successfully. Thank you..!! <i class=\"fa fa-check-circle-o pull-right\" aria-hidden=\"true\"></i>\n      </div>";
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addItemsSuccess: function () {
            var errorMsg = document.querySelector(UISelectors.errorMsg);
            errorMsg.innerHTML = "\n      <div class=\"alert alert-success\">\n        <span class=\"text-success\"> Items added successfully <i class=\"fa fa-check-circle-o pull-right\"\n            aria-hidden=\"true\"></i>\n         </span>\n      </div>";
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addItemsMessage: function () {
            var errorMsg = document.querySelector(UISelectors.addItemsMessage);
            errorMsg.innerHTML = "\n      <div class=\"alert alert-warning\">\n         Please fill all the fields<i class=\"fa fa-exclamation-triangle pull-right\" aria-hidden=\"true\"></i>\n      </div>";
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        /*======= alert messages ====*/
        addListItem: function (item) {
            //show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //create list of products
            var productContainer = document.createElement('div');
            //add class to div
            productContainer.className = 'product-container';
            //add ID 
            productContainer.id = "item-" + item.id;
            //add html
            productContainer.innerHTML = "<div class=\"row\">\n        <div class=\"col-lg-8\">\n            <div class=\"row product-info\" >\n                <div class=\"col-md-12\">\n                    <h6>" + item.name + "</h6>\n                    <span class=\"item-qty\">\n                        <b>No of Items:</b>  <span class=\"text-success\">" + item.qty + "</span>\n                    </span>\n                    <span>\n                        <b>Price :</b>\n                        <span class=\"text-success\">R" + item.price + "</span>\n                    </span>\n                    <!-- <span class=\"pull-right\">\n                    Average Price : R<span class=\"text-success average-price\"></span>\n                    </span> -->\n                </div>\n            </div>\n            \n        </div>\n    </div>\n    <div class=\"row stock-list\" id=\"btn-container\">\n        <div class=\"col-md-2 col-sm-4\">\n            <button class=\"add-item\"><i class=\"fa fa-\"> add items</i></button>\n        </div>\n        <div class=\"col-md-2 col-sm-4\">\n            <button class=\"remove-item\" > Buy items</i></button>\n        </div>\n    </div>";
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', productContainer);
        },
        updateListItem: function (item) {
            var listItems = document.querySelectorAll(UISelectors.listItems);
            //turn node list in array
            listItems = Array.from(listItems);
            listItems.forEach(function (listItem) {
                var itemID = listItem.getAttribute('id');
                if (itemID === "item-" + item.id) {
                    document.querySelector("#" + itemID).innerHTML = "<div class=\"row\">\n          <div class=\"col-lg-8\">\n              <div class=\"row product-info\" >\n                  <div class=\"col-md-12\">\n                      <h6>" + item.name + "</h6>\n                      <span class=\"item-qty\">\n                          <b>No of Items:</b>  <span class=\"text-success\">" + item.qty + "</span>\n                      </span>\n                      <span>\n                          <b>Price :</b>\n                          <span class=\"text-success\">R " + item.price + "</span>\n                      </span>\n                  </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"row stock-list\" id=\"btn-container\">\n              <div class=\"col-md-2 col-sm-4\">\n                  <button class=\"add-item\" style=\"font-size:12px\"><i class=\"fa fa-\"> add stock</i></button>\n              </div>\n              <div class=\"col-md-2 col-sm-4\">\n                  <button class=\"remove-item\" > Buy items</i></button>\n              </div>\n          </div>";
                }
            });
        },
        showUsedEmails: function () {
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemPriceInput).value = '';
            document.querySelector(UISelectors.itemQtyInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        hideAddStockContent: function () {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.itemList).style.display = 'block';
        },
        hideBuyStockContent: function () {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.itemList).style.display = 'block';
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.addItemsContainer).style.display = 'block';
            document.querySelector(UISelectors.itemList).style.display = 'none';
            document.querySelector('#show-item-name').textContent = ItemController.getCurrentItem().name;
            document.querySelector('#show-item-price').textContent = ItemController.getCurrentItem().price;
            document.querySelector('#show-item-qty').textContent = ItemController.getCurrentItem().qty;
        },
        buyItemToForm: function () {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'block';
            document.querySelector(UISelectors.itemList).style.display = 'none';
            document.querySelector('#show-product-name').textContent = ItemController.getCurrentItem().name;
            document.querySelector('#show-price').textContent = ItemController.getCurrentItem().price;
            document.querySelector('#show-qty').textContent = ItemController.getCurrentItem().qty;
        },
        clearEditState: function () {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
        },
        getSelectors: function () {
            return UISelectors;
        }
    };
})();
/* ======= App controller ========== */
var AppController = (function (ItemController, StorageController, UIController) {
    //Load event Listeners
    var loadEventListeners = function () {
        //get Ui selectors
        var UISelectors = UIController.getSelectors();
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
    var itemAddSubmit = function (e) {
        //get form input from UI controller
        var input = UIController.getItemInput();
        //check for input 
        if (input.name !== '' && input.price !== '' && input.qty !== '') {
            //add items
            var newItem = ItemController.addItem(input.name, input.price, input.qty);
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
    var addMoreItemsSubmit = function (e) {
        //get input from ui
        var input = UIController.getNumOfItems();
        if (input.qty != '') {
            //update item
            var updatedItem = ItemController.updateItem(input.qty);
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
    };
    //buy items
    var buyItemsSubmit = function (e) {
        //get input from ui
        var input = UIController.getUserItems();
        //get user email
        var userEmail = document.querySelector('#user-email');
        var qtyInput = document.querySelector('#buy-item-qty');
        var emails = JSON.parse(localStorage.getItem('emails'));
        if (userEmail.value != '' && qtyInput.value != '') {
            var email = StorageController.storeUserEmailToStorage(userEmail.value, input.qty);
            //update item
            var updatedItem = ItemController.buyItem(input.qty);
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
    var setToaddItems = function (e) {
        if (e.target.classList.contains('add-item')) {
            //get List Items ID
            var listId = e.target.parentNode.parentNode.parentNode.id;
            //break into array
            var listIdArr = listId.split('-');
            //get actual id
            var id = parseInt(listIdArr[1]);
            //get item
            var itemTOEdit = ItemController.getItemById(id);
            //set current Item
            ItemController.setCurrentItem(itemTOEdit);
            //add item to form
            UIController.addItemToForm();
        }
        e.preventDefault();
    };
    //buy items click event
    var setToBuyItems = function (e) {
        if (e.target.classList.contains('remove-item')) {
            //get List Items ID
            var listId = e.target.parentNode.parentNode.parentNode.id;
            //break into array
            var listIdArr = listId.split('-');
            //get actual id
            var id = parseInt(listIdArr[1]);
            //get item
            var itemTOEdit = ItemController.getItemById(id);
            //set current Item
            ItemController.setCurrentItem(itemTOEdit);
            //add item to form
            UIController.buyItemToForm();
        }
        e.preventDefault();
    };
    //hide add content
    var hideAddStock = function (e) {
        UIController.hideAddStockContent();
        e.preventDefault();
    };
    //hide add content
    var hideBuyStock = function (e) {
        UIController.hideBuyStockContent();
        e.preventDefault();
    };
    //return initializer for the app
    //public methods
    return {
        init: function () {
            //edit state
            UIController.clearEditState();
            //fetch items from data structure
            var items = ItemController.getItems();
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
            UIController.updateListItem();
        }
    };
})(ItemController, StorageController, UIController);
//initialize App
AppController.init();
