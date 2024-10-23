const cookie = document.getElementById("cookie");
const counter = document.getElementById("clicker__counter");

let clickCount = 0;
let isCookieBig = false;

cookie.onclick = function () {
  clickCount++;
  counter.textContent = clickCount;

  if (isCookieBig) {
    cookie.width = 200;
    cookie.height = 200;
  } else {
    cookie.width = 250;
    cookie.height = 250;
  }

  isCookieBig = !isCookieBig;
};
