const plankCvr = document.getElementById("plank")

plankCvr.addEventListener("click", (e) =>{
    const plankWeidth = plankCvr.clientWidth;
    const pivotX = plankWeidth / 2;
    const clickX = e.offsetX;
    const distance = clickX - pivotX; 

    console.log({
        clickX,
        pivotX,
        distance,
        side: distance < 0 ? "Left" : distance > 0 ? "Right" : "Center",
    })
});