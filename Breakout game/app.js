const padle = document.querySelector('.padle');
const rulesBtn = document.querySelector('.btn-rules');
const rules = document.querySelector('.rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
const a = 3;

const brickRowCount = 9;
const brickColumnCount = 5;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 4,
  speed: 4,
  dx: 4,
  dy: -4,
};

const paddle = {
  x: canvas.width / 2 - 15,
  y: canvas.height / 2 + 70,
  w: 30,
  h: 5,
  speed: 8,
  dx: 0,
};

const brickInfo = {
  w: 25,
  h: 5,
  padding: 4,
  offsetX: 20,
  offsetY: 20,
  visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? 'purple' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = 'purple';
  ctx.fill();

  ctx.closePath();
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = 'purple';
  ctx.fill();
  ctx.closePath();
};

const drawScore = () => {
  ctx.font = '10px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 40, 10);
};

drawScore();
drawBall();
drawPaddle();
drawBricks();

window.addEventListener('keydown', e => {
  console.log(e.key);
});

window.addEventListener('click', e => {
  if (
    !rules.classList.contains('show-rules') ||
    e.target.classList.contains('btn-rules')
  )
    return;

  rules.classList.remove('show-rules');
});

rulesBtn.addEventListener('click', () => {
  rules.classList.add('show-rules');
});
