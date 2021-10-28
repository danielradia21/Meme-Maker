"use strict";

var gElCanvas;
var gCtx;

function getCanvasPos() {
  return {
    x: gElCanvas.width,
    y: gElCanvas.height,
  };
}

function init() {
  gElCanvas = document.getElementById("my-canvas");

  gCtx = gElCanvas.getContext("2d");
  addMouseListeners();
  renderGallery();
}

function addMouseListeners() {
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth - 50;
  gElCanvas.height = elContainer.offsetHeight - 50;
  clearCanvas();
  renderCanvas();
}

function renderGallery() {
  var imgs = getImgsForDisplay();
  var strHtmls = imgs.map((img) => {
    return `<img src=${img.url} onclick="switchContent();onCreateMeme('${img.id}');" title="${img.title}" class="img"></img>`;
  });
  var elGallery = document.querySelector(".gallery");
  elGallery.innerHTML = strHtmls.join("");
}
function renderCanvas() {
  var meme = getMemeForDisplay();
  drawMeme(meme);
}
function onCreateMeme(id) {
  createMeme(id);
  renderCanvas();
}

function onDesSize() {
  desSize();
  renderCanvas();
}

function onIncSize() {
  incSize();
  renderCanvas();
}
function onRemoveText() {
  removeText();
  renderCanvas();
  document.querySelector(".meme-input").value = "";
}

function onChangeText(elInput) {
  var meme = getMemeForDisplay();
  if (meme.lines.length === 0) {
    createLine();
  }
  changeText(elInput);
  renderCanvas();
}

function onMoveUp() {
  moveUp();
  renderCanvas();
}

function onMoveDown() {
  moveDown();
  renderCanvas();
}

function onAddLine() {
  addLine();
  renderCanvas();
  document.querySelector(".meme-input").value = "";
}

function onMoveRight() {
  var meme = getMemeForDisplay();
  var txtSize = gCtx.measureText(meme.lines[meme.selectedLineIdx].txt).width;
  console.log(txtSize);
  moveRight(txtSize);
  renderCanvas();
}
function onMoveLeft() {
  moveLeft();
  renderCanvas();
}

function onStrokeColor(elColor) {
  changeStrokeColor(elColor);
  renderCanvas();
}
function onColor(elColor) {
  changeColor(elColor);
  renderCanvas();
}

function onSetFamily(opValue) {
  setFamily(opValue);
  renderCanvas();
}

function onAlignText(val) {
  align(val);
  renderCanvas();
}

// draw img - i need to get the curr img from the servies
function drawMeme(meme) {
  var img = new Image();
  img.src = `./imgs/imgs/${meme.selectedImgId}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    meme.lines.forEach((line) => {
      drawText(
        line.txt,
        line.position.x,
        line.position.y,
        line.size,
        line.align,
        line.stroke,
        line.color,
        line.family
      );
    });
  };
  setMeme(meme);
}

function onChangeLine() {
  changeLines();
  var meme = getMemeForDisplay();
  document.querySelector(".meme-input").value =
    meme.lines[meme.selectedLineIdx].txt;
  setMeme(meme);
}

// draw text
function drawText(text, x, y, size, align, stroke, color, family) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${stroke}`;
  gCtx.textAlign = `${align}`;
  gCtx.fillStyle = `${color}`;
  gCtx.font = `${size}px ${family} `;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function onShareToFB() {
  shareToFB();
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}


function switchContent() {
  document.querySelector(".main-gallery").hidden = true;
  document.querySelector(".main").hidden = false;
}
function switchBack() {
  document.querySelector(".main-gallery").hidden = false;
  document.querySelector(".main").hidden = true;
}

function getCanvas() {
  return gElCanvas;
}

function downloadImg(elLink) {
  console.log("inside");
  console.log(elLink);
  var elCanvas = getCanvas();
  var imgContent = elCanvas.toDataURL("image/jpeg");
  elLink.href = imgContent;
}

// // save and restore only the style settings! not the text - good for the bonus

// function saveAndRestoreExample() {
//   gCtx.lineWidth = 2;
//   gCtx.font = "30px Arial";
//   gCtx.strokeStyle = "green";
//   gCtx.strokeText("Saving the context", 10, 50);
//   gCtx.save();
//   gCtx.strokeStyle = "black";
//   gCtx.strokeText("Switching to something else", 10, 100);
//   gCtx.restore();
//   gCtx.strokeText("Back to previous context", 10, 150);
// }
