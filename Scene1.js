class Scene1 extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("background", "assets/sprites/background.png");
    this.load.image("title", "assets/sprites/title.png");
    this.load.image("ggs", "assets/sprites/ggs.png");
    this.load.image("dub", "assets/sprites/dub.png");

    this.load.image("ball", "assets/sprites/ball.png");
    this.load.image("arrow", "assets/sprites/arrow.png");
    this.load.image("barrel", "assets/sprites/barrel.png");

    this.load.image("charfront", "assets/sprites/charfront.png");
    this.load.image("charleft", "assets/sprites/charleft.png");
    this.load.image("charright", "assets/sprites/charright.png");

    this.load.spritesheet("impactsheet", "assets/sprites/impactsheet.png", {
      frameWidth: 16,
      frameHeight: 8,
    });

    this.load.bitmapFont("font", "assets/font/font.png", "assets/font/font.xml");
  }

  create() {
    this.scene.start("game");

    this.anims.create({
      key: "impact",
      frames: this.anims.generateFrameNumbers("impactsheet"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
  }

}
