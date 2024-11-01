const showPopupBtn = document.querySelector(".Login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const LoginSignupLink =document.querySelectorAll(".form-box .bottom-link a");
showPopupBtn.addEventListener("click", () =>{
    document.body.classList.toggle("show-popup")
});


hidePopupBtn.addEventListener("click", () => showPopupBtn.click())

LoginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === "Signup-link" ? 'add' : 'remove']("show-Signup");
        
    });
});

    


    