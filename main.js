const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function randomNum(max, min) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Snowflake {
  y = 0;
  constructor(x, speed, icon) {
    this.x = x;
    this.speed = speed;
    this.icon = icon.cloneNode();
    this.icon.width = randomNum(16, 5);
    this.icon.height = this.icon.width;
  }
  move() {
    this.y += this.speed;
  }
  clear() {
    ctx.clearRect(this.x, this.y, this.icon.width, this.icon.height);
  }
  draw() {
    ctx.globalAlpha = ((540 - this.y) / (540 / 100)) / 100;
    ctx.drawImage(this.icon, this.x, this.y, this.icon.width, this.icon.height);
  }
  animate() {
    this.clear();
    this.move();
    this.draw();
  }
}

const snowIcon = new Image(16, 16);
snowIcon.src = 'snowFlake.png';

snowIcon.onload = () => {
  setInterval(() => {
    let snow = new Snowflake(randomNum(1920, 0), 4, snowIcon);

    const movementSnow = setInterval(() => {

      if (snow.y >= 540) {
        clearInterval(movementSnow);
        setTimeout(() => {
          snow.clear();
          snow = null;
        }, 1000);
      }

      snow.animate();

    }, 20);
  }, 80);
}
