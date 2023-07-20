// import baseURL from "./baseURL.js";
const baseURL = `http://localhost:8080/doctor`;

let depObj = {
    1: "Online",
    2: "Offline"
}

// if(!localStorage.getItem("admin")){
//     swal("", "Please Login!", "warning").then(function() {
//         window.location.href="./admin.login.html";
//     });
// }

//Dark-Light Theme Toggler
let sidemenu = document.querySelector("aside");
let themetoggler = document.querySelector(".theme-toggler")

themetoggler.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme-variables");
    themetoggler.querySelector("span").classList.toggle("active");
});

//On click section activate
let dash_btn = document.getElementById("menu-dash");
let doc_btn = document.getElementById("menu-doc");
let patient_btn = document.getElementById("menu-patient");
let app_btn = document.getElementById("menu-app");

let dash_cont = document.getElementById("dash-cont");
let doc_cont = document.getElementById("doc-cont");
let patient_cont = document.getElementById("patient-cont");
let app_cont = document.getElementById("app-cont");

dash_btn.addEventListener("click", () => {
    dash_btn.classList.add("active");
    doc_btn.classList.remove("active");
    patient_btn.classList.remove("active");
    app_btn.classList.remove("active");
    dash_cont.classList.remove("div-hide");
    doc_cont.classList.add("div-hide");
    patient_cont.classList.add("div-hide");
    app_cont.classList.add("div-hide");
});

doc_btn.addEventListener("click", () => {
    doc_btn.classList.add("active");
    dash_btn.classList.remove("active");
    patient_btn.classList.remove("active");
    app_btn.classList.remove("active");
    doc_cont.classList.remove("div-hide");
    dash_cont.classList.add("div-hide");
    patient_cont.classList.add("div-hide");
    app_cont.classList.add("div-hide");
});

patient_btn.addEventListener("click", () => {
    patient_btn.classList.add("active");
    dash_btn.classList.remove("active");
    doc_btn.classList.remove("active");
    app_btn.classList.remove("active");
    patient_cont.classList.remove("div-hide");
    dash_cont.classList.add("div-hide");
    doc_cont.classList.add("div-hide");
    app_cont.classList.add("div-hide");
});

app_btn.addEventListener("click", () => {
    app_btn.classList.add("active");
    dash_btn.classList.remove("active");
    doc_btn.classList.remove("active");
    patient_btn.classList.remove("active");
    app_cont.classList.remove("div-hide");
    dash_cont.classList.add("div-hide");
    doc_cont.classList.add("div-hide");
    patient_cont.classList.add("div-hide");
});

// const hamburger = document.querySelector('.hamburger');
// const container = document.querySelector('.container');

// hamburger.addEventListener('click', function() {
//   container.classList.toggle('show-aside');
// });

//Dashboard Functions 
getStatus();
recentDocs();
recentPatients();
recentApps();

//Get all data
async function getStatus() {
    try {
        let res = await fetch(baseURL + "admin/all");
        // console.log(res)
        if (res.ok) {
            let data = await res.json();
            // console.log(data)
            document.getElementById("total-doc").innerText = data.totalDoctorslength;
            document.getElementById("total-pat").innerText = data.totalUserslength;
            document.getElementById("total-app").innerText = data.totalBookinglength;
        }
    } catch (err) {
        console.log(err);
    }
}

//Get Recent 
async function recentDocs() {
    try {
        let res = await fetch(baseURL + "doctorget");
        if (res.ok) {
            let data = await res.json();
            // console.log(data);
            let arr = data.allDoctors;
            console.log(arr)
            let arr1 = []
            for (let i = 0; i < 3; i++) {
                arr1.push(arr[i])
            }
            renderDocsData(data.allDoctors);
            renderRecentDocs(arr1)
        }
    } catch (err) {
        console.log(err);
    }
}

//Render Recent 

function renderRecentDocs(arr) {
    let docs_tbody = document.getElementById("doc-tbody")
    docs_tbody.innerHTML = ""
    arr.forEach((elem, ind) => {
        let tr = document.createElement("tr");

        let name = document.createElement("td");
        name.innerText = elem.name;

        let email = document.createElement("td");
        email.innerText = elem.email;

        let phone = document.createElement("td");
        phone.innerText = elem.phoneNo;

        let country = document.createElement("td");
        country.innerText = "India";

        let del = document.createElement("td");
        del.innerText = "Remove";
        del.style.color = "red";
        del.addEventListener("click", (e) => {
            swal("", "Confirm Delete?", "info").then(function () {
                deleteUser(elem._id);
            });
        })

        tr.append(name, email, phone, country, del);
        docs_tbody.append(tr);
    })
}

//Get Recent Users
async function recentPatients() {
    try {
        let res = await fetch(baseURL + "userget");
        if (res.ok) {
            let data = await res.json();
            // console.log(data);
            renderPatientsData(data.allDoctors);
            let arr = data.allDoctors;
            let arr1 = []
            for (let i = 0; i < 3; i++) {
                arr1.push(arr[i])
            }
            renderRecentPatients(arr1)
        }
    } catch (err) {
        console.log(err);
    }
}

//Render Recent Users
function renderRecentPatients(arr) {
    document.getElementById("pat-tbody").innerHTML = ""
    arr.forEach((elem, ind) => {
        let tr = document.createElement("tr");

        let name = document.createElement("td");
        name.innerText = elem.name;

        let email = document.createElement("td");
        email.innerText = elem.email;

        let phone = document.createElement("td");
        phone.innerText = elem.gender;

        let country = document.createElement("td");
        country.innerText = "India";

        let del = document.createElement("td");
        del.innerText = "Remove";
        del.style.color = "red";
        del.addEventListener("click", (e) => {
            swal("", "Confirm Delete?", "info").then(function () {
                deleteUser(elem._id);
            });
        })

        tr.append(name, email, phone, del);
        document.getElementById("pat-tbody").append(tr);
    })


}

//Get Recent 
async function recentApps() {
    try {
let res = await fetch("http://localhost:8080/appointment/allappoinment");
        if (res.ok) {
            let data = await res.json();
            // console.log(data.classes[0].title);
            renderAppsData(data.allappoinment);
            let arr = data.allappoinment
            console.log(arr);
            let arr1=[]
            for(let i=0;i<3;i++){
                arr1.push(arr[i])
            }
            renderRecentApps(arr1);
        }
    } catch (err) {
        console.log(err);
    }
}

//Render Recent 
function renderRecentApps(arr) {
    document.getElementById("app-tbody").innerHTML = ""
    arr.forEach((elem) => {
        let tr = document.createElement("tr");

        let title = document.createElement("td");
        title.innerText = elem.patient;

        let email = document.createElement("td");
        email.innerText = elem.email;

        let date = document.createElement("td");
        date.innerText = elem.date;

        let time = document.createElement("td");
        time.innerText = elem.time;


        let del = document.createElement("td");
        del.innerText = "Remove";
        del.style.color = "red";
        del.addEventListener("click", (e) => {
            swal("", "Confirm Delete?", "info").then(function () {
                deleteClass(elem._id);
            });
        })

        tr.append(title, email, date, time, del);
        document.getElementById("app-tbody").append(tr)
    })
}

//Get Trainer
async function gettrainers() {
    let id = document.getElementById("trainer").value;

    try {
        let res = await fetch(baseURL + `user/singletrainer/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        });
        console.log(res);
        if (res.ok) {
            let data = await res.json();
            console.log(data)

            let updateform = document.getElementById("updateform");

            updateform.name.value = data.trainer.name
            updateform.email.value = data.trainer.email
            updateform.phone.value = data.trainer.phone
            updateform.country.value = data.trainer.country

        }
    } catch (err) {
        swal("", "Error 404", "warning");
    }
}

//Update Trainer
async function updatetrainer(event) {
    event.preventDefault();
    let id = document.getElementById("trainer").value;
    let updateform = document.getElementById("updateform");
    let docObj = {
        name: updateform.name.value,
        email: updateform.email.value,
        phone: updateform.phone.value,
        country: updateform.country.value,
    }
    try {
        let res = await fetch(baseURL + `user/update/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(docObj)
        });
        // console.log(res);
        if (res.ok) {
            let data = await res.json();
            console.log(data)
            swal("", `${data.trainer.name} detail updated`, "success")
                .then(function () {
                    recentDocs();
                });
        } else {
            let data = await res.json();
            swal("", `${data.message}`, "warning");
        }
    } catch (err) {
        swal("", `Trainer Detail updated`, "success")
            .then(function () {
                recentDocs();
            });
    }
}



// Function
function renderDocsData(arr) {
    let docs_tbody = document.getElementById("doc-render");

    docs_tbody.innerHTML = "";
    arr.forEach((elem, ind) => {
        let tr = document.createElement("tr");

        let name = document.createElement("td");
        name.innerText = elem.name;

        let email = document.createElement("td");
        email.innerText = elem.email;

        let phone = document.createElement("td");
        phone.innerText = elem.phoneNo;

        let country = document.createElement("td");
        country.innerText = "India";

        let del = document.createElement("td");
        del.innerText = "Remove";
        del.style.color = "red";
        del.addEventListener("click", (e) => {
            swal("", "Confirm Delete?", "info").then(function () {
                deleteDoc(elem._id);
            });
        })

        tr.append(name, email, phone, country, del);
        docs_tbody.append(tr);
    })
}

//Add New 
let docForm = document.querySelector(".create-doc form");

docForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addDoc()
})

async function addDoc() {
    let docObj = {
        name: docForm.name.value,
        email: docForm.email.value,
        password: docForm.password.value,
        phoneNo: docForm.phone.value,
    }
    // console.log(docObj);

    try {
        let res = await fetch(baseURL + `doctorpost`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify(docObj)
        });
        // console.log(res);
        let data = await res.json();
        // console.log(data.message)
        swal("", `${data.newDoctor.name}`, "success").then(function () {
            getStatus()
            recentDocs();
        });
    } catch (error) {
        swal("", `${error.message}`, "error")
    }

}
//Search

let trainerInputTag = document.querySelector("#doc-sf-left>input");
trainerInputTag.addEventListener("input", async (e) => {
    let searchVal = trainerInputTag.value;
    try {
        let res = await fetch(baseURL + `alltrainer`);
        if (res.ok) {
            let data = await res.json();
            //console.log(data);
            let newData = data.trainers.filter(function (element) {
                return element.name.toLowerCase().includes(searchVal.toLowerCase());
            });
            renderDocsData(newData);
        }
    } catch (err) {
        console.log(err);
    }
})

//Delete 
async function deleteDoc(id) {
    try {
        let res = await fetch(baseURL+`delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
        if (res.ok) {
            let data = await res.json();
            recentDocs();
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(id) {
    try {
        let res = await fetch(`http://localhost:8080/user/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
        if (res.ok) {
            let data = await res.json();
            recentPatients();
            getStatus()
        }
    } catch (err) {
        console.log(err);
    }
}

//Delete appointment
async function deleteClass(id) {
    try {
        let res = await fetch(baseURL+`deleteappointment/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        });
        if (res.ok) {
            let data = await res.json();
            recentApps();
            getStatus()
        }
    } catch (err) {
        console.log(err);
    }
}

//Users Function
function renderPatientsData(arr) {
    let users_tbody = document.getElementById("user-render");

    users_tbody.innerHTML = "";
    arr.forEach((elem) => {
        let tr = document.createElement("tr");

        let name = document.createElement("td");
        name.innerText = elem.name;

        let email = document.createElement("td");
        email.innerText = elem.email;

        let gender=document.createElement("td");
        gender.innerText=elem.gender

        let block = document.createElement("td");
        block.innerText = "Remove";
        block.style.color = "red";
        block.addEventListener("click", (e) => {
            swal("", "Confirm Block?", "info").then(function () {
                deleteUser(elem._id);
                getStatus()
            });
        })


        tr.append(name, email,gender, block);
        users_tbody.append(tr);
    })
}

//User Search
let userInputTag = document.querySelector("#patient-sf-left>input");
userInputTag.addEventListener("input", async (e) => {
    let searchVal = userInputTag.value;
    try {
        let res = await fetch(baseURL + `user/all`);
        if (res.ok) {
            let data = await res.json();
            //console.log(data);
            let newData = data.users.filter(function (element) {
                return element.name.toLowerCase().includes(searchVal.toLowerCase());
            });
            renderPatientsData(newData);
        }
    } catch (err) {
        console.log(err);
    }
})

//User Filter
let genderFilterTag = document.querySelector("#patient-sf-right > select");

genderFilterTag.addEventListener("change", async (e) => {
    let filterValue = genderFilterTag.value;

    try {
        let res = await fetch(baseURL + `admin/all/`);
        if (res.ok) {
            let data = await res.json();

            if (Array.isArray(data.usersRegistered)) {
                let newData = data.usersRegistered.filter(function (element) {
                    if (filterValue === "1" && element.sex.toLowerCase() === "male") {
                        return true;
                    } else if (filterValue === "2" && element.sex.toLowerCase() === "female") {
                        return true;
                    } else if (filterValue === "" || filterValue === "0") {
                        return true;
                    }
                    return false;
                });

                renderPatientsData(newData);
            }
        }
    } catch (err) {
        console.log(err);
    }
});

//Class Search
function renderAppsData(arr) {
    // console.log(arr);
    let apps_tbody = document.getElementById("apps-render");

    apps_tbody.innerHTML = "";
    arr.forEach((elem) => {
        let tr = document.createElement("tr");

        let title = document.createElement("td");
        title.innerText = elem.patient;

        let email = document.createElement("td");
        email.innerText = elem.email;

        let date = document.createElement("td");
        date.innerText = elem.date;

        let time = document.createElement("td");
        time.innerText = elem.time;


        let del = document.createElement("td");
        del.innerText = "Remove";
        del.style.color = "red";
        del.addEventListener("click", (e) => {
            swal("", "Confirm Delete?", "info").then(function () {
                deleteClass(elem._id);
            });
        })

        tr.append(title, email, date, time, del);
        apps_tbody.append(tr);
    })
}

//Classes Search
let classInputTag = document.querySelector("#app-sf-left>input");
classInputTag.addEventListener("input", async (e) => {
    let searchVal = classInputTag.value;
    try {
        let res = await fetch(baseURL + `class/all`);
        if (res.ok) {
            let data = await res.json();
            //console.log(data);
            let newData = data.classes.filter(function (element) {
                return element.title.toLowerCase().includes(searchVal.toLowerCase());
            });
            renderAppsData(newData);
        }
    } catch (err) {
        console.log(err);
    }
})

//Classes Filter
let venueFilterTag = document.querySelector("#app-sf-right > select");

venueFilterTag.addEventListener("change", async (e) => {
    let filterValue = venueFilterTag.value;

    try {
        let res = await fetch(baseURL + `admin/all/`);
        if (res.ok) {
            let data = await res.json();

            if (Array.isArray(data.classesRegistered)) {
                let newData = data.classesRegistered.filter(function (element) {
                    if (filterValue === "1" && element.venue === "online") {
                        return true;
                    } else if (filterValue === "2" && element.venue === "offline") {
                        return true;
                    } else if (filterValue === "" || filterValue === "0") {
                        return true;
                    }
                    return false;
                });

                renderAppsData(newData);
            }
        }
    } catch (err) {
        console.log(err);
    }
});

//Logout
document.getElementById("menu-logout").addEventListener("click", (e) => {
    swal("", `Logged out successfully`, "success").then(function () {
        window.location.href = "./login.html";
    });
})
