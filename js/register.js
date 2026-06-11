const registerForm =
document.getElementById(
"registerForm"
);

registerForm.addEventListener(
"submit",
function(event){

event.preventDefault();

/* =========================
   INPUT VALUES
========================= */

const username =
document
.getElementById("username")
.value
.trim();

const fullName =
document
.getElementById("fullName")
.value
.trim();

const email =
document
.getElementById("email")
.value
.trim()
.toLowerCase();

const password =
document
.getElementById("password")
.value;

const confirmPassword =
document
.getElementById(
"confirmPassword"
)
.value;

const referralCodeInput =
document
.getElementById(
"referralCode"
)
.value
.trim();

/* =========================
   VALIDATION
========================= */

if(
username.length < 3
){

alert(
"Username must be at least 3 characters."
);

return;

}

if(
password.length <
APP_CONFIG.MIN_PASSWORD_LENGTH
){

alert(
"Password is too short."
);

return;

}

if(
password !==
confirmPassword
){

alert(
"Passwords do not match."
);

return;

}

/* =========================
   USER MODEL
========================= */

const user = {

    id:
    Date.now(),

    username:
    username,

    fullName:
    fullName,

    email:
    email,

    password:
    password,

    points:
    APP_CONFIG.DEFAULT_POINTS,

    vipLevel:
    APP_CONFIG.DEFAULT_VIP,

    referralCode:
    generateReferralCode(),

    referredBy:
    referralCodeInput || null,

    totalReferrals:
    0,

    totalRewards:
    0,

    accountStatus:
    "active",

    profileImage:
    "",

    createdAt:
    new Date()
    .toISOString(),

    lastLogin:
    null,

    notifications:[

        {

            id:1,

            title:
            "Welcome",

            message:
            "Welcome to the platform.",

            read:false,

            createdAt:
            new Date()
            .toISOString()

        }

    ],

    activities:[

        {

            id:1,

            type:
            "register",

            description:
            "Account created",

            date:
            new Date()
            .toISOString()

        }

    ]

};

/* =========================
   REGISTER USER
========================= */

const result =
AuthService.register(
user
);

if(
result.success
){

alert(
"Account created successfully."
);

window.location.href =
"index.html";

}
else{

alert(
result.message
);

}

});

/* =========================
   HELPER FUNCTION
========================= */

function generateReferralCode(){

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let code = "VR-";

for(
let i = 0;
i < 6;
i++
){

code +=
chars.charAt(
Math.floor(
Math.random() *
chars.length
)
);

}

return code;

}