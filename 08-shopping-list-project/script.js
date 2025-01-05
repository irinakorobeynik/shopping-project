const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}

function createIcon(classes) {
    const i = document.createElement('i');
    i.setAttribute('class', classes);
    return i;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.setAttribute('class', classes);
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}


function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please add an Item');
        return;
    }
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    checkUI();
    itemInput.value = '';
    
}

function onclickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) { }
    removeItem(e.target.parentElement.parentElement);

    
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        item.remove();
        removeItemFromStorage(item.textContent);
        checkUI();
    } 
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter(i => i != item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAllItem(e) {
    while (itemList.firstChild) { 
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.clear();

    checkUI();
}

function filterItems(e) {
    const item = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    item.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
            
        }    
    })
}

function checkUI() {
const item = itemList.querySelectorAll('li');
    if (item.length === 0) { 
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}

function addItemToDOM(item) {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    listItem.appendChild(button);
    itemList.appendChild(listItem);
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
        let itemsFromStorage;
    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
    
}

function init(params) {
    itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onclickItem);
clearBtn.addEventListener('click', removeAllItem);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems)
checkUI();
}

init();
