class Plant {
  constructor(images, x, y, w, h, health) {
    this.health = health;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.images = images;
    this.counterTimer = 0;
    this.animationDelay = 4;
  }
  draw() {
    let img =
      this.images[
        Math.round(this.counterTimer / this.animationDelay) % this.images.length
      ];
    drawCustomizeImg(
      img,
      0,
      0,
      img.width,
      img.height,
      this.x,
      this.y,
      grid_width,
      grid_height
    );
  }
  update() {
    this.counterTimer++;
  }
}

class PeaShooter extends Plant {
  constructor(x, y) {
    super(animation.peashooter.images, x, y, grid_width, grid_height);
    this.skillDelay = 200;
    this.skillTimer = 200;
    this.bullets = [];
  }
  skill() {
    if (checkHasZombieInLane(this.y, this.x)) {
      this.skillTimer--;
      if (this.skillTimer == 0) {
        let new_bullet = {
          x: this.x + this.w,
          y: this.y,
          r: 20,
          offsetY: this.h / 5,
          damage: 1,
          speed: 2,
        };
        this.bullets.push(new_bullet);
        this.skillTimer = this.skillDelay;
      }
    } else {
      this.skillTimer = this.skillDelay;
    }
    this.updateBullet();
    this.drawBullet();
    this.collisionBullet();
  }
  updateBullet() {
    this.bullets.map((bullet) => {
      bullet.x += bullet.speed;
    });
  }
  drawBullet() {
    let img = images.pea.image;
    this.bullets.map((bullet) => {
      drawCustomizeRoundImg(
        img,
        0,
        0,
        img.width,
        img.height,
        bullet.x,
        bullet.y + bullet.offsetY,
        bullet.r,
        bullet.r,
        bullet.r
      );
    });
  }
  collisionBullet() {
    this.bullets.map((bullet, b_index) => {
      zombies.map((zombie, z_index) => {
        if (bullet.y === zombie.y) {
          if (
            bullet.x + bullet.r >= zombie.x &&
            bullet.x - bullet.r <= zombie.x + zombie.w
          ) {
            if (zombie.getDamage(bullet.damage)) {
              zombies.splice(z_index, 1);
            }
            this.bullets.splice(b_index, 1);
          }
        }
      });
    });
  }
}

class SunFlower extends Plant {
  constructor(x, y) {
    super(animation.sunflower.images, x, y, grid_width, grid_height, 3);
    this.sunadder = 25;
    this.sunColor = "orange";
    this.sunDelay = 500;
    this.sunDuration = 400;
    this.sunTimer = 500;
    this.suns = [];
  }
  skill() {
    this.sunTimer--;
    if (this.sunTimer === 0) {
      let new_sun = {
        x: this.x + this.w / 2,
        y: this.y + this.h / 2,
        fadeTime: this.sunDuration,
      };
      this.suns.push(new_sun);
      this.sunTimer = this.sunDelay;
    }
    this.updateSun();
    this.drawSun();
    this.collisionSun();
  }
  updateSun() {
    this.suns.map((sun, index) => {
      sun.fadeTime--;
      if (sun.fadeTime === 0) this.suns.splice(index, 1);
    });
  }
  drawSun() {
    this.suns.map((sun, index) => {
      let img = images.sun.image;
      drawCustomizeRoundImg(
        img,
        0,
        0,
        img.width,
        img.height,
        sun.x,
        sun.y,
        this.sunadder + 20,
        this.sunadder + 20,
        this.sunadder
      );
    });
  }
  collisionSun() {
    this.suns.map((sun, index) => {
      if (
        roundCollision(
          window.mouseX,
          window.mouseY,
          sun.x,
          sun.y,
          this.sunadder
        ) &&
        player.clicked
      ) {
        this.suns.splice(index, 1);
        player.sun += this.sunadder;
      }
    });
  }
}

class WallNut extends Plant {
  constructor(x, y) {
    super(animation.wallnut.images, x, y, grid_width, grid_height, 8);
  }
  skill() {
    // console.log("hehe");
  }
}

function addNewPlant() {
  let randNum = Math.round(Math.random() * 5);
  let create_zombie = new Zombie(
    ctx,
    game.width,
    top_grid[randNum],
    grid_width,
    grid_height,
    5,
    "red"
  );
  zombies.push(create_zombie);
}

const offset_x_plant_list = 140;
const offset_y_plant_list = 15;
const def_x_pos_plant_list = 48;

const plant_list = {
  peashooter: {
    sun: 100,
    onHover: false,
    color: "purple",
    x: offset_x_plant_list + def_x_pos_plant_list,
    y: offset_y_plant_list,
    height: 80,
    width: 40,
    image: images.peashooterseed.image,
  },
  sunflower: {
    sun: 50,
    onHover: false,
    color: "yellow",
    x: offset_x_plant_list + def_x_pos_plant_list * 2,
    y: offset_y_plant_list,
    height: 80,
    width: 40,
    image: images.sunflowerseed.image,
  },
  wallnut: {
    sun: 50,
    onHover: false,
    color: "brown",
    x: offset_x_plant_list + def_x_pos_plant_list * 3,
    y: offset_y_plant_list,
    height: 80,
    width: 40,
    image: images.wallnutseed.image,
  },
};

function drawPlantList() {
  Object.entries(plant_list).map(([key, p]) => {
    drawNormalImg(p.image, p.x, p.y, p.image.width, p.image.height);
  });
}

function plantListOnClick() {
  Object.entries(plant_list).map(([key, p]) => {
    if (
      window.mouseX >= p.x &&
      window.mouseX <= p.x + p.width &&
      window.mouseY >= p.y &&
      window.mouseY <= p.y + p.height &&
      player.sun >= p.sun
    ) {
      if (handstate.isGrab && handstate.type === "plant") {
        handstateToDefault();
      } else if (!handstate.isGrab) {
        handstate.isGrab = true;
        handstate.grab = key;
        handstate.type = "plant";
      }
    }
  });
}
