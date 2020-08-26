let options = {
  blockHeight: 100,
  blockNum: 6,
  rowClassName: "row",
  whiteBlockClassName: "white-block",
  blackBlockClassName: "black-block",
  speed: 2,
};
let content = document.getElementsByClassName("content")[0];
let startBtn = document.getElementsByClassName("start")[0];
let pauseBtn = document.getElementsByClassName("pause")[0];
let pointBoard = document.getElementsByClassName("point")[0];
let infoBoard = document.getElementsByClassName("info")[0];
let time;
let point = 0;
let level = 0;

function generateRow(init) {
  let row = document.createElement("div");
  let radomNum = Math.floor(Math.random() * options.blockNum + 1);
  row.className = options.rowClassName;
  for (let i = 1; i <= options.blockNum; i++) {
    let block = document.createElement("div");
    if (i === radomNum && !init) {
      block.className = options.blackBlockClassName;
      block.addEventListener("click", clickBlack);
    } else {
      block.className = options.whiteBlockClassName;
    }
    row.appendChild(block);
  }
  return row;
}

function init() {
  let windowHeight = document.body.scrollHeight;
  let rowNum = Math.ceil(windowHeight / options.blockHeight) + 1;
  for (let i = 0; i < rowNum; i++) {
    content.appendChild(generateRow(true));
  }
  pointBoard.innerHTML = `得分：${point}`;
  setTranslateY(content, options.blockHeight * -1);
  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", stop);
}

function start() {
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  infoBoard.style.display = "none";
  point = 0;
  pointBoard.innerHTML = `得分：0`;
  time = setInterval(function () {
    move(content);
  }, 8);
}

function clickBlack() {
  this.className = options.whiteBlockClassName;
  point += 1;
  pointBoard.innerHTML = `得分：${point}`;
  this.removeEventListener("click", clickBlack);
}
// 失败
function fail() {
  infoBoard.style.display = "block";
  Array.from(content.children).forEach((item) => {
    Array.from(item.children).forEach((it) => {
      it.className = "white-block";
      it.removeEventListener("click", clickBlack);
    });
  });
  stop();
}

function stop() {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  clearInterval(time);
}

function move(element) {
  let translateY = getTranslateY(element);
  setTranslateY(element, translateY + options.speed);
  if (translateY >= 0) {
    prependChild(element, generateRow());
    setTranslateY(element, options.blockHeight * -1);
  }
  let lastRowBlocks = Array.from(
    content.children[content.children.length - 1].children
  );
  if (lastRowBlocks.find((item) => item.className === "black-block")) {
    fail();
  }
}

function prependChild(element, child) {
  element.insertBefore(child, element.children[0]);
  element.removeChild(element.children[element.children.length - 1]);
}
function getTranslateY(element) {
  let transform = getComputedStyle(element, null).transform;
  let arr = transform.split(",");
  let translateY = arr[arr.length - 1].substring(
    0,
    arr[arr.length - 1].length - 1
  );
  return translateY * 1;
}
function setTranslateY(element, offset) {
  element.style.transform = `translateY(${offset}px)`;
}

window.onload = function () {
  init();
};
