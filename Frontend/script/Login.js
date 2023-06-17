const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
const formEl = document.getElementById("form2");
const formlogin = document.getElementById("loginForm")
const usernameText = document.getElementById("text1")
const emailText = document.getElementById("text2")
const passwordText = document.getElementById("text3")

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

// Validation
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", validateEmail);

const usernameInput = document.getElementById("name");
usernameInput.addEventListener("input", validateUsername);

const passwordInput = document.getElementById("password");
passwordInput.addEventListener("input", validatePassword);

function validateEmail() {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
  const email = emailInput.value;

  if (email.match(emailRegex)) {
    emailText.textContent = "Email is valid";
    emailText.style.color = "#00ff00";
    setTimeout(() => {
      emailText.textContent = "";
    }, 1000);
  } else {
    emailText.textContent = "Please enter a valid email";
    emailText.style.color = "#ff0000";
  }
}
function validateUsername() {
  const usernameRegex = /^(?!.*([A-Za-z0-9])\1)[A-Za-z0-9]{3,16}$/;
  const username = usernameInput.value;

  if (username.match(usernameRegex)) {
    usernameText.textContent = "Username is valid";
    usernameText.style.color = "#00ff00";
    setTimeout(() => {
      usernameText.textContent = "";
    }, 1000);
  } else {
    usernameText.textContent =
      "Username must be alphanumeric (3-16 characters)";
    usernameText.style.color = "#ff0000";
  }
}
function validatePassword() {
  const password = passwordInput.value;

  if (password.trim() !== "") {
    passwordText.textContent = "Password is valid";
    passwordText.style.color = "#00ff00";
    setTimeout(() => {
      passwordText.textContent = "";
    }, 1000);
  } else {
    passwordText.textContent = "Please enter a password";
    passwordText.style.color = "#ff0000";
  }
}

// 
const registerBtn = document.getElementById("registerBtn");
let BASEURL = "http://localhost:8080"
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    emailInput.value === "" ||
    usernameInput.value === "" ||
    passwordInput.value === ""
  ) {
    emailText.textContent = "Please enter email";
    usernameText.textContent = "Please enter username";
    passwordText.textContent = "Please enter password";

    emailText.style.color = "#ff0000";
    usernameText.style.color = "#ff0000";
    passwordText.style.color = "#ff0000";
  } else {
    try {
      // Submit the form or perform further actions
      const userObj = {
        name: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };

      const response = await fetch(`http://localhost:8080/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });


      if(response.status === 401){
        alert("Email already registered")
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
});

// login and email verification

formlogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;
    let obj = {
      email: email,
      password: password,
    };

    let res = await fetch(`${BASEURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (res.ok) {
      let response = await res.json();
      console.log(response.isVerified);

      // Check if the email is verified
      if (response.isVerified) {
        // Email is already verified, proceed with login
        storeUserInLocalStorage(response);
        alert("Login Successfully");
        // window.location.href = "../dashboard.html";
      } else {
        // Email is not verified, send verification request
        let verifyRes = await verifyEmail(response.userId);
          console.log(response.userId)
        if (verifyRes.ok) {
          // Verification request successful
          storeUserInLocalStorage(response);
          alert("Email verification required.");
        } else {
          // Verification request failed
          alert("Verification request failed");
        }
      }
    } else if (res.status === 401) {
      // Wrong credentials
      alert("Wrong Credentials");
    } else {
      alert("Login request failed");
    }
  } catch (error) {
    alert("Something went wrong");
  }
});

async function verifyEmail(userId) {
  try {
    let verifyRes = await fetch(`${BASEURL}/verify?id=${userId}`, {
      method: "GET",
    });
    return verifyRes;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function storeUserInLocalStorage(user) {
  localStorage.setItem("token", user.token);
  localStorage.setItem("userId", user.userId);
  localStorage.setItem("username", user.name);
}