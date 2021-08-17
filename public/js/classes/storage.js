export const StorageController = (() => {
    //public methods
    return {
        storeItem: (item) => {
            let items;
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
        getItemsFromStorage: () => {
            let items;
            //check if any items in LS
            if (localStorage.getItem('products') == null) {
                items = [];
            }
            else {
                items = JSON.parse(localStorage.getItem('products'));
            }
            return items;
        },
        updateItemStorage: (updatedItem) => {
            let items = JSON.parse(localStorage.getItem('products'));
            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            //Re set LS
            localStorage.setItem('products', JSON.stringify(items));
        },
        storeUserEmailToStorage: (email) => {
            let emails;
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
        getEmails: () => {
            let emails;
            if (localStorage.getItem('emails') === null) {
                emails = [];
            }
            else {
                emails = JSON.parse(localStorage.getItem('emails'));
            }
            emails.forEach((email) => {
                //get the ul
                let emailList = document.querySelector('.list-group.list-group-flush');
                //create Element 
                const li = document.createElement('li');
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
