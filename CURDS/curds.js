let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'create';
let x;

// get total
function getTotal() {
    if (price.value != '') {
        total.innerText = (+price.value + +taxes.value + +ads.value ) - +discount.value
        total.style.background = 'green '
    }else{
        total.innerText = ''
        total.style.background = 'crimson '
    }
}

let lestpro = [];
// // save localStorage
if (localStorage.product != null) {
    lestpro = JSON.parse(localStorage.product)
} else {
    lestpro = []
}

// create element
function create() {
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
}

if (
title.value != ''&&
price.value != ''&&
category.value != ''&&
newpro.count < 60
) {
    if (mood === 'create') {
    if (newpro.count > 1) {
    for (let i = 0; i < newpro.count; i++) {
       lestpro.push(newpro) ;
    }
} else {
    lestpro.push(newpro);
}


} else {
    lestpro[x] = newpro
    submit.innerHTML = 'Create'
    count.style.display = 'block'
    mood = 'create'
}
Cinput()
}






localStorage.setItem('product', JSON.stringify(lestpro)); 

Shdata()

}

Shdata()

// // read
function Shdata() {
getTotal()
    let taable = ''
    for (let i = 0; i < lestpro.length; i++) {
        taable += `
        <tr>
                <td>${i}</td>
                <td>${lestpro[i].title}</td>
                <td>${lestpro[i].price}</td>
                <td>${lestpro[i].taxes}</td>
                <td>${lestpro[i].ads}</td>
                <td>${lestpro[i].discount}</td>
                <td>${lestpro[i].total}</td>
                <td>${lestpro[i].category}</td>
                <td><button  onclick="upd(${i})">update</button></td>
                <td><button  onclick="del(${i})">delete</button></td>
            </tr>
        
        `
    }

   

    document.getElementById('tbody').innerHTML = taable;

    if (lestpro.length > 0) {
        document.getElementById('da').innerHTML  = `<button  onclick="delALL()">delete ALL (${lestpro.length})</button>`
    }else{
        document.getElementById('da').innerHTML  = ''
    }
}
    
// clear input
function Cinput() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    category.value = ''
    count.value = ''

}
    
// delete
function del(i) {
    lestpro.splice(i,1)
    localStorage.product = JSON.stringify(lestpro)
    Shdata()
}
//delete all    

function delALL() {
    localStorage.clear()
    lestpro.splice(0)
    Shdata()
} 
    
// update
function upd(i) {
    title.value = lestpro[i].title
    price.value = lestpro[i].price
    taxes.value = lestpro[i].taxes
    ads.value = lestpro[i].ads
    discount.value = lestpro[i].discount
    total.innerHTML = lestpro[i].total
    getTotal()
    category.value = lestpro[i].category
    submit.innerHTML = 'Update' ;
    count.style.display = 'none'
    mood = 'update'
    x = i
    scroll(
        {top:0,
        behavior :"smooth"
        }
    )  
    // lestpro[x] = newpro

}

let search = document.getElementById('search')
let searchmood = 'title';
// search
function titlle() {
    search.placeholder = 'Search By Title'
    search.focus()
    search.value = ''
    searchmood = 'title'
    Shdata()
}
function cat() {
    search.focus()
    search.placeholder = 'Search By Category'
    search.value = ''
    searchmood = 'category'
    Shdata()
}
function seearch(value) {
    let table = '';
    if (searchmood == 'title') {
        for (let i = 0; i < lestpro.length; i++) {
            if (lestpro[i].title.includes(value.toLowerCase())) {
                table += `
        <tr>
                <td>${i}</td>
                <td>${lestpro[i].title}</td>
                <td>${lestpro[i].price}</td>
                <td>${lestpro[i].taxes}</td>
                <td>${lestpro[i].ads}</td>
                <td>${lestpro[i].discount}</td>
                <td>${lestpro[i].total}</td>
                <td>${lestpro[i].category}</td>
                <td><button  onclick="upd(${i})">update</button></td>
                <td><button  onclick="del(${i})">delete</button></td>
            </tr>
        
        `
    }
}
}
else{
    for (let i = 0; i < lestpro.length; i++) {
            if (lestpro[i].category.includes(value.toLowerCase())) {
                table += `
        <tr>
                <td>${i}</td>
                <td>${lestpro[i].title}</td>
                <td>${lestpro[i].price}</td>
                <td>${lestpro[i].taxes}</td>
                <td>${lestpro[i].ads}</td>
                <td>${lestpro[i].discount}</td>
                <td>${lestpro[i].total}</td>
                <td>${lestpro[i].category}</td>
                <td><button  onclick="upd(${i})">update</button></td>
                <td><button  onclick="del(${i})">delete</button></td>
            </tr>
        
        `
    }
     

}
}
document.getElementById('tbody').innerHTML = table;
}
