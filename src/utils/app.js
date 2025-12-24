// Bypass for developers
const keyName = 'key';
const keyValue = '9ac7ec230e0e4513578f309d6d3579ad';

// Handle via config
if (typeof DisableDevtool !== 'undefined') {
  DisableDevtool({
    tkName: keyName,
    md5: keyValue,
    interval: '100',
  });
}

// Khai báo isMobile global
if (typeof window.isMobile === 'undefined') {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
  const isMobileDevice = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  window.isMobile = isMobileDevice || isTablet || window.innerWidth <= 1024; // Tăng ngưỡng lên 1024 để bao gồm iPad
}

// Global variables để lưu dữ liệu từ API
window.apiData = null;
let currentId = null;

// Function để lấy ID từ URL parameters
function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id') || '6947dadc591a48f17b6041f0';
}

// Function để lấy dữ liệu (Hardcoded)
async function fetchDataFromAPI(id) {
  // Hardcoded data as per requirements
  const hardcodedData = {
    "success": true,
    "data": {
      "_id": "6947dadc591a48f17b6041f0",
      "messages": [
        "Giáng sinh an lành ",
        "Giáng sinh vui vẻ ",
        "Merry Chistmas ",
        "nho vai",
        "uh",
        "hhh"
      ],
      "images": ["/image/qa/6b4d55185a33d56d8c22.jpg", "/image/qa/97c0f36fff44701a2955.jpg", "/image/qa/ccc9750a7921f67faf30.jpg", "/image/qa/e2255c61504adf14865b.jpg"],
      "song": "hoanhipgiangsinh.mp3",
      "isSave": false,
      "letterContent": "Merry Christmas\nNay là 25/12 là ngày Lễ Noel\n\nGiáng Sinh vui vẻ nhé!",
      "textEffectSeq": "Merry|Christmas",
      "createdAt": "2025-12-21T11:32:43.640Z",
      "__v": 0
    }
  };

  window.apiData = hardcodedData.data;
  console.log('Dữ liệu (Hardcoded):', window.apiData);
  return window.apiData;
}

// Function để cập nhật URL ngay lập tức
function updateURLImmediately() {
  const currentUrl = window.location.href;
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', currentUrl);
    console.log('Đã cập nhật og:url thành:', currentUrl);
  }
}

// Function để cập nhật meta tags cho chia sẻ mạng xã hội
function updateSocialMetaTags() {
  // Cập nhật URL ngay lập tức (không cần đợi API)
  updateURLImmediately();

  if (window.apiData) {
    // Cập nhật title và description dựa trên dữ liệu API
    let customTitle = "Merry Christmas - Chúc mừng Giáng Sinh";
    let customDescription = "Bạn thật may mắn khi nhận được món quà này. Chúc bạn và gia đình luôn luôn hạnh phúc 🎄✨";

    // Nếu có tên người gửi, thêm vào title
    if (window.apiData.senderName) {
      customTitle = `Merry Christmas - Từ ${window.apiData.senderName}`;
      customDescription = `${window.apiData.senderName} gửi lời chúc: Bạn thật may mắn khi nhận được món quà này. Chúc bạn và gia đình luôn luôn hạnh phúc 🎄✨`;
    }

    // Cập nhật title của trang
    document.title = customTitle;

    // Cập nhật meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', customDescription);
    }

    // Cập nhật Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', customTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', customDescription);
    }

    // Cập nhật Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', customTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', customDescription);
    }

    // Sử dụng ảnh tĩnh og-image.png với URL đầy đủ
    const ogImagePath = 'https://trung-thu-two.vercel.app/image/og-image.png';
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImagePath);
    }

    const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
    if (twitterImageMeta) {
      twitterImageMeta.setAttribute('content', ogImagePath);
    }

    console.log('Đã cập nhật meta tags cho chia sẻ mạng xã hội với ảnh og-image.png');
  }
}

// Function để hiển thị loading screen
function showLoading() {
  const loadingScreen = document.getElementById('loadingScreen');
  const errorScreen = document.getElementById('errorScreen');
  if (loadingScreen) loadingScreen.style.display = 'flex';
  if (errorScreen) errorScreen.style.display = 'none';
}

// Function để ẩn loading screen
function hideLoading() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

// Function để hiển thị error screen
function showError() {
  const loadingScreen = document.getElementById('loadingScreen');
  const errorScreen = document.getElementById('errorScreen');
  if (loadingScreen) loadingScreen.style.display = 'none';
  if (errorScreen) errorScreen.style.display = 'flex';
}

// Function để khởi tạo dữ liệu
async function initializeData() {
  showLoading();

  currentId = getIdFromUrl();

  if (currentId) {
    console.log('ID từ URL:', currentId);
    const data = await fetchDataFromAPI(currentId);

    if (data) {
      // Cập nhật các thành phần từ dữ liệu API
      updateSocialMetaTags(); // Cập nhật meta tags cho chia sẻ
      console.log('Đã tải thành công dữ liệu từ API');
      hideLoading();
      // Hiển thị button sau khi fetch xong
      const startButtonContainer = document.getElementById('startButtonContainer');
      if (startButtonContainer) {
        startButtonContainer.style.display = 'block';
      }
    } else {
      console.warn('Không thể tải dữ liệu từ API');
      showError();
      return false;
    }
  } else {
    console.log('Không có ID trong URL');
    showError();
    return false;
  }
  return true;
}

// Function để hiển thị thông báo lỗi
function showErrorMessage(message) {
  // Tạo thông báo tạm thời
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
    `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);

  // Tự động ẩn sau 5 giây
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

// --- THREE.JS SETUP ---

// Add click event để cập nhật URL khi DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Cập nhật URL ngay khi DOM ready để Messenger có thể đọc
  updateURLImmediately();
});

const isMobile = window.isMobile;

// scene + camera + renderer - Ẩn ban đầu
const scene = new THREE.Scene();
scene.background = null; // Để hiển thị gradient nền của body
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.display = 'none'; // Ẩn ban đầu
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '5'; // Dưới decor (z-index: 6) nhưng vẫn có thể tương tác vì decor có pointer-events: none
renderer.domElement.style.pointerEvents = 'auto';
document.body.appendChild(renderer.domElement);

// orbit controls (xoay quanh controls.target)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
// Hard limit rotation to -60 to 60 degrees (allow overshoot)
controls.minAzimuthAngle = -Math.PI / 3; // -60 degrees
controls.maxAzimuthAngle = Math.PI / 3;  // 60 degrees

// Track user interaction
let isUserInteracting = false;
controls.addEventListener('start', () => { isUserInteracting = true; });
controls.addEventListener('end', () => { isUserInteracting = false; });
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = 3 * Math.PI / 4;
// Limit zoom out
controls.maxDistance = 120; // Giới hạn zoom out
controls.minDistance = 10;  // Giới hạn zoom in (optional)
// Cho phép xoay trên mobile, nhưng điều chỉnh để tránh xung đột
controls.enableRotate = true;
controls.enablePan = true;
// Trên mobile, chỉ cho phép xoay bằng 1 ngón tay, pan bằng 2 ngón
if (isMobile) {
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };
}

// --- MODAL & RAYCASTER LOGIC ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let currentlyFocusedMesh = null; // Track focused item

function onMouseClick(event) {
  if (renderer.domElement.style.display === 'none') return;

  // Check if we are clicking to dismiss
  if (currentlyFocusedMesh) {
    dismissFocus();
    return;
  }

  // Calculate mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Filter only interactable person images
  const interactableObjects = imageObjects.filter(obj => obj.userData.type === 'person');
  const intersects = raycaster.intersectObjects(interactableObjects);

  if (intersects.length > 0) {
    // Pick the closest one
    const clickedMesh = intersects[0].object;
    focusOnImage(clickedMesh);
  }
}

function focusOnImage(mesh) {
  if (currentlyFocusedMesh) return; // Already focusing one

  currentlyFocusedMesh = mesh;
  mesh.userData.isFocused = true;

  // Save current state to restore later
  mesh.userData.savedPosition = mesh.position.clone();
  mesh.userData.savedRotation = mesh.rotation.clone();
  mesh.userData.savedScale = mesh.scale.clone();

  // Calculate target position: Front of camera
  const dist = 25; // Good distance for viewing
  const vector = new THREE.Vector3(0, 0, -dist);
  vector.applyQuaternion(camera.quaternion);
  const targetPos = camera.position.clone().add(vector);

  // Calculate scale factor to cover ~75% screen height
  // Visible height at distance 'dist'
  const vFOV = THREE.Math.degToRad(camera.fov); // convert vertical fov to radians
  const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;

  // We want image to be 75% of visible height
  // Current geometry height (based on scale 1) is difficult to know exactly due to texture aspect ratio logic
  // But we know 'baseSize' from makeImageMesh was 10-15.
  // However, mesh has geometry.parameters.height.
  // Let's use bounding box to be sure.

  // Temporarily reset scale to calculate natural size
  // Actually we can just trust the current geometry relative to scale 1
  // geometry height * current scale Y

  // Simplest approach: Scale to roughly 75% of visible height
  // Assuming mesh geometry was created with a certain height
  const geoHeight = mesh.geometry.parameters.height;

  const targetHeight = visibleHeight * 0.75;
  const scaleFactor = targetHeight / geoHeight;
  const targetScale = new THREE.Vector3(scaleFactor, scaleFactor, 1); // Maintain aspect ratio is uniform usually? 
  // Wait, geometry width/height maintained aspect ratio, so uniform scale is safe.
  // But makeImageMesh might have set non-uniform geometry.
  // So distinct uniform scale on top of geometry is fine.

  // More robust orientation alignment
  const dummy = new THREE.Object3D();
  dummy.position.copy(targetPos);
  dummy.lookAt(camera.position);

  // GSAP Animation
  gsap.to(mesh.position, {
    x: targetPos.x,
    y: targetPos.y,
    z: targetPos.z,
    duration: 1,
    ease: "power2.out"
  });

  gsap.to(mesh.rotation, {
    x: dummy.rotation.x,
    y: dummy.rotation.y,
    z: dummy.rotation.z,
    duration: 1
  });

  gsap.to(mesh.scale, {
    x: scaleFactor,
    y: scaleFactor, // Scale proportionally
    z: scaleFactor,
    duration: 0.5
  });
}

function dismissFocus() {
  if (!currentlyFocusedMesh) return;

  const mesh = currentlyFocusedMesh;

  // Restore to saved position
  const savedPos = mesh.userData.savedPosition || { x: 0, y: 50, z: 0 };
  const savedRot = mesh.userData.savedRotation || { x: 0, y: 0, z: 0 };
  const savedScale = mesh.userData.savedScale || mesh.userData.originalScale;

  // Animate back to original position
  gsap.to(mesh.position, {
    x: savedPos.x,
    y: savedPos.y,
    z: savedPos.z,
    duration: 0.8,
    ease: "power2.inOut"
  });

  gsap.to(mesh.rotation, {
    x: savedRot.x,
    y: savedRot.y,
    z: savedRot.z,
    duration: 0.8
  });

  gsap.to(mesh.scale, {
    x: savedScale.x,
    y: savedScale.y,
    z: savedScale.z,
    duration: 0.8,
    onComplete: () => {
      // Reset state
      mesh.userData.isFocused = false;
      currentlyFocusedMesh = null;
    }
  });
}

window.addEventListener('click', onMouseClick, false);
// Also support touch for mobile
window.addEventListener('touchstart', (event) => {
  if (event.touches.length > 0) {
    // Mock a click event structure
    const touch = event.touches[0];
    const mockEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY
    };
    onMouseClick(mockEvent);
  }
}, false);

function openModal(imageSrc) {
  // Deprecated in favor of 3D focus
}

// lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(10, 20, 10);
scene.add(dir);

// group chứa text (dễ set target)
const textGroup = new THREE.Group();
scene.add(textGroup);

// Function để lấy danh sách câu chúc từ API hoặc dữ liệu mặc định
function getTexts() {
  // Kiểm tra nếu có apiData và có trường messages
  if (window.apiData && window.apiData.hasOwnProperty('messages')) {
    // Nếu là string, kiểm tra xem có rỗng không
    if (typeof window.apiData.messages === 'string') {
      const trimmed = window.apiData.messages.trim();
      if (trimmed === '') {
        return []; // Trả về mảng rỗng nếu messages rỗng
      }
      // Nếu không rỗng, split theo dòng và filter các dòng trống
      return trimmed.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    }
    // Nếu là array, kiểm tra xem có phần tử không
    if (Array.isArray(window.apiData.messages)) {
      if (window.apiData.messages.length === 0) {
        return []; // Trả về mảng rỗng nếu array rỗng
      }
      return window.apiData.messages;
    }
    // Nếu messages không phải string hoặc array hợp lệ, trả về mảng rỗng
    return [];
  }
  // Chỉ dùng dữ liệu mặc định nếu KHÔNG CÓ apiData hoặc KHÔNG CÓ trường messages
  return [
    "iu em",
    "Hạnh phúc",
    "Luôn vui vẻ",
    "Mong tình yêu chúng ta luôn bền lâu như tuyết rơi mùa đông",
    "Merry Christmas 2025",
    "Cảm ơn em vì tất cả",
    "iu công chúa của anh",
    "i love you",
    "mãi như vậy nhé"
  ];
}

let objects = []; // chứa mesh + speed
let imageObjects = []; // chứa ảnh bay lên hoặc trái tim sau khi biến đổi
const textureCache = {}; // cache texture ảnh để không load lại nhiều lần

// Function để lấy danh sách ảnh: luôn gồm default + thêm ảnh API (nếu có)
function getImagePaths() {
  const defaults = [
    "iamgedefault/—Pngtree—christmas gift box_23315191.png",
    "iamgedefault/—Pngtree—reindeer mascot with red glasses_23353415.png",
    "iamgedefault/—Pngtree—snowman puts on santa hat_20309031.png",
  ];
  const apiImages = (window.apiData && Array.isArray(window.apiData.images)) ? window.apiData.images : [];
  return defaults.concat(apiImages);
}

function updateImageGeometry(texture, mesh) {
  if (!texture || !texture.image) return;
  const aspectRatio = texture.image.width / texture.image.height;
  const isMobileDevice = window.isMobile || window.innerWidth <= 768;
  const baseSize = isMobileDevice ? 10 : 15; // Giảm kích thước trên mobile để đỡ tràn viền
  let width, height;

  if (aspectRatio > 1) {
    width = baseSize;
    height = baseSize / aspectRatio;
  } else {
    width = baseSize * aspectRatio;
    height = baseSize;
  }

  const geometry = new THREE.PlaneGeometry(width, height);
  mesh.geometry.dispose();
  mesh.geometry = geometry;
}

// hàm tạo mesh ảnh 3D (dùng cache texture để đỡ tốn bộ nhớ & network)
function makeImageMesh(imagePath) {
  const isMobileDevice = window.isMobile || window.innerWidth <= 768;
  const loader = new THREE.TextureLoader();
  const cached = textureCache[imagePath];

  const geometry = new THREE.PlaneGeometry(isMobileDevice ? 9 : 12, isMobileDevice ? 9 : 12); // giảm kích thước tạm trên mobile
  const material = new THREE.MeshBasicMaterial({
    map: cached || null,
    transparent: true,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);

  if (cached && cached.image) {
    updateImageGeometry(cached, mesh);
  } else {
    const texture = loader.load(imagePath, function (tex) {
      updateImageGeometry(tex, mesh);
    });
    textureCache[imagePath] = texture;
    material.map = texture;
  }

  // thêm thuộc tính để điều khiển quỹ đạo bay
  mesh.userData = {
    originalY: mesh.position.y,
    originalX: mesh.position.x,
    originalZ: mesh.position.z,
    pattern: Math.floor(Math.random() * 3), // 0: thẳng, 1: chéo trái, 2: chéo phải
    // New properties for rotation - Reduced speed
    rotationSpeedX: (Math.random() - 0.5) * 0.005,
    rotationSpeedY: (Math.random() - 0.5) * 0.005,
    rotationSpeedZ: (Math.random() - 0.5) * 0.005,
    isFocused: false, // Track if item is currently focused
    originalScale: mesh.scale.clone(), // Save original scale
    type: 'unknown' // Will be set later
  };

  return mesh;
}

// Đợi Google Fonts load xong trước khi tạo text
document.fonts.ready.then(function () {
  console.log('Fonts loaded successfully');
});

// Function để test Messenger preview
function testMessengerPreview() {
  console.log('=== MESSENGER PREVIEW TEST ===');
  console.log('Title:', document.querySelector('meta[property="og:title"]')?.getAttribute('content'));
  console.log('Description:', document.querySelector('meta[property="og:description"]')?.getAttribute('content'));
  console.log('Image:', document.querySelector('meta[property="og:image"]')?.getAttribute('content'));
  console.log('URL:', document.querySelector('meta[property="og:url"]')?.getAttribute('content'));
  console.log('==============================');
}

// Khởi tạo dữ liệu khi trang load
window.addEventListener('load', async function () {
  // Cập nhật URL ngay lập tức để Messenger có thể đọc đúng
  updateSocialMetaTags();

  // Test Messenger preview
  testMessengerPreview();

  const success = await initializeData();
  // Chỉ tạo text và ảnh khi có dữ liệu thành công (nhưng chưa hiển thị)
  if (success) {
    createTextAndImages();
  }
});

// Function để phát nhạc từ dữ liệu API
function playMusic() {
  // Kiểm tra cả music và song (backend có thể dùng một trong hai)
  const musicUrl = (window.apiData && window.apiData.music) || (window.apiData && window.apiData.song);

  if (!musicUrl) {
    console.log('Không có nhạc trong dữ liệu API');
    return;
  }
  console.log('🎵 Phát nhạc:', musicUrl);

  // Tạo audio element nếu chưa có
  let audio = document.getElementById('backgroundMusic');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'backgroundMusic';
    audio.loop = true; // Lặp lại nhạc
    audio.volume = 0.7; // Âm lượng 70%
    document.body.appendChild(audio);
  }

  // Xử lý URL: nếu là local file (không có http/https) thì thêm đường dẫn music/
  let finalUrl = musicUrl;
  if (!musicUrl.startsWith('http://') && !musicUrl.startsWith('https://') && !musicUrl.startsWith('data:')) {
    // Là file local, thêm đường dẫn music/
    finalUrl = `music/${musicUrl}`;
  }

  audio.src = finalUrl;

  // Phát nhạc
  audio.play().then(() => {
    console.log('✅ Đã bắt đầu phát nhạc:', finalUrl);
  }).catch(error => {
    console.error('❌ Lỗi khi phát nhạc:', error);
    // Thử lại với URL gốc nếu lỗi
    if (finalUrl !== musicUrl) {
      audio.src = musicUrl;
      audio.play().catch(err => {
        console.error('❌ Lỗi khi phát nhạc với URL gốc:', err);
      });
    }
  });
}

// Event listener cho button start
document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', function () {
      // Bắt đầu phát nhạc ngay
      playMusic();

      // Trên mobile: delay để hiệu ứng button chạy xong rồi mới ẩn và bắt đầu cây thông
      // Desktop: chạy ngay
      if (window.isMobile) {
        // Đợi hiệu ứng button chạy xong (khoảng 800-1000ms)
        setTimeout(function () {
          // Ẩn button sau khi hiệu ứng chạy xong
          const startButtonContainer = document.getElementById('startButtonContainer');
          if (startButtonContainer) {
            startButtonContainer.style.display = 'none';
          }
          // Hiện SVG cây thông
          const mainSVG = document.querySelector('.mainSVG');
          if (mainSVG) {
            mainSVG.style.display = 'block';
          }
          // Bắt đầu animation cây thông
          if (typeof window.startTreeAnimation === 'function') {
            window.startTreeAnimation();
          }
        }, 1000); // Delay 1 giây để hiệu ứng button chạy xong
      } else {
        // Desktop: chạy ngay
        // Ẩn button
        const startButtonContainer = document.getElementById('startButtonContainer');
        if (startButtonContainer) {
          startButtonContainer.style.display = 'none';
        }
        // Hiện SVG cây thông
        const mainSVG = document.querySelector('.mainSVG');
        if (mainSVG) {
          mainSVG.style.display = 'block';
        }
        // Bắt đầu animation cây thông
        if (typeof window.startTreeAnimation === 'function') {
          window.startTreeAnimation();
        }
      }
    });
  }
});


// Function để tạo text và ảnh sau khi có dữ liệu
function createTextAndImages() {
  // load font rồi tạo text 3D
  const fontLoader = new THREE.FontLoader();
  fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    // hàm tạo mesh text 3D
    function makeTextMesh(message) {
      const isMobile = window.innerWidth <= 768;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Tự động tính kích thước canvas dựa trên độ dài chữ
      // Mobile: chữ nhỏ hơn; Desktop: chữ to như hiện tại
      const baseFontSize = isMobile ? 64 : 96;
      const baseTextHeight = isMobile ? 90 : 120;
      const paddingW = isMobile ? 40 : 60;
      const paddingH = isMobile ? 24 : 40;

      context.font = `700 ${baseFontSize}px 'Dancing Script', cursive, 'Arial', sans-serif`;
      const textMetrics = context.measureText(message);
      const textWidth = textMetrics.width;
      const textHeight = baseTextHeight; // chiều cao cố định

      // Đặt kích thước canvas với padding
      canvas.width = Math.max(textWidth + paddingW, isMobile ? 220 : 260);
      canvas.height = textHeight + paddingH;

      context.font = `700 ${baseFontSize}px 'Dancing Script', cursive, 'Arial', sans-serif`;
      context.fillStyle = "#ffffff";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(message, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      // Tối ưu texture settings để giảm lag
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false; // Tắt mipmaps để tiết kiệm bộ nhớ

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide, // để nhìn được cả mặt trước & sau
        depthWrite: false // Tối ưu rendering cho transparent objects
      });

      // Tự động tính kích thước geometry dựa trên canvas
      // Mobile: scale nhỏ hơn một chút để đỡ choáng màn hình
      const widthScale = isMobile ? 12 : 18;
      const heightScale = isMobile ? 6 : 9;
      const geometryWidth = (canvas.width / 512) * widthScale;
      const geometryHeight = (canvas.height / 256) * heightScale;
      const geometry = new THREE.PlaneGeometry(geometryWidth, geometryHeight);
      const mesh = new THREE.Mesh(geometry, material);

      // Rotate text randomly (-30 to 30 degrees)
      mesh.rotation.z = THREE.Math.degToRad((Math.random() * 60) - 30);

      return mesh;
    }


    // tạo nhiều text 3D - bắt đầu từ trên màn hình và rơi xuống
    const texts = getTexts(); // Lấy dữ liệu động
    // Chỉ tạo text objects nếu có messages (texts không rỗng)
    if (texts && texts.length > 0) {
      // Tăng số lượng text cho mobile để mưa chữ dày hơn
      const textCount = window.isMobile ? 75 : 50;
      for (let i = 0; i < textCount; i++) {
        let text = texts[Math.floor(Math.random() * texts.length)];
        let mesh = makeTextMesh(text);
        // Bắt đầu từ trên màn hình và phân bố đều để rơi từ từ
        // Giảm khoảng cách trên mobile để mưa chữ dày hơn
        const spacing = window.isMobile ? 1.2 : 1.5;
        mesh.position.set(
          (Math.random() - 0.5) * (window.isMobile ? 35 : 80),
          30 + (i * spacing), // Giảm khoảng cách trên mobile
          (Math.random() - 0.5) * (window.isMobile ? 35 : 80)
        );
        scene.add(mesh);
        objects.push(mesh);
      }
      console.log('Đã tạo ' + objects.length + ' text objects');
    } else {
      console.log('Không có messages, bỏ qua tạo text objects');
    }

    // Function to update image geometry and add border
    function updateImageGeometry(texture, mesh) {
      if (!texture || !texture.image) return;
      const aspectRatio = texture.image.width / texture.image.height;
      const isMobileDevice = window.isMobile || window.innerWidth <= 768;
      const baseSize = isMobileDevice ? 10 : 15; // Giảm kích thước trên mobile để đỡ tràn viền
      let width, height;

      if (aspectRatio > 1) {
        width = baseSize;
        height = baseSize / aspectRatio;
      } else {
        width = baseSize * aspectRatio;
        height = baseSize;
      }

      const geometry = new THREE.PlaneGeometry(width, height);
      if (mesh.geometry) mesh.geometry.dispose();
      mesh.geometry = geometry;

      // Handle Border if enabled
      if (mesh.userData.hasBorder) {
        const borderWidth = isMobileDevice ? 0.4 : 0.6;
        const borderGeo = new THREE.PlaneGeometry(width + borderWidth, height + borderWidth);
        const borderMat = new THREE.MeshBasicMaterial({ color: 0xc87934, side: THREE.DoubleSide });

        // Check if border child already exists
        let borderMesh = mesh.children.find(c => c.name === 'border');
        if (borderMesh) {
          borderMesh.geometry.dispose();
          borderMesh.geometry = borderGeo;
        } else {
          borderMesh = new THREE.Mesh(borderGeo, borderMat);
          borderMesh.name = 'border';
          borderMesh.position.z = -0.05; // Slightly behind
          mesh.add(borderMesh);
        }
      }
    }

    // hàm tạo mesh ảnh 3D (dùng cache texture để đỡ tốn bộ nhớ & network)
    function makeImageMesh(imagePath, hasBorder = false) {
      const isMobileDevice = window.isMobile || window.innerWidth <= 768;
      const loader = new THREE.TextureLoader();
      const cached = textureCache[imagePath];

      const geometry = new THREE.PlaneGeometry(isMobileDevice ? 9 : 12, isMobileDevice ? 9 : 12); // giảm kích thước tạm trên mobile
      const material = new THREE.MeshBasicMaterial({
        map: cached || null,
        transparent: true,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.hasBorder = hasBorder; // Set hasBorder early for updateImageGeometry

      if (cached && cached.image) {
        updateImageGeometry(cached, mesh);
      } else {
        const texture = loader.load(imagePath, function (tex) {
          updateImageGeometry(tex, mesh);
        });
        textureCache[imagePath] = texture;
        material.map = texture;
      }

      // thêm thuộc tính để điều khiển quỹ đạo bay
      mesh.userData = {
        originalY: mesh.position.y,
        originalX: mesh.position.x,
        originalZ: mesh.position.z,
        pattern: Math.floor(Math.random() * 3), // 0: thẳng, 1: chéo trái, 2: chéo phải
        // Default rotation speed 0
        rotationSpeedX: 0,
        rotationSpeedY: 0,
        rotationSpeedZ: 0,
        isFocused: false, // Track if item is currently focused
        originalScale: mesh.scale.clone(), // Save original scale
        type: 'unknown', // Will be set later
        hasBorder: hasBorder // Ensure hasBorder is part of the final userData
      };

      return mesh;
    }

    // tạo ảnh rơi xuống - Tách biệt decor và person
    const defaults = [
      "iamgedefault/—Pngtree—reindeer mascot with red glasses_23353415.png",
      "iamgedefault/—Pngtree—snowman puts on santa hat_20309031.png",
    ];
    const personImages = (window.apiData && Array.isArray(window.apiData.images)) ? window.apiData.images : [];

    // Create DECOR objects (background items)
    // Tăng số lượng ảnh decor
    const decorCount = window.isMobile ? 6 : 8;
    if (defaults.length > 0) {
      for (let i = 0; i < decorCount; i++) {
        const imagePath = defaults[i % defaults.length];
        let imageMesh = makeImageMesh(imagePath, false); // No border for decor
        imageMesh.userData.type = 'decor';

        // Random rotation and flip (Initial state only)
        if (Math.random() > 0.5) {
          imageMesh.scale.x *= -1;
        }
        imageMesh.rotation.z = Math.random() * Math.PI * 2;

        // Disable continuous animation for decor (as per request)
        imageMesh.userData.rotationSpeedX = 0;
        imageMesh.userData.rotationSpeedY = 0;
        imageMesh.userData.rotationSpeedZ = 0;

        const range = window.isMobile ? 40 : 90; // Wider range for decor
        imageMesh.position.set(
          (Math.random() - 0.5) * range,
          40 + (i * 4),
          (Math.random() - 0.5) * range - 10 // Push background items back slightly
        );

        scene.add(imageMesh);
        imageObjects.push(imageMesh);
      }
    }

    // Create PERSON objects (clickable items)
    if (personImages.length > 0) {
      // Person items should be fewer but more prominent
      const personCount = window.isMobile ? 5 : 8;

      for (let i = 0; i < personCount; i++) {
        const imagePath = personImages[i % personImages.length];
        let imageMesh = makeImageMesh(imagePath, true); // ADD BORDER here
        imageMesh.userData.type = 'person';

        // Mark highly clickable
        imageMesh.userData.isInteractable = true;

        // Gentle float rotation for person items
        imageMesh.userData.rotationSpeedX = (Math.random() - 0.5) * 0.005;
        imageMesh.userData.rotationSpeedY = (Math.random() - 0.5) * 0.005;
        imageMesh.userData.rotationSpeedZ = (Math.random() - 0.5) * 0.005;

        const range = window.isMobile ? 30 : 60; // Narrower range for person items
        imageMesh.position.set(
          (Math.random() - 0.5) * range,
          50 + (i * 8),
          (Math.random() - 0.5) * 30 // Closer to camera Z-wise
        );

        scene.add(imageMesh);
        imageObjects.push(imageMesh);
      }
    }
    console.log('Đã tạo ' + imageObjects.length + ' image objects');


    // đặt camera và controls target để xoay quanh group (khoảng giữa)
    camera.position.set(0, 12, 60);
    controls.target.set(0, 10, 0);
    controls.update();
    console.log('createTextAndImages hoàn thành');
  });
}

// Chỉ animate khi đã bắt đầu hiệu ứng
let animationRunning = false;

function startAnimate() {
  // Check snowEffectsStarted directly since it's now in snow.js but this executes in same scope if included linearly
  // WARNING: snowEffectsStarted is defined in snow.js. If snow.js is loaded before this file, we can access it if it's global.
  // However, since we're refactoring, we need to ensure snowEffectsStarted is accessible.
  // In index.html, everything was one script. Now snow.js and app.js are separate.
  // Since we didn't export snowEffectsStarted from snow.js to window explicitly, we should add:
  // window.snowEffectsStarted = snowEffectsStarted; in snow.js
  // Or just check if startSnowEffects was called?

  // In snow.js I didn't export `snowEffectsStarted`. I should fix snow.js first or change this code to not rely on it directly,
  // or assume they share global scope if they are just scripts.
  // But let's assume `snowEffectsStarted` might be local to snow.js if I used modules (I didn't).
  // As they are just scripts, variables declared with `let` at top level are NOT global in module type but ARE global in non-module scripts?
  // Actually `let` and `const` at top level of a script tag are global?
  // Using `let` at top level in browser script:
  // <script>let a = 1;</script> inside browser console `window.a` is undefined but `a` is defined in global scope.
  // However, across scripts?
  // <script src="a.js">let a = 1</script> <script src="b.js">console.log(a)</script> works.

  console.log('startAnimate được gọi', 'objects:', objects.length, 'imageObjects:', imageObjects.length);
  // Remove the check for snowEffectsStarted for now, or just rely on the caller to ensure it's time.

  if (animationRunning) {
    console.log('Animation already running');
    return;
  }
  animationRunning = true;

  // Đảm bảo objects đã được tạo
  if (objects.length === 0 && imageObjects.length === 0) {
    console.log('Objects chưa được tạo, đang đợi...');
    setTimeout(function () {
      animationRunning = false; // Reset to allow retry
      if (objects.length > 0 || imageObjects.length > 0) {
        startAnimate();
      } else {
        console.log('Vẫn chưa có objects sau khi đợi');
      }
    }, 500);
    return;
  }

  // Hiện renderer
  if (renderer && renderer.domElement) {
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'auto';
    console.log('Renderer đã được hiển thị');
  } else {
    console.log('Renderer không tồn tại!');
  }

  // Tối ưu: Sử dụng frustum culling và batch update
  const frustum = new THREE.Frustum();
  const cameraMatrix = new THREE.Matrix4();

  function animate() {
    requestAnimationFrame(animate);

    // Cập nhật frustum để culling
    cameraMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraMatrix);

    // Animation cho text - tối ưu với batch update
    if (objects.length > 0) {
      const speed = 0.12;
      const resetY = 30;
      const resetRange = 30;
      const minY = -50;

      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        // Chỉ update nếu object trong view hoặc gần view
        if (frustum.containsPoint(obj.position) || obj.position.y > -20) {
          obj.position.y -= speed;
          if (obj.position.y < minY) {
            // Reset lên trên màn hình để tiếp tục rơi
            obj.position.y = resetY + Math.random() * resetRange;
            obj.position.x = (Math.random() - 0.5) * 80;
            obj.position.z = (Math.random() - 0.5) * 80;
          }
        } else {
          // Object ngoài view, reset ngay để tiết kiệm
          obj.position.y = resetY + Math.random() * resetRange;
          obj.position.x = (Math.random() - 0.5) * 80;
          obj.position.z = (Math.random() - 0.5) * 80;
        }
      }
    }

    // Animation cho ảnh với các quỹ đạo rơi khác nhau - tối ưu
    if (imageObjects.length > 0) {
      const speed = 0.1;
      const resetY = 40;
      const resetRange = 30;
      const minY = -70;
      const range = window.isMobile ? 15 : 80;

      for (let i = 0; i < imageObjects.length; i++) {
        const imgObj = imageObjects[i];

        // Skip falling logic if object is focused
        if (imgObj.userData.isFocused) continue;

        const pattern = imgObj.userData.pattern;

        // Chỉ update nếu object trong view hoặc gần view
        if (frustum.containsPoint(imgObj.position) || imgObj.position.y > -20) {
          // Rơi xuống
          imgObj.position.y -= speed;

          // Apply rotation
          imgObj.rotation.x += imgObj.userData.rotationSpeedX;
          imgObj.rotation.y += imgObj.userData.rotationSpeedY;
          imgObj.rotation.z += imgObj.userData.rotationSpeedZ;

          // Quỹ đạo rơi khác nhau - chỉ thay đổi hướng rơi
          if (pattern === 1) {
            // Rơi chéo sang trái
            imgObj.position.x -= 0.03;
          } else if (pattern === 2) {
            // Rơi chéo sang phải
            imgObj.position.x += 0.03;
          }

          // Reset khi rơi quá thấp
          if (imgObj.position.y < minY) {
            imgObj.position.y = resetY + Math.random() * resetRange;
            imgObj.position.x = (Math.random() - 0.5) * range;
            imgObj.position.z = (Math.random() - 0.5) * range;
            imgObj.rotation.set(0, 0, 0); // Reset rotation
            // Random lại pattern
            imgObj.userData.pattern = Math.floor(Math.random() * 3);
          }
        } else {
          // Object ngoài view, reset ngay
          imgObj.position.y = resetY + Math.random() * resetRange;
          imgObj.position.x = (Math.random() - 0.5) * range;
          imgObj.position.z = (Math.random() - 0.5) * range;
          imgObj.rotation.set(0, 0, 0);
          imgObj.userData.pattern = Math.floor(Math.random() * 3);
        }
      }
    }

    // Soft limit logic: Spring back to +/- 45 degrees if exceeded
    if (!isUserInteracting) {
      const currentAzimuth = controls.getAzimuthalAngle();
      const limit = Math.PI / 4; // 45 degrees soft limit
      const restoreSpeed = 0.05;

      if (currentAzimuth > limit) {
        // Calculate new azimuth closer to limit
        const newAzimuth = THREE.MathUtils.lerp(currentAzimuth, limit, restoreSpeed);

        // Update camera position based on new azimuth (theta)
        const offset = new THREE.Vector3().copy(camera.position).sub(controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);
        spherical.theta = newAzimuth;

        offset.setFromSpherical(spherical);
        camera.position.copy(controls.target).add(offset);
        camera.lookAt(controls.target);
      } else if (currentAzimuth < -limit) {
        // Calculate new azimuth closer to limit
        const newAzimuth = THREE.MathUtils.lerp(currentAzimuth, -limit, restoreSpeed);

        // Update camera position based on new azimuth (theta)
        const offset = new THREE.Vector3().copy(camera.position).sub(controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);
        spherical.theta = newAzimuth;

        offset.setFromSpherical(spherical);
        camera.position.copy(controls.target).add(offset);
        camera.lookAt(controls.target);
      }
    }

    // Chỉ update controls mỗi frame (cần thiết cho damping)
    controls.update();

    // Render scene
    renderer.render(scene, camera);
  }

  animate();
}

// Bắt đầu animate khi hiệu ứng được kích hoạt
window.startAnimate = startAnimate;

// handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hook vào book.js để detect khi typing hoàn thành
// Đợi book.js load xong
// Hook vào book.js để detect khi typing hoàn thành
// Đợi book.js load xong
window.addEventListener('load', function () {
  setTimeout(function () {
    // Expose preload and activate functions for book.js
    window.preloadSnowScene = function () {
      console.log('Preloading snow scene...');
      // Load snow effects in background
      if (typeof window.startSnowEffects === 'function') {
        window.startSnowEffects();
      }

      // Initialize Three.js but keep hidden or behind
      if (typeof startAnimate === 'function') {
        // Ensure renderer is created
        if (renderer && renderer.domElement) {
          // Keep it hidden or set opacity 0 if needed, but here we just want it ready
          // Actually startAnimate shows the renderer block. 
          // Let's modify startAnimate behavior or just call it and ensure it's Z-index is below or opacity is 0.
          // The renderer already has z-index 5, guideInfo has 3000. So it will render BEHIND the book.
          // We just need to make sure it's display block.
          startAnimate();
        }
      }
    };

    window.activateSnowScene = function () {
      console.log('Activating snow scene...');
      const guideInfo = document.getElementById('guideInfo');

      // Ensure snow effects are started (fixes race condition if clicked early)
      if (typeof window.startSnowEffects === 'function') {
        window.startSnowEffects();
      }

      if (guideInfo) {
        // Use GSAP for smooth closing animation
        gsap.to(guideInfo, {
          duration: 0.8,
          opacity: 0,
          scale: 0,
          ease: "back.in(1.7)",
          onComplete: () => {
            guideInfo.classList.remove('show');
            guideInfo.classList.add('hidden');

            // Reset properties for potential reuse
            gsap.set(guideInfo, { opacity: 1, scale: 1 });

            // Ensure renderer is visible if not already
            if (renderer && renderer.domElement) {
              renderer.domElement.style.display = 'block';
            }
            // Double check animation started
            if (typeof startAnimate === 'function') {
              startAnimate();
            }
          }
        });
      } else {
        // Fallback if guideInfo missing
        if (typeof window.startSnowEffects === 'function') {
          window.startSnowEffects();
        }
        if (renderer && renderer.domElement) {
          renderer.domElement.style.display = 'block';
        }
        if (typeof startAnimate === 'function') {
          startAnimate();
        }
      }
    };

  }, 100);
});
