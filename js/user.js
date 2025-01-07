let userInfo= document.querySelector("#user_info")
let userD = document.querySelector("#user")
let links = document.querySelector("#links")
let userName = document.querySelector(".username")
let welcome = document.querySelector(".welcome")
let email = document.querySelector("#email")


if (localStorage.getItem("email")){
    links.remove()
    userInfo.style.display ="flex"
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains("remove_card")) {
        e.target.closest('.card').remove();
    }
});
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains("fav_remove")) {
        e.target.closest('.card').remove();
    }
});


let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})