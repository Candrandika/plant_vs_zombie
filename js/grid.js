const grids = [];
const grid_width = 83;
const grid_height = 89;
const offset_width = 90;
const offset_height = 35;

const bottom_grid = [];
const top_grid = [];

function setLandArea() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 5; j++) {
      if (i === 0) {
        top_grid.push(
          game.height - grid_height * j - grid_height - offset_height
        );
        bottom_grid.push(game.height - grid_height * j - offset_height);
      }
      let grid = {
        x: grid_width * i + offset_width,
        y: game.height - grid_height * j - grid_height - offset_height,
        width: grid_width,
        height: grid_height,
        plant: false,
      };

      grids.push(grid);
    }
  }
}

function drawLand() {
  grids.map((item) => {
    // drawRect(
    //   item.x,
    //   item.y,
    //   item.width,
    //   item.height,
    //   "rgba(0, 255, 0, .4)",
    //   "darkgreen"
    // );
    if (
      window.mouseX >= item.x &&
      window.mouseX <= item.x + item.width &&
      window.mouseY >= item.y &&
      window.mouseY <= item.y + item.height
    ) {
      drawRect(item.x, item.y, item.width, item.height, "rgba(0,0,0,.2)");
    }
  });
}

function selectGrid(e) {
  window.mouseX = e.clientX - game.offsetLeft;
  window.mouseY = e.clientY - game.offsetTop;
}

function gridOnClick() {
  grids.map((item) => {
    if (
      window.mouseX >= item.x &&
      window.mouseX <= item.x + item.width &&
      window.mouseY >= item.y &&
      window.mouseY <= item.y + item.height &&
      handstate.isGrab &&
      handstate.type === "plant" &&
      !item.plant
    ) {
      item.plant = handstate.grab;
      handstateToDefault();
      let new_plant;
      if (item.plant === "peashooter") {
        new_plant = new PeaShooter(item.x, item.y);
      } else if (item.plant === "sunflower") {
        new_plant = new SunFlower(item.x, item.y);
      } else if (item.plant === "wallnut") {
        new_plant = new WallNut(item.x, item.y);
      }
      player.sun -= plant_list[item.plant].sun;
      plants.push(new_plant);
    }
  });
}
