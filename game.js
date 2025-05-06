var gameSettings = {
  charSpeed: 96,
  fallSpeed: 0.75,
}

var config = {
  type: Phaser.AUTO,
  width: 160,
  height: 128,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  scale: {
    mode:Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,
    autoRound: false
  },
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}

var game = new Phaser.Game(config);
