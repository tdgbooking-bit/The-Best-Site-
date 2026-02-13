document.getElementById("signupForm").addEventListener("submit", async function(e){
e.preventDefault();

const phone = document.getElementById("phone").value;

await fetch("http://localhost:3000/send-text", {
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({ phone })
});

alert("Welcome to Subliminal 🔥");
});
