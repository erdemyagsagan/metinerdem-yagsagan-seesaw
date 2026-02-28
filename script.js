const plank = document.getElementById("plank");
const leftWeight = document.getElementById("leftWeight");
const rightWeight = document.getElementById("rightWeight");
const totalAngle = document.getElementById("totalAngle")
const nextWeight = document.getElementById("nextWeight")



const objects = [];
let nmbrId = 1;
let comingWeight = randomWeight(); 
nextWeight.textContent = comingWeight; // ilk baslatma icin kg gosterimi



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
  const weight = comingWeight;

  const obj = {id: nmbrId++, weight, distance, x: click};

  objects.push(obj);
  renderObject(obj);
  updateWeights();
  tiltPlank(); 
  saveProgres();

  comingWeight = randomWeight();          
  nextWeight.textContent = comingWeight; // ilk baslatmadan sonraki degerler icin kg gosterimi

  console.log("objects:", objects);
}


// objeyi uretir
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


// eklenen objeye gore agirligi gunceller
function updateWeights(){
    let right = 0
    let left = 0

    for (const obj of objects) {
    if (obj.distance < 0) left += obj.weight;
    else if (obj.distance > 0) right += obj.weight;
  }

  leftWeight.textContent = left
  rightWeight.textContent = right
}


// tork hesaplama
function tiltPlank() {
  let leftT = 0, rightT = 0;

  for (const obj of objects) {
    const d = obj.distance;

    if (d < 0) leftT += obj.weight * Math.abs(d);
    else if (d > 0) rightT += obj.weight * d;
  }

  const angle = Math.max(-30, Math.min(30, (rightT - leftT) / 10));

  let rotateAngle = plank.style.transform = `rotate(${angle}deg)`;

  totalAngle.textContent = angle
  console.log(rotateAngle);
  
}

function saveProgres() {
  localStorage.setItem("seesawprogress", JSON.stringify(objects));
}

function loadProgress() {
  const saved = localStorage.getItem("seesawprogress");
  if (!saved) return;

  const parsed = JSON.parse(saved);

  for (const obj of parsed) {
    objects.push(obj);
    renderObject(obj);
  }

  updateWeights();
  tiltPlank();
}

function resetBoard() {
    localStorage.removeItem("seesawprogress")
    location.reload()    
}

loadProgress();