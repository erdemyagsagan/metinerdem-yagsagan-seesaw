const plank = document.getElementById("plank");
const leftWeight = document.getElementById("leftWeight");
const rightWeight = document.getElementById("rightWeight");
const totalAngle = document.getElementById("totalAngle");
const nextWeight = document.getElementById("nextWeight");

const dropSound = new Audio("sounds/drop-item-sound.wav");
const resetSound = new Audio("sounds/reset-button.wav");

const objects = [];
let nmbrId = 1;
let comingWeight = randomWeight();
nextWeight.textContent = comingWeight; // ilk baslatma icin kg gosterimi

plank.addEventListener("click", (e) => {
  addObject(e.offsetX);
});

// 1-10 arasinda sayi uret
function randomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

// Obje ekleme
function addObject(click) {
  const mid = plank.clientWidth / 2;
  const distance = click - mid; // left -, right +
  const weight = comingWeight;

  const obj = { id: nmbrId++, weight, distance, x: click };

  objects.push(obj);
  renderObject(obj);
  showDropInfo(obj);
  updateWeights();
  objectDrop();
  tiltPlank();
  saveProgres();

  comingWeight = randomWeight();
  nextWeight.textContent = comingWeight; // ilk baslatmadan sonraki degerler icin kg gosterimi

  console.log("objects:", objects);
}

// Obje uret
function renderObject(obj) {
  const objstyle = document.createElement("div");

  objstyle.className = "object";
  objstyle.textContent = obj.weight;

  const size = 22 + obj.weight * 3;
  objstyle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    font-size: ${size / 3}px;
    left: ${obj.x - size / 2}px;
    top: ${-size}px;
    background: hsl(${obj.weight * 25}, 70%, 45%);
  `;

  plank.appendChild(objstyle);
}

// Eklenen objeye gore agirligi guncelle
function updateWeights() {
  let right = 0;
  let left = 0;

  for (const obj of objects) {
    if (obj.distance < 0) left += obj.weight;
    else if (obj.distance > 0) right += obj.weight;
  }

  leftWeight.textContent = left;
  rightWeight.textContent = right;
}

// Tork hesaplama
function tiltPlank() {
  let leftT = 0,
    rightT = 0;

  for (const obj of objects) {
    const d = obj.distance;

    if (d < 0) leftT += obj.weight * Math.abs(d);
    else if (d > 0) rightT += obj.weight * d;
  }

  const angle = Math.max(-30, Math.min(30, (rightT - leftT) / 10));

  let rotateAngle = (plank.style.transform = `rotate(${angle}deg)`);

  if (angle < 0) {
    totalAngle.textContent = `${Math.abs(angle)}° to the left`;
  } else if (angle > 0) {
    totalAngle.textContent = `${angle}° to the right`;
  } else {
    totalAngle.textContent = "0°";
  }

  console.log(rotateAngle);
}

function saveProgres() {
  localStorage.setItem("seesawprogress", JSON.stringify(objects));
}

// LocalStorage'a kaydet
function loadProgress() {
  const saved = localStorage.getItem("seesawprogress");
  const parsed = JSON.parse(saved);

  for (const obj of parsed) {
    objects.push(obj);
    renderObject(obj);
  }

  updateWeights();
  tiltPlank();
}

// Reset butonu tiklama efekti
function resetBoard() {
  resetSound.play();
  setTimeout(() => {
    localStorage.removeItem("seesawprogress");
    location.reload();
  }, 150); // ses gelmedigi icin 150ms gecikme
}

// Dusme efekti
function objectDrop() {
  dropSound.play();
}

// Drop box info ekrani
function showDropInfo(obj) {
  const side = obj.distance < 0 ? "Left" : "Right";
  const dist = Math.abs(Math.round(obj.distance));

  const item = document.createElement("div");
  item.className = "drop-log-item";
  item.textContent = `${obj.weight}kg dropped on the ${side} side, ${dist}px away from center`;

  const log = document.getElementById("dropLog");
  log.prepend(item);
}

loadProgress();
