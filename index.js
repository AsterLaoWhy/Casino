window.onload = function () {
  document.getElementById("blackjack21").addEventListener("click", bj21);
  document.getElementById("slots").addEventListener("click", slots);
  //   document.getElementById("login").addEventListener("click", login);
};

function bj21() {
  location.href = "./Blackjack/index.html";
}
function slots() {
  location.href = "./slots/index.html";
}
function login() {
  return;
}
