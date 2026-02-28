const plank = document.getElementById("plank");
const leftWeightEl = document.getElementById("leftWeight");
const rightWeightEl = document.getElementById("rightWeight");

const objects = [];
let nmbrId = 1;


plank.addEventListener("click", (e) => {
  addObject(e.offsetX);
});

// 1-10 arasinda sayi uretir
function randomWeight() {
  return Math.floor(Math.random() * 10) + 1; 
}

// objeyi ekler
function addObject(click) {
  const mid = plank.clientWidth / 2; 
  const distance = click - mid;        // left -, right +
  const weight = randomWeight();

  const obj = {id: nmbrId++, weight, distance, x: click};

  objects.push(obj);
  renderObject(obj);
  updateWeights();
  tiltPlank(); 

  console.log("objects:", objects);
}


// objeyi uretir
function renderObject(obj) {
const objstyle = document.createElement("div");
  objstyle.className = "object";
  objstyle.textContent = obj.weight;

  const size = 18 + obj.weight * 3;
  objstyle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    font-size: ${size / 3}px;
    left: ${obj.x - size / 2}px;
    background: hsl(${obj.weight * 25}, 70%, 45%);
  `;

  plank.appendChild(objstyle);
}


// eklenen objeye gore agirligi gunceller
function updateWeights(){
    let right = 0
    let left = 0

    for (const obj of objects) {
    if (obj.distance < 0) left += obj.weight;
    else if (obj.distance > 0) right += obj.weight;
  }

  leftWeightEl.textContent = left
  rightWeightEl.textContent = right
}

// seesaw iki tarafa da maks 30 derece egimlenebilme
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// tork hesaplama
function tiltPlank() {
  let leftT = 0, rightT = 0;

  for (const obj of objects) {
    const d = obj.distance;

    if (d < 0) leftT += obj.weight * Math.abs(d);
    else if (d > 0) rightT += obj.weight * d;
  }

  const rawAngle = (rightT - leftT) / 10;
  const angle = clamp(rawAngle, -30, 30);

  let rotateAngle = plank.style.transform = `rotate(${angle}deg)`;
  console.log(rotateAngle);
}