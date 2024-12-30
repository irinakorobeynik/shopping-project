const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');

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


function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please add an Item');
        return;
    }
    console.log('success');

    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red');
    listItem.appendChild(button);
    itemList.appendChild(listItem);
    
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove(); 
}    
}

function removeAllItem(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
}
}



// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItem);