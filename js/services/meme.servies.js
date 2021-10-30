"use strict";
const KEY = "memeDB";
var gImgs = [];

var gNextId = 1;

var gMeme;

createImgs();

function createMeme(id) {
  var meme = {
    selectedImgId: id,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "",
        size: 35,
        align: "center",
        color: "white",
        stroke: "black",
        family: "Arial",
        position: { x: getCanvasPos().x / 2, y: 50 },
      },
    ],
  };
  gMeme = meme;
  saveToStorage(KEY, gMeme);
}

function changeLines() {
  var currMeme = getMemeForDisplay();
  if (currMeme.selectedLineIdx + 1 < currMeme.lines.length) {
    currMeme.selectedLineIdx++;
  } else if (currMeme.lines.length === 1) {
    currMeme.selectedLineIdx = 0;
  } else {
    currMeme.selectedLineIdx = 0;
  }
  setMeme(currMeme);
}

function createLine() {
  var meme = getMemeForDisplay();
  if (meme.lines.length === 0) {
    var line = {
      txt: "",
      size: 35,
        align: "center",
        color: "white",
        stroke: "black",
        family: "Arial",
      position: { x: getCanvasPos().x / 2, y: 50 },
    };
  } else if (meme.lines.length === 1) {
    var line = {
      txt: "",
      size: 35,
      align: "center",
      color: "white",
      stroke: "black",
      family: "Arial",
      position: { x: getCanvasPos().x / 2, y: getCanvasPos().y - 50 },
    };
  } else {
    var line = {
      txt: "",
      size: 35,
      align: "center",
      color: "white",
      stroke: "black",
      family: "Arial",
      position: { x: getCanvasPos().x / 2, y: getCanvasPos().y / 2 },
    };
  }
  var currMeme = getMemeForDisplay();
  currMeme.lines.push(line);
  setMeme(currMeme);
}

function lineCounter() {
  var currMeme = getMemeForDisplay();
  var counter = 0;
  currMeme.lines.forEach(function () {
    counter++;
  });
  return counter;
}

function getImgsForDisplay() {
  return gImgs;
}

function createImgs() {
  
  createImg(gNextId++, ["funny", "bad"], 60, "imags/imgs/1.jpg");
  createImg(gNextId++, "cute", 60, "imags/imgs/2.jpg");
  createImg(gNextId++, "cute", 60, "imags/imgs/3.jpg");
  createImg(gNextId++, "cute", 60, "imags/imgs/4.jpg");
  createImg(gNextId++, "funny", 60, "imags/imgs/5.jpg");
  createImg(gNextId++, "funny", 60, "imags/imgs/6.jpg");
  createImg(gNextId++, "funny", 60, "imags/imgs/7.jpg");
  createImg(gNextId++, "happy", 60, "imags/imgs/8.jpg");
  createImg(gNextId++, "funny", 60, "imags/imgs/9.jpg");
  createImg(gNextId++, "funny", 60, "imags/imgs/10.jpg");
  createImg(gNextId++, "happy", 60, "imags/imgs/11.jpg");
  createImg(gNextId++, "happy", 60, "imags/imgs/12.jpg");
  createImg(gNextId++, "bad", 60, "imags/imgs/13.jpg");
  createImg(gNextId++, "bad", 60, "imags/imgs/14.jpg");
  createImg(gNextId++, "bad", 60, "imags/imgs/15.jpg");
  createImg(gNextId++, "funny", 60, "imags/imgs/16.jpg");
  createImg(gNextId++, "bad", 60, "imags/imgs/17.jpg");
  createImg(gNextId++, "bad", 60, "imags/imgs/18.jpg");
}

function createImg(id, title, size, url) {
  gImgs.push({
    id,
    title,
    size,
    url,
  });
}

function removeText() {
  var currMeme = getMemeForDisplay();
  if (currMeme.lines.length < 1) {
    currMeme.selectedLineIdx = 0;
    createLine();
    setMeme(currMeme);
    return;
  }
  currMeme.lines.splice(currMeme.selectedLineIdx, 1);
  currMeme.selectedLineIdx = 0;

  setMeme(currMeme);
}

function addLine() {
  createLine();
  var currMeme = getMemeForDisplay();
  if (currMeme.lines.length === 1) {
    currMeme.selectedLineIdx = 0;
  } else {
    currMeme.selectedLineIdx++;
  }
  setMeme(currMeme);
  renderCanvas();
}

function changeText(txt) {
  var currMeme = getMemeForDisplay();
  currMeme.lines[currMeme.selectedLineIdx].txt = txt;
  setMeme(currMeme);
}

function setFamily(family) {
  var currMeme = getMemeForDisplay();
  currMeme.lines[currMeme.selectedLineIdx].family = family;
  setMeme(currMeme);
}

function align(val) {
  var currMeme = getMemeForDisplay();
  currMeme.lines[currMeme.selectedLineIdx].align = val;
  setMeme(currMeme);
}

function changeStrokeColor(stroke) {
  var currMeme = getMemeForDisplay();
  currMeme.lines[currMeme.selectedLineIdx].stroke = stroke;
  setMeme(currMeme);
}
function changeColor(color) {
  var currMeme = getMemeForDisplay();
  currMeme.lines[currMeme.selectedLineIdx].color = color;
  setMeme(currMeme);
}

function incSize() {
  var currMeme = getMemeForDisplay();
  currMeme.lines[currMeme.selectedLineIdx].size += 1;
  setMeme(currMeme);
}
function desSize() {
  var currMeme = getMemeForDisplay();
  currMeme.lines[currMeme.selectedLineIdx].size -= 1;
  setMeme(currMeme);
}

function moveUp() {
  var currMeme = getMemeForDisplay();
  if (currMeme.lines[currMeme.selectedLineIdx].position.y < 30) {
    return;
  } else {
    currMeme.lines[currMeme.selectedLineIdx].position.y -= 10;
  }
  setMeme(currMeme);
}

function moveDown() {
  var currMeme = getMemeForDisplay();
  if (
    currMeme.lines[currMeme.selectedLineIdx].position.y >
    gElCanvas.height - 15
  )
    return;
  currMeme.lines[currMeme.selectedLineIdx].position.y += 10;
  setMeme(currMeme);
}

function moveRight(textWidth) {
  var currMeme = getMemeForDisplay();
  if (
    currMeme.lines[currMeme.selectedLineIdx].position.x >
    gElCanvas.width - textWidth - 15
  )
    return;
  currMeme.lines[currMeme.selectedLineIdx].position.x += 10;
  setMeme(currMeme);
}

function moveLeft() {
  var currMeme = getMemeForDisplay();

  if (currMeme.lines[currMeme.selectedLineIdx].position.x < 15) return;
  currMeme.lines[currMeme.selectedLineIdx].position.x -= 10;
  setMeme(currMeme);
}

function setMeme(meme) {
  saveToStorage(KEY, meme);
}

function getMemeForDisplay() {
  return loadFromStorage(KEY);
}

function shareToFB() {
  uploadImg();
}

function uploadImg() {
  var elCanvas = getCanvas();
  const imgDataUrl = elCanvas.toDataURL("image/jpeg");
  function onSuccess(uploadedImgUrl) {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
    );
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log("Got back live url:", url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}
