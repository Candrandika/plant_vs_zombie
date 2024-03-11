const animation = {
  icepea: {
    images: [],
    first_image: 2,
    last_image: 31,
    name: "./Sprites/IcePea/frame_~~~_delay-0.12s.gif",
  },
  peashooter: {
    images: [],
    first_image: 0,
    last_image: 30,
    name: "./Sprites/PeaShooter/frame_~~~_delay-0.12s.gif",
  },
  sunflower: {
    images: [],
    first_image: 1,
    last_image: 24,
    name: "./Sprites/SunFlower/frame_~~~_delay-0.06s.gif",
  },
  wallnut: {
    images: [],
    first_image: 0,
    last_image: 32,
    name: "./Sprites/WallNut/frame_~~~_delay-0.12s.gif",
  },
  zombie: {
    images: [],
    first_image: 0,
    last_image: 33,
    name: "./Sprites/Zombie/frame_~~~_delay-0.05s.gif",
  },
};

const images = {
  background: {
    name: "./Sprites/General/Background.jpg",
    image: "",
  },
  close_icon: {
    name: "./Sprites/General/close-icon.png",
    image: "",
  },
  grass: {
    name: "./Sprites/General/Grass.bmp",
    image: "",
  },
  icepea: {
    name: "./Sprites/General/IcePea.png",
    image: "",
  },
  lawnmoweractive: {
    name: "./Sprites/General/lawnmowerActivated.gif",
    image: "",
  },
  lawnmoweridle: {
    name: "./Sprites/General/lawnmowerIdle.gif",
    image: "",
  },
  logo: {
    name: "./Sprites/General/logo.png",
    image: "",
  },
  pea: {
    name: "./Sprites/General/Pea.png",
    image: "",
  },
  shovel: {
    name: "./Sprites/General/Shovel.png",
    image: "",
  },
  sun: {
    name: "./Sprites/General/Sun.png",
    image: "",
  },
  icepeaseed: {
    name: "./Sprites/Seeds/IcePeaSeed.png",
    image: "",
  },
  peashooterseed: {
    name: "./Sprites/Seeds/PeaShooterSeed.png",
    image: "",
  },
  sunflowerseed: {
    name: "./Sprites/Seeds/SunFlowerSeed.png",
    image: "",
  },
  wallnutseed: {
    name: "./Sprites/Seeds/WallNutSeed.png",
    image: "",
  },
};

Object.entries(animation).forEach(([key, value]) => {
  for (let i = value.first_image; i <= value.last_image; i++) {
    let new_image = new Image();
    let img_loc = value.name.split("~~~").join(i.toString().padStart(2, "0"));
    new_image.src = img_loc;
    value.images.push(new_image);
  }
});

Object.entries(images).forEach(([key, value]) => {
  let new_image = new Image();
  new_image.src = value.name;
  value.image = new_image;
});
