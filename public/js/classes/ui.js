/* ======= UI controller ========== */
export const UIController = (() => {
    const UISelectors = {
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
        populateItemList: (items) => {
            let html = '';
            //loop through items array
            items.forEach((item) => {
                html += `
          <div class="product-container" id="item-${item.id}">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row product-info" >
                        <div class="col-md-12">
                            <h6>${item.name}</h6>
                            <span class="item-qty">
                              No of Items: <span class="text-success"> ${item.qty}</span>
                            </span>
                            <span>
                              Price : <span class="text-success">R ${item.price}</span>
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="row stock-list" id="btn-container">
                <div class="col-md-2 col-sm-4">
                    <button class="add-item"> add stock</i></button>
                </div>
                <div class="col-md-2 col-sm-4 buy-i">
                    <button class="remove-item" id=""> Buy items</i></button>
                </div>
            </div>
        </div>
        `;
            });
            //Insert items in the stock
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                price: document.querySelector(UISelectors.itemPriceInput).value,
                qty: document.querySelector(UISelectors.itemQtyInput).value,
            };
        },
        getNumOfItems: () => {
            return {
                qty: document.querySelector(UISelectors.editQtyInput).value
            };
        },
        getUserItems: () => {
            return {
                qty: document.querySelector(UISelectors.buyItemQtyInput).value,
            };
        },
        clearUserEmail: () => {
            document.querySelector(UISelectors.userEmailInput).value = '';
            document.querySelector(UISelectors.buyItemQtyInput).value = '';
        },
        /*======= alert messages ====*/
        buyItemsError: () => {
            let errorMsg = document.querySelector(UISelectors.errorMsg);
            errorMsg.innerHTML = `
      <div class="alert alert-danger">
        You cannot longer use this email to buy items
      </div>`;
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addStockWarning: () => {
            let errorMsg = document.querySelector(UISelectors.warningMsg);
            errorMsg.innerHTML = `
      <div class="alert alert-warning">
         Please fill all the fields<i class="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i>
      </div>`;
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addStockSuccess: () => {
            let errorMsg = document.querySelector(UISelectors.warningMsg);
            errorMsg.innerHTML = ` 
        <div class="alert alert-success">
          Product added successfully.! <i class="fa fa-check-circle-o pull-right" aria-hidden="true"></i>
        </div>`;
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        buyItemsSuccess: () => {
            let errorMsg = document.querySelector(UISelectors.errorMsg);
            errorMsg.innerHTML = `
      <div class="alert alert-success">
        Items purchased successfully. Thank you..!! <i class="fa fa-check-circle-o pull-right" aria-hidden="true"></i>
      </div>`;
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addItemsSuccess: () => {
            let errorMsg = document.querySelector(UISelectors.errorMsg);
            errorMsg.innerHTML = `
      <div class="alert alert-success">
        <span class="text-success"> Items added successfully <i class="fa fa-check-circle-o pull-right"
            aria-hidden="true"></i>
         </span>
      </div>`;
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        addItemsMessage: () => {
            let errorMsg = document.querySelector(UISelectors.addItemsMessage);
            errorMsg.innerHTML = `
      <div class="alert alert-warning">
         Please fill all the fields<i class="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i>
      </div>`;
            //hide alert after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
        },
        /*======= alert messages ====*/
        addListItem: (item) => {
            //show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //create list of products
            const productContainer = document.createElement('div');
            //add class to div
            productContainer.className = 'product-container';
            //add ID 
            productContainer.id = `item-${item.id}`;
            //add html
            productContainer.innerHTML = `<div class="row">
        <div class="col-lg-8">
            <div class="row product-info" >
                <div class="col-md-12">
                    <h6>${item.name}</h6>
                    <span class="item-qty">
                        <b>No of Items:</b>  <span class="text-success">${item.qty}</span>
                    </span>
                    <span>
                        <b>Price :</b>
                        <span class="text-success">R${item.price}</span>
                    </span>
                    <!-- <span class="pull-right">
                    Average Price : R<span class="text-success average-price"></span>
                    </span> -->
                </div>
            </div>
            
        </div>
    </div>
    <div class="row stock-list" id="btn-container">
        <div class="col-md-2 col-sm-4">
            <button class="add-item"><i class="fa fa-"> add items</i></button>
        </div>
        <div class="col-md-2 col-sm-4">
            <button class="remove-item" > Buy items</i></button>
        </div>
    </div>`;
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', productContainer);
        },
        updateListItem: (item) => {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            //turn node list in array
            listItems = Array.from(listItems);
            listItems.forEach((listItem) => {
                const itemID = listItem.getAttribute('id');
                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<div class="row">
          <div class="col-lg-8">
              <div class="row product-info" >
                  <div class="col-md-12">
                      <h6>${item.name}</h6>
                      <span class="item-qty">
                          <b>No of Items:</b>  <span class="text-success">${item.qty}</span>
                      </span>
                      <span>
                          <b>Price :</b>
                          <span class="text-success">R ${item.price}</span>
                      </span>
                  </div>
              </div>
            </div>
          </div>
          <div class="row stock-list" id="btn-container">
              <div class="col-md-2 col-sm-4">
                  <button class="add-item" style="font-size:12px"><i class="fa fa-"> add stock</i></button>
              </div>
              <div class="col-md-2 col-sm-4">
                  <button class="remove-item" > Buy items</i></button>
              </div>
          </div>`;
                }
            });
        },
        showUsedEmails: () => {
        },
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemPriceInput).value = '';
            document.querySelector(UISelectors.itemQtyInput).value = '';
        },
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        hideAddStockContent: () => {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.itemList).style.display = 'block';
        },
        hideBuyStockContent: () => {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.itemList).style.display = 'block';
        },
        addItemToForm: () => {
            document.querySelector(UISelectors.addItemsContainer).style.display = 'block';
            document.querySelector(UISelectors.itemList).style.display = 'none';
            document.querySelector('#show-item-name').textContent = ItemController.getCurrentItem().name;
            document.querySelector('#show-item-price').textContent = ItemController.getCurrentItem().price;
            document.querySelector('#show-item-qty').textContent = ItemController.getCurrentItem().qty;
        },
        buyItemToForm: () => {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'block';
            document.querySelector(UISelectors.itemList).style.display = 'none';
            document.querySelector('#show-product-name').textContent = ItemController.getCurrentItem().name;
            document.querySelector('#show-price').textContent = ItemController.getCurrentItem().price;
            document.querySelector('#show-qty').textContent = ItemController.getCurrentItem().qty;
        },
        clearEditState: () => {
            document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
            document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
        },
        getSelectors: () => {
            return UISelectors;
        }
    };
})();
