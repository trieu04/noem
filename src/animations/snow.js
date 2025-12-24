// Flag để kiểm tra khi nào bắt đầu hiệu ứng tuyết/chữ
let snowEffectsStarted = false;

// Tạo bông tuyết emoji bằng CSS (ít lag hơn)
function createEmojiSnowflakes() {
  const container = document.getElementById('snowflakesContainer');
  const count = 20; // Số lượng bông tuyết emoji

  for (let i = 0; i < count; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake-emoji';
    snowflake.textContent = '❄️';

    // Vị trí ngẫu nhiên theo chiều ngang, bắt đầu từ trên cùng
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.top = '0'; // Bắt đầu từ trên màn hình

    // Thời gian animation ngẫu nhiên (từ 8s đến 15s)
    const duration = Math.random() * 7 + 8;
    snowflake.style.animationDuration = duration + 's';

    // Delay ngẫu nhiên để không rơi cùng lúc
    snowflake.style.animationDelay = Math.random() * 5 + 's';

    // Sway (độ lệch ngang) ngẫu nhiên
    const sway = (Math.random() - 0.5) * 200;
    snowflake.style.setProperty('--sway', sway + 'px');

    // Kích thước ngẫu nhiên
    const size = Math.random() * 0.8 + 0.7;
    snowflake.style.fontSize = size + 'em';

    // Opacity ngẫu nhiên
    snowflake.style.opacity = Math.random() * 0.4 + 0.6;

    container.appendChild(snowflake);
  }
}

// Tạo bông tuyết tròn bằng canvas
function createCanvasSnowflakes() {
  const canvas = document.getElementById('snowCanvas');
  const ctx = canvas.getContext('2d');

  // Thiết lập kích thước canvas
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mảng lưu các bông tuyết
  const snowflakes = [];
  const simpleSnowflakeCount = 80; // Bông tuyết đơn giản (chấm tròn)

  // Bông tuyết đơn giản (chấm tròn nhỏ)
  class SimpleSnowflake {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 0.5 + 0.2;
      this.opacity = Math.random() * 0.5 + 0.5;
      this.wind = Math.random() * 0.5 - 0.25;
    }

    update() {
      this.y += this.speed;
      this.x += this.wind + Math.sin(this.y * 0.01) * 0.5;

      if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }

      if (this.x > canvas.width) {
        this.x = 0;
      } else if (this.x < 0) {
        this.x = canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }
  }

  // Khởi tạo các bông tuyết đơn giản
  for (let i = 0; i < simpleSnowflakeCount; i++) {
    snowflakes.push(new SimpleSnowflake());
  }

  // Hàm vẽ animation
  function animate() {
    if (!canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snowflake => {
      snowflake.update();
      snowflake.draw();
    });

    requestAnimationFrame(animate);
  }

  // Bắt đầu animation
  animate();
}

// Function để bắt đầu hiệu ứng tuyết và chữ
function startSnowEffects() {
  if (snowEffectsStarted) return;
  snowEffectsStarted = true;

  // Hiện canvas và container tuyết
  const snowCanvas = document.getElementById('snowCanvas');
  const snowflakesContainer = document.getElementById('snowflakesContainer');
  if (snowCanvas) snowCanvas.style.display = 'block';
  if (snowflakesContainer) snowflakesContainer.style.display = 'block';

  // Bắt đầu tạo tuyết
  createEmojiSnowflakes();
  createCanvasSnowflakes();

  // Hiện Three.js renderer nếu đã được tạo
  const threeRenderer = document.querySelector('canvas[data-engine]') || document.body.querySelector('canvas:not(#snowCanvas)');
  if (threeRenderer) {
    threeRenderer.style.display = 'block';
    threeRenderer.style.pointerEvents = 'auto';
  }
}

// Expose to window
window.startSnowEffects = startSnowEffects;
