const votes = {
    js: 0,
    py: 0,
    java: 0
};
let btn1 =document.querySelector(".js");
let btn2 =document.querySelector(".py");
let btn3 =document.querySelector(".java");
function vote(language) {
    votes[language]++;
    updateVotes();
}

function updateVotes() {
    document.getElementById('js-score').textContent = votes.js;
    document.getElementById('py-score').textContent = votes.py;
    document.getElementById('java-score').textContent = votes.java;
}

btn1.addEventListener("click", () => vote('js'));
btn2.addEventListener("click", () => vote('py'));
btn3.addEventListener("click", () => vote('java'));


setInterval(() => {
    const langs = ['js', 'py', 'java'];
    const random = langs[Math.floor(Math.random() * 3)];
    votes[random]++;
    updateVotes();
}, 2000);
