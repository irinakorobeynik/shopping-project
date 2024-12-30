const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

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
    checkUI();
    itemInput.value = '';
    
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();  
            checkUI();
        }
       
}    
}

function removeAllItem(e) {
    while (itemList.firstChild) { 
        itemList.removeChild(itemList.firstChild);
    }

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
            checkUI();
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



// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItem);
filter.addEventListener('input', filterItems)

checkUI();