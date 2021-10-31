"use strict";
const KEY = "memeDB";
var gImgs = [];

var gNextId = 1;

var gMeme;

const FILTER_SIZE = 5;

var gFiltersIdx = 0;

var gFilterBy = "";

var gKeyWords = [
  "Politic",
  "Animal",
  "Sleepy",
  "Sleepy",
  "Cute",
  "Cool",
  "Cute",
  "Crazy",
  "Funny",
  "Happy",
  "Bad",
  "Crazy",
  "Cool",
  "Crazy",
  "Cool",
  "Cry",
  "Politic",
  "Cool",
];

var gFilters = {};

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
  } else currMeme.selectedLineIdx = 0;
  setMeme(currMeme);
}

//fix this code !
function createLine() {
  var meme = getMemeForDisplay();
  // if (meme.lines.length === 0) {
  var line = {
    txt: "",
    size: 35,
    align: "center",
    color: "white",
    stroke: "black",
    family: "Arial",
    position: {
      x: getCanvasPos().x / 2,
      y: !meme.lines.length
        ? 50
        : meme.lines.length === 1
        ? getCanvasPos().y - 50
        : getCanvasPos().y / 2,
    },
  };
  var currMeme = getMemeForDisplay();
  currMeme.lines.push(line);
  setMeme(currMeme);
}

//changes ⬇

function getFilters() {
  var filters = Object.keys(gFilters);
  var startIdx = gFiltersIdx * FILTER_SIZE;
  return filters.slice(startIdx, startIdx + FILTER_SIZE);
}

function nextPage() {
  console.log(gFiltersIdx);
  gFiltersIdx++;
  if (gFiltersIdx > 1) {
    gFiltersIdx = 0;
  }
}

function getFiltersSize(filter) {
  return gFilters[filter];
}

function setFilterBy(filterBy) {
  gFilterBy = filterBy;
}
function getImgsForDisplay() {
  if (gFilterBy) {
    var filterImgs = gImgs.filter((img) => {
      return img.keyWords === gFilterBy;
    });
    return filterImgs;
  }
  return gImgs;
}

function filterSize(filter) {
  if (gFilters[filter] === 28) return;
  gFilters[filter]++;
}

function createImgs() {
  gKeyWords.forEach((keyword) => {
    createImg(gNextId++, keyword);
  });
  gFilters = gKeyWords.reduce((acc, keyword) => {
    if (!acc[keyword]) acc[keyword] = 16;
    return acc;
  }, {});
}

function createImg(id, keyWords) {
  gImgs.push({
    id,
    keyWords,
    title: keyWords,
    url: `imags/imgs/${id}.jpg`,
  });
}

//changes ⬆

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

function changeSize(val) {
  var currMeme = getMemeForDisplay();
  if (val === "-") {
    currMeme.lines[currMeme.selectedLineIdx].size -= 1;
  } else {
    currMeme.lines[currMeme.selectedLineIdx].size += 1;
  }
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
