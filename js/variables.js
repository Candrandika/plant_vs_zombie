const game = document.getElementById("game");
const ctx = game.getContext("2d");
const orig_bg = {
  width: 993,
  height: 740,
};
game.width = (993 * 600) / 740;
game.height = 600;

window.mouseX = 0;
window.mouseY = 0;

let render_counter = 0;

const player = {
  sun: 50,
  health: 1,
  clicked: false,
  clickedTimeout: false,
};

const plants = [];
const zombies = [];

const handstate = {
  isGrab: false,
  type: false,
  grab: false,
};

function handstateToDefault() {
  handstate.isGrab = false;
  handstate.type = false;
  handstate.grab = false;
}
