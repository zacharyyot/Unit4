class Scene2 extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.arrow = this.physics.add.image(config.width / 2, 32, "arrow");
    this.ball = this.physics.add.image(config.width / 2 - 32, 32, "ball");
    this.barrel = this.physics.add.image(config.width / 2 + 32, 32, "barrel");

    this.char = this.physics.add.image(config.width / 2, config.height - 48, "charfront");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.char.setCollideWorldBounds(true);
    this.char.body.setSize(8, 8)
    this.char.body.setBoundsRectangle(new Phaser.Geom.Rectangle(35, 72, 90, 32));

    this.physics.add.overlap(this.char, this.arrow, this.hurtarrow, null, this);
    this.physics.add.overlap(this.char, this.ball, this.hurtball, null, this);
    this.physics.add.overlap(this.char, this.barrel, this.hurtbarrel, null, this);

    var graphics = this.add.graphics();
      graphics.fillStyle(0xffffff, 1);
      graphics.fillRect(0, 0, config.width, 12);

    this.elapsedTime = 0;
    this.timer = this.add.bitmapText(5, 1, "font", "Years: 0", 10);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.elapsedTime++;
        this.timer.setText(`Years ${this.elapsedTime / 5}`)
      },
      loop: true
    });
    this.timer.setTint(0x000000);

    this.hp = 3;
    this.lives = this.add.bitmapText(112, 1, "font", "Lives: 3", 10);
    this.lives.setTint(0x000000);
  }

  hurtarrow(char, arrow) {
    this.resetarrow(arrow);
    if(this.char.alpha < 1) {
        return;
    }
    this.char.alpha = 0.5;
    this.time.addEvent({
      delay: 1000,
      callback: this.resetchar,
      callbackScope: this,
      loop: false,
    });
  }

  hurtball(char, ball) {
    this.resetball(ball);
    if(this.char.alpha < 1) {
        return;
    }
    this.char.alpha = 0.5;
    this.time.addEvent({
      delay: 1000,
      callback: this.resetchar,
      callbackScope: this,
      loop: false,
    });
  }

  hurtbarrel(char, barrel) {
    this.resetbarrel(barrel);
    if(this.char.alpha < 1) {
        return;
    }
    this.char.alpha = 0.5;
    this.time.addEvent({
      delay: 1000,
      callback: this.resetchar,
      callbackScope: this,
      loop: false,
    });
  }

  resetchar(){
    var tween = this.tweens.add({
      targets: this.char,
      ease: "Power1",
      duration: 1000,
      repeat:0,
      onComplete: function(){
        this.char.alpha = 1;
      },
      callbackScope: this
    });
    this.hp -= 1;
    if(this.hp < 0) {
      this.hp = 0;
    } if (this.hp === 0) {
      this.gameOver();
    }
  }

  title() {
  this.scene.pause();
  this.add.image(config.width / 2, config.height/2 - 40, "dub").setOrigin(0.5);
  this.add.bitmapText(config.width / 2, config.height/2 - 24, "font", "Click to Restart", 10).setOrigin(0.5);
  this.add.bitmapText(config.width / 2, config.height/2 - 8, "font", "Arrows Keys To Move", 10).setOrigin(0.5);
  }

  gameOver() {
  this.scene.pause();
  this.add.image(config.width / 2, config.height/2 - 40, "ggs").setOrigin(0.5);
  this.add.bitmapText(config.width / 2, config.height/2 - 24, "font", "Refresh to Restart", 10).setOrigin(0.5);
  }

  victory() {
  this.scene.pause();
  this.add.image(config.width / 2, config.height/2 - 40, "dub").setOrigin(0.5);
  this.add.bitmapText(config.width / 2, config.height/2 - 24, "font", "Refresh to Restart", 10).setOrigin(0.5);
  }

  update() {
    this.movearrow(this.arrow);
    this.moveball(this.ball);
    this.movebarrel(this.barrel);
    this.movechar();
    if (this.arrow.y > 124) {
        const impact = this.add.sprite(this.arrow.x, 124, 'impactsheet');
        impact.play('impact');
    }
    if (this.ball.y > 124) {
        const impact = this.add.sprite(this.ball.x, 124, 'impactsheet');
        impact.play('impact');
    }
    if (this.barrel.y > 124) {
        const impact = this.add.sprite(this.barrel.x, 124, 'impactsheet');
        impact.play('impact');
    }
    this.lives.setText(`Lives ${this.hp}`);
    if (this.elapsedTime / 5 === 26) {
      this.victory();
    }
  }

  movearrow(arrow) {
    arrow.y += (gameSettings.fallSpeed);
      if (arrow.y > config.height) {
      this.resetarrow(arrow);
    }
  }

  moveball(ball) {
    ball.y += (gameSettings.fallSpeed) * 1.5;
      if (ball.y > config.height) {
      this.resetball(ball);
    }
  }

  movebarrel(barrel) {
    barrel.y += (gameSettings.fallSpeed) * 1.25;
      if (barrel.y > config.height) {
      this.resetbarrel(barrel);
    }
  }

  resetarrow(arrow) {
    arrow.y = 0;
    var randomX = Phaser.Math.Between(40, 120);
    arrow.x = this.char.x;
  }

  resetball(ball) {
    ball.y = 0;
    var randomX = Phaser.Math.Between(40, 120);
    ball.x = randomX;
  }

  resetbarrel(barrel) {
    barrel.y = 0;
    var randomX = Phaser.Math.Between(40, 120);
    barrel.x = randomX;
  }

  movechar() {
    this.char.setVelocity(0);
    if (this.cursorKeys.left.isDown) {
      this.char.setVelocityX(-gameSettings.charSpeed);
      this.char.setTexture("charleft");
    } else if (this.cursorKeys.right.isDown) {
      this.char.setVelocityX(gameSettings.charSpeed);
      this.char.setTexture("charright");
    } else {
      this.char.setVelocityX(0);
      this.char.setTexture("charfront");
    }
  }
}