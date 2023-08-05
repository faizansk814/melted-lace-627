const sendLink = document.getElementById("sendLink")
const email = document.getElementById("email")

let BASEURL = "https://petcare-lal5.onrender.com";

sendLink.addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
        const userObj = {
            email:email.value,
        }
        const response = await fetch(`${BASEURL}/user/sendlink`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(userObj),
        });
        if(response.status ===400){
            alert("This mail doesn't exist")
        }
        const data = await response.json()
        if(response.status===200){
            alert("Verification mail sent to your mail")
        }
    } catch (error) {
        console.log(error)
    }
})