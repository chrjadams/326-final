const button = document.getElementById("button");
const email = document.getElementById("emailInput")

button.addEventListener("click", testFunc);


function testFunc() {
    console.log("clicked")
    console.log(email.value)
    localStorage.setItem("email", email.value)
    window.location.href = ("html.html")
}