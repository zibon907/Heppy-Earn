const currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

if(!currentUser){
window.location.href =
"index.html";
}

document.getElementById("userName")
.innerText =
currentUser.name;

document.getElementById("userEmail")
.innerText =
currentUser.email;

document.getElementById("userPoints")
.innerText =
currentUser.points + " Points";

document.getElementById("userVip")
.innerText =
currentUser.vip;

function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"index.html";

}