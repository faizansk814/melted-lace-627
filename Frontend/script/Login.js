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
let carouselIndex = 1;
let loginCarousel;
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

function moveSlider(index) {
  // let index = this.dataset.value /;
  // let index = carouselIndex
  // console.info(index)

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList?.remove("active"));
  bullets[index - 1].classList?.add("active");
  carouselIndex += 1;
  // console.info(carouselIndex)
  if (carouselIndex > 3) carouselIndex = 1;
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", () => {
    moveSlider(bullet.dataset.value)
  });
});

loginCarousel = setInterval(() => {
  moveSlider(carouselIndex)
}, 4000);

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
let BASEURL = "https://petcare-lal5.onrender.com"
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

      fetch(`https://petcare-lal5.onrender.com/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          if (data.msg == "Registration successful") {
            Swal.fire(
              'Good job!',
              data.msg,
              'success'
            )
          } else {
            Swal.fire(
              'OOps!',
              data.msg,
              'error'
            )
          }
        })
        .catch((err) => {
          alert(err)
        })
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


    let response = await res.json();

    // Checking if the email is verified
    if (response.role == "admin") {
      storeUserInLocalStorage(response);
      // alert("Login Successfully");
      window.location.href = "../Admin/Admin.dashboard.html";
      console.log("hi")
    } else if (response.role == "user") {
      // Email is verified, proceed with login
      storeUserInLocalStorage(response);
      Swal.fire(
        'Good job!',
        response.msg,
        'success'
      )
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    } else {
      Swal.fire(
        'OOps!',
        response.msg,
        'error'
      )
    }
  } catch (error) {
    Swal.fire(
      'OOps!',
      error,
      'error'
    )
  }
});


function storeUserInLocalStorage(user) {
  localStorage.setItem("token", user.token);
  localStorage.setItem("userId", user.userId);
  localStorage.setItem("username", user.name);
}