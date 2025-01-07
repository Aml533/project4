let ProductsInCart = localStorage.getItem("ProductsInCart")
let ProductsInFav = localStorage.getItem("ProductsInFav")
let allProducts = document.querySelector(".products")
let totalPriceContainer = document.querySelector(".show_price h2");
let totalPrice = localStorage.getItem("TotalPrice");


if(ProductsInCart){
    let item = JSON.parse(ProductsInCart) ;
    drawCartProducts(item);
}
if (totalPrice) {
    totalPriceContainer.textContent = `Total Price: ${totalPrice} $`;
}
function drawCartProducts(products){
    let y = products.map((item) => {
        return ` 
        <div class="card col-sm-4 mb-3 p-3 ps-5" style="min-width: 480px; border-radius: 16px; background-color:rgba(178, 176, 176, 0.4);">
            <div class="row g-0">
            <div class="col-md-3">
                <img src="${item.imageUrl}" class="img-fluid rounded-start h-75" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Product : ${item.title}</h5>
                <h5 class="card-text" price= "220">Price : ${item.price}</h5>
                <h5 class="card-text">Category : ${item.category}</h5>
            </div>
            <div class="product_item_action ms-3" style="max-width: 150px; flex:1;text-align: right;display: flex; justify-content: space-between;flex-direction: row;">
            <div class="d-block">
                <span class="number">1</span>
                <i class="fa-solid fa-plus text-success increase"></i>
                <i class="fa-solid fa-minus text-danger decrease"></i>
            </div>
                <button type="button" class="btn btn-primary remove_card btn-danger d-block"  onClick="addToCart(${item.id})">Remove</button>
            </div>
            </div>
            </div>
        </div>
        `
    })
    allProducts.innerHTML = y;
}


if (ProductsInFav) {
    let favItems = JSON.parse(ProductsInFav);
    drawFavProducts(favItems);
}

function drawFavProducts(products) {
    let favContainer = document.querySelector(".fav_product");
    let favHTML = products.map((item) => {
        return `
        <div class="card aya img-thumbnail product_item" style="min-width:280px; background-color:rgba(178, 176, 176, 0.4); border-radius: 30px">
            <img class="product_item_img w-75 m-auto" style="max-height: 200px" src="${item.imageUrl}" alt="...">
            <div class="card-body product_item_desc">
                <h5 class="card-title">Product: ${item.title}</h5>
                <h5 class="card-text d-inline-block">Category: ${item.category}</h5>
                <div class="product_item_action">
                <i class="fa-sharp-duotone aml d-inline-block fa-solid fa-heart fav fav_remove" style="color: rgba(202, 10, 10, 0.95)" onClick="Fav(${item.id})"></i>
                </div>
            </div>
        </div>
        `;
    }).join("");

    favContainer.innerHTML = favHTML;
}



// عند الضغط على زر + أو -
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("increase")) {
        let productCard = e.target.closest(".card");
        let numberElement = productCard.querySelector(".number");
        let currentNumber = parseInt(numberElement.textContent);

        numberElement.textContent = currentNumber + 1;
    } else if (e.target && e.target.classList.contains("decrease")) {
        let productCard = e.target.closest(".card");
        let numberElement = productCard.querySelector(".number");
        let currentNumber = parseInt(numberElement.textContent);

        if (currentNumber > 1) {
            numberElement.textContent = currentNumber - 1;
        } else {
            productCard.remove();
        }
    }
});

