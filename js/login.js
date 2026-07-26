const loginButton = document.getElementById("loginBtn");

loginButton.addEventListener("click", () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "mira" && password === "purple123") {

        window.location.href = "dashboard.html";

    } else {

        alert("Incorrect username or password.");
        }

});