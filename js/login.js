document
.getElementById(
"loginForm"
)
.addEventListener(
"submit",
function(event){

event.preventDefault();

const email =
document
.getElementById(
"email"
)
.value
.trim();

const password =
document
.getElementById(
"password"
)
.value
.trim();

const result =
AuthService.login(
email,
password
);

if(result.success){

window.location.href =
"dashboard.html";

}else{

alert(
result.message
);

}

});