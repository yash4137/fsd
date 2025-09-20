const weather = {
    "Surat": "40",
    "Ahmedabad": "50",
    "Mumbai": "35",
    "Delhi": "42",
    "Bangalore": "30",
    "Chennai": "38",
    "Kolkata": "37",
    "Pune": "33",
    "Jaipur": "41",
    "Hyderabad": "36",
    "Lucknow": "39",
    "Bhopal": "40",
    "Indore": "34",
    "Patna": "38",
    "Nagpur": "43"
};
let btn = document.querySelector(".btn");
let res = document.querySelector(".result");
let city = document.querySelector(".city");
const select = document.getElementById("location");

select.addEventListener("change", () => {
    city.value = select.value; 
});

btn.addEventListener("click",()=>{
    let loc = city.value
res.textContent=`The weather in ${loc} is ${weather[loc]}°C`;
});
