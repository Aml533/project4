let userInfo= document.querySelector("#user_info")
let userD = document.querySelector("#user")
let links = document.querySelector("#links")
let userName = document.querySelector(".username")
let welcome = document.querySelector(".welcome")
let email = document.querySelector("#email")


if (localStorage.getItem("email")){
    links.remove()
    welcome.style.display="flex"
    userInfo.style.display ="flex"
    userName.innerHTML = localStorage.getItem("firstName")
}
let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})
// ***********************************************
let allProducts = document.querySelector(".products")
let products= [{
    id:1,
    title: "Ladies Bag",
    price : "80$",
    category: "Ladies Bag",
    imageUrl : "images/bage1.jpg"
},
{
    id:2,
    title: "Bretty Bag",
    price : "120$",
    category: "fashion Bag",
    imageUrl : "images/bage2.jpg"
},
{
    id:3,
    title: "BackPack",
    price : "200$",
    category: "Classic",
    imageUrl : "images/bage3.jpg"
},
{
    id:4,
    title: "Men Coat",
    price : "1500$",
    category: "Men's Clothing",
    imageUrl : "images/coat2.jpg"
},
{
    id:5,
    title: "SweatShirt",
    price : "180$",
    category: "Fashion Clothes",
    imageUrl : "images/shirt.jpg"
},
{
    id:6,
    title: "Coat",
    price : "2100$",
    category: "Women's Clothing",
    imageUrl : "images/coat.jpg"
},
{
    id:7,
    title: "Boots",
    price : "1150$",
    category: "Women's boots",
    imageUrl : "images/shose.jpg"
},
{
    id:8,
    title: "Kochi",
    price : "580$",
    category: "Men' shoes",
    imageUrl : "images/shose2.jpg"
},
{
    id:9,
    title: "shoes",
    price : "890$",
    category: "Women's shoes",
    imageUrl : "images/shose3.jpg"
},
]
function drawItems (){
    let y = products.map((item) => {
        return `
        <div class="card img-thumbnail product_item">
            <img class="product_item_img " src="${item.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body product_item_desc">
                <h5 class="card-title">Product : ${item.title}</h5>
                <h5 class="card-text" price="220">Price : ${item.price}</h5>
                <h5 class="card-text">Category : ${item.category}</h5>
                <div class="product_item_action">
                    <button type="button" class="btn btn-primary add_to_card" onClick="addToCart(${item.id})">Add to cart</button>
                    <i class="fa-sharp-duotone fa-solid fa-heart fav add_fav" onClick="Fav(${item.id})"></i>
                </div>
            </div>
        </div>
        `
    })
    allProducts.innerHTML = y;
}
drawItems ()
// ////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    let searchInput = document.querySelector("#searchInput");
    let searchButton = document.querySelector("#searchButton");
 
    searchButton.addEventListener('input' , () => {
        let searchText = searchButton.value.toLowerCase().trim();
        let searchType = searchInput.value; 
        let filteredProducts = products.filter(item => {
            if (searchType === "Search by Name") {
                return item.title.toLowerCase().includes(searchText);
            } else if (searchType === "Search by Category") {
                return item.category.toLowerCase().includes(searchText);
            }
        });
        drawFilteredItems(filteredProducts);
    });
});
function drawFilteredItems(filteredProducts) {
    allProducts.innerHTML = filteredProducts.map(item => `
        <div class="card img-thumbnail product_item">
            <img class="product_item_img " src="${item.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body product_item_desc">
                <h5 class="card-title">Product : ${item.title}</h5>
                <h5 class="card-text" price="220">Price : ${item.price}</h5>
                <h5 class="card-text">Category : ${item.category}</h5>
                <div class="product_item_action">
                    <button type="button" class="btn btn-primary add_to_card" onClick="addToCart(${item.id})">Add to cart</button>
                    <i class="fa-sharp-duotone fa-solid fa-heart fav add_fav" onClick="Fav(${item.id})"></i>
                </div>
            </div>
        </div>
    `).join('');
}

let add_to_card = document.querySelector(".add_to_card")
allProducts.addEventListener('click', function(e) {
    e.preventDefault();
        if (!localStorage.getItem("email")) {
            window.location = "login.html"; 
        }
        else{
            if (e.target && add_to_card) {
                if (e.target.innerHTML === "Add to cart") {
                    e.target.innerHTML = "Remove from Cart";
                    e.target.style.backgroundColor = "rgba(202, 10, 10, 0.95)";
                } else if(e.target.innerHTML === "Remove from Cart") {
                    e.target.innerHTML = "Add to cart";
                    e.target.style.backgroundColor = "rgb(0, 98, 255)";
                }
            }if (e.target && e.target.classList.contains("fa-heart")) {
                let color = window.getComputedStyle(e.target).color;
                if (color === "rgb(171, 171, 171)") {
                    e.target.style.color = "rgba(202, 10, 10, 0.95)";
                } else {
                    e.target.style.color = "rgb(171, 171, 171)";
                }
            }
        }
});

let cartProductDiv = document.querySelector(".carts_products div")
let badge = document.querySelector(".badge")

function check(){
    if(localStorage.getItem=("email")){
        window.location = "cartsproducts.html"
    }else{
        window.location ="login.html"
    }
}
cartProductDiv.addEventListener('click', function (e) {
    let numberElement = e.target.parentElement.previousElementSibling;
    let currentNumber = parseInt(numberElement.textContent);
    if (e.target.classList.contains('increase')) {
        numberElement.textContent=currentNumber+1;
    } else if (e.target.classList.contains('decrease') || add_to_card.target.innerHTML === "Remove from Cart") {
        if (currentNumber > 1) {
            numberElement.textContent = currentNumber - 1;
        } else {
            e.target.closest('div').remove();
            let cartProductLength = document.querySelectorAll(".carts_products div div div");
            badge.innerHTML = cartProductLength.length;
        }
    }
});

    let addedItem = [];
    let totalPrice = 0;
    function addToCart(id) {
        let choosenItem = products.find((item) => item.id === id);
        let itemPrice = parseFloat(choosenItem.price.replace('$', ''));
        totalPrice += itemPrice;

        addedItem = [...addedItem , choosenItem]
        localStorage.setItem("ProductsInCart" , JSON.stringify(addedItem))
        localStorage.setItem("TotalPrice", totalPrice);

        cartProductDiv.innerHTML += 
                `<div class="bg-white p-2 d-flex justify-content-evenly">
                    <span class="product-title w-100 flex-grow-1">${choosenItem.title}</span>
                    <span class="number px-1">1</span>
                        <div>
                        <i class="fa-solid fa-plus text-success px-1 increase"></i>
                        <i class="fa-solid fa-minus text-danger px-1 decrease"></i>
                        </div>
                </div>`
        let cartProductLength = document.querySelectorAll(".carts_products div div div");
        badge.innerHTML = cartProductLength.length;
    }
    
    function Fav(id) {
        let choosenItem = products.find((item) => item.id === id);
    
        let favProducts = localStorage.getItem("ProductsInFav") 
            ? JSON.parse(localStorage.getItem("ProductsInFav")) 
            : [];
    
        let isFav = favProducts.some((item) => item.id === id);
    
        if (!isFav) {
            favProducts.push(choosenItem);
            localStorage.setItem("ProductsInFav", JSON.stringify(favProducts));
        } else {
            favProducts = favProducts.filter((item) => item.id !== id);
            localStorage.setItem("ProductsInFav", JSON.stringify(favProducts));
        }
        let favIcon = document.querySelector(`.add_fav[onclick="Fav(${id})"]`);
        if (favIcon) {
            favIcon.style.color = isFav ?  "rgba(202, 10, 10, 0.95)" : "rgb(171, 171, 171)";
        }
    }
    
    
// //////////////////////////////////////////////////////////////////////

let shoppingCartIcon = document.querySelector(".fa-sort-down")
let cartsProducts = document.querySelector(".carts_products")
shoppingCartIcon.addEventListener("click", opencart)

function opencart(){
     if(cartProductDiv.innerHTML !=""){
         if(cartsProducts.style.display=="block"){
            cartsProducts.style.display="none"
            shoppingCartIcon.style.transform="rotate(360deg)"
         }else {
            cartsProducts.style.display="block";
            shoppingCartIcon.style.transform="rotate(180deg)"
         }
     } 
}
