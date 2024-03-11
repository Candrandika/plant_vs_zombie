setLandArea();
main();

function main() {
  ctx.clearRect(0, 0, game.width, game.height);
  drawCustomizeImg(
    images.background.image,
    0,
    0,
    images.background.image.width,
    images.background.image.height,
    0,
    0,
    game.width,
    game.height
  );
  drawLand();
  render_counter++;
  if (render_counter % 1000 == 1) {
    addNewZombie();
  }
  updateDrawCollision();
  requestAnimationFrame(main);
}

function updateDrawCollision() {
  drawPlantList();
  plants.map((plant, p_index) => {
    plant.update();
    plant.draw();
  });
  zombies.map((zombie, z_index) => {
    zombie.update();
    zombie.draw();
    plants.map((plant, p_index) => {
      if (
        zombie.y === plant.y &&
        zombie.x >= plant.x &&
        zombie.x <= plant.x + plant.w
      ) {
        let attacking = zombie.attackPlant();
        if (attacking) plant.health--;
        if (plant.health == 0) {
          let must_delete_grid = grids.filter(
            (grid) => grid.x == plant.x && grid.y == plant.y
          );
          must_delete_grid.map((grid) => {
            grid.plant = false;
          });
          console.log(must_delete_grid);
          plants.splice(p_index, 1);
          zombie.attackPlant(false);
        }
      }
    });
  });
  plants.map((plant) => {
    plant.skill();
  });
  drawZMax();
  drawText(player.sun, 150, 90, "black", "black", "center", "20px sans-serif");
}

function drawZMax() {
  if (handstate.isGrab && handstate.type) {
    let plant = plant_list[handstate.grab];
    drawNormalImg(
      plant.image,
      window.mouseX - plant.width / 2,
      window.mouseY - plant.height / 2,
      plant.image.width,
      plant.image.height
    );
  }
  drawRound(window.mouseX, window.mouseY, 3, 0, Math.PI * 2, "red");
}

function drawText(
  text,
  x,
  y,
  color,
  stroke,
  textAlign = "start",
  font = "12px sans-serif",
  lineWidth = 2
) {
  ctx.beginPath();
  ctx.textAlign = textAlign;
  ctx.fillStyle = color;
  ctx.strokeStyle = stroke;
  ctx.font = font;
  ctx.lineWidth = lineWidth;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
  ctx.closePath();
}
function drawRect(
  x,
  y,
  w,
  h,
  bg = "transparent",
  stroke = "transparent",
  line = 0
) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = bg;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = line;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
function drawRound(
  x,
  y,
  r,
  sA = 0,
  eA = Math.PI * 2,
  bg = "transparent",
  stroke = "transparent",
  line = 0
) {
  ctx.beginPath();
  ctx.arc(x, y, r, sA, eA);
  ctx.fillStyle = bg;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = line;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
function drawNormalImg(image, x, y, w, h) {
  ctx.beginPath();
  ctx.drawImage(image, x, y, w, h);
  ctx.closePath();
}
function drawCustomizeImg(image, sx, sy, sw, sh, dx, dy, dw, dh) {
  ctx.beginPath();
  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.closePath();
}
function drawNormalRoundImg(image, x, y, w, h, r) {
  ctx.beginPath();
  // ctx.save();
  ctx.fillStyle = "white";
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  // ctx.clip();
  ctx.drawImage(image, x - w / 2, y - h / 2, w, h);
  // ctx.restore();
  ctx.closePath();
}
function drawCustomizeRoundImg(image, sx, sy, sw, sh, dx, dy, dw, dh, r) {
  ctx.beginPath();
  ctx.save();
  // ctx.fillStyle = "white";
  ctx.arc(dx, dy, r, 0, Math.PI * 2);
  // ctx.fill();
  ctx.clip();
  ctx.drawImage(image, sx, sy, sw, sh, dx - dw / 2, dy - dh / 2, dw, dh);
  ctx.restore();
  ctx.closePath();
}
function roundCollision(x1, y1, x2, y2, maxLength) {
  const x = Math.pow(x1 - x2, 2);
  const y = Math.pow(y1 - y2, 2);
  const length = Math.sqrt(x + y);
  if (length > maxLength) return false;
  return true;
}
function clickedPlayer() {
  player.clicked = true;
  clearTimeout(player.clearTimeout);
  player.clickedTimeout = setTimeout(() => {
    player.clicked = false;
    player.clickedTimeout = false;
  }, 100);
}
