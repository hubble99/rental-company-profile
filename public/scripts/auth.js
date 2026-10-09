const form_login = document.getElementById("loginForm");
const message_login = document.getElementById("loginMessage");

const form_register = document.getElementById("registerForm");
const message_register = document.getElementById("registerMessage");

const link_masuk = document.getElementById("linkMasuk");
const link_register = document.getElementById("linkRegister");

const loginpage = document.getElementById('login-page');
const registerpage = document.getElementById('register-page');

link_register.addEventListener("click", (event) => {
  event.preventDefault();
  loginpage.style.display = 'none';
  registerpage.style.display = 'block';
});

link_masuk.addEventListener("click", (event) => {
  event.preventDefault();
  loginpage.style.display = 'block';
  registerpage.style.display = 'none';
});


form_login.addEventListener("submit", async (event) => {
  event.preventDefault();
  message_login.textContent = "";
  
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      message_login.textContent = data.message || "Login failed";
      return;
    }

    window.location.href = "/pages/home.html";
  } catch (error) {
    message_login.textContent = "Unable to connect to server.";
    console.log(error)
  }
});

form_register.addEventListener("submit", async (event) => {
  event.preventDefault();
  message_register.textContent = "";
  
  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("registerName").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      message_register.textContent = data.message || "Login failed";
      return;
    }

    loginpage.style.display = 'block';
    registerpage.style.display = 'none';
    
  } catch (error) {
    message_register.textContent = "Unable to connect to server.";
    console.log(error)
  }
});