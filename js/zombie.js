class Zombie {
  constructor(x, y, w, h, health, color) {
    this.health = health;
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.attacking = false;
    this.attackTime = 200;
    this.attackTimer = 200;
    this.counterTimer = 0;
    this.animationDelay = 3;
    this.offsetimage = 60;
  }
  draw() {
    let img =
      animation.zombie.images[
        Math.round(this.counterTimer / this.animationDelay) %
          animation.zombie.images.length
      ];
    drawNormalImg(
      img,
      this.x,
      this.y - this.offsetimage,
      img.width,
      img.height
    );
  }
  update() {
    if (!this.attacking) this.x -= 1 / 4;
    this.counterTimer++;
  }
  attackPlant(isAttack = true) {
    this.attacking = isAttack;
    if (this.attacking) {
      this.attackTimer--;
      if (this.attackTimer === 0) {
        this.attackTimer = this.attackTime;
        return true;
      }
      return false;
    }
    this.attackTimer = this.attackTime;
    return false;
  }
  getDamage(damage = 1) {
    this.health--;
    if (this.health === 0) return true;
    return false;
  }
}
function addNewZombie() {
  let randNum = Math.round(Math.random() * 5);
  let create_zombie = new Zombie(
    game.width,
    top_grid[randNum],
    grid_width,
    grid_height,
    5,
    "rgba(255, 0, 0, .3)"
  );
  zombies.push(create_zombie);
}
function checkHasZombieInLane(y, x = null) {
  let zombiesInLand = zombies.filter((zombie) => {
    if (x === null) {
      return zombie.y === y;
    }
    return zombie.y === y && zombie.x > x;
  });
  // console.log(zombiesInLand);
  if (zombiesInLand.length > 0) return true;
  return false;
}
