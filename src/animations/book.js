// Book và Typing Effect với GSAP
// Mặc định nếu backend không trả dữ liệu
const defaultMessageData = [
    "Giáng sinh này,",
    "mong bạn luôn bình an,",
    "ấm áp bên những người mình thương. 🎄",
];

// Lấy dữ liệu bức thư từ API (trung thu / noel) nếu có
function getMessageDataFromApi() {
    try {
        if (window.apiData && window.apiData.hasOwnProperty('letterContent')) {
            if (typeof window.apiData.letterContent === 'string') {
                const raw = window.apiData.letterContent.trim();
                // Nếu rỗng, trả về mảng rỗng để không hiển thị book
                if (raw === '') {
                    return [];
                }
                const lines = raw
                    .split(/\r?\n/)
                    .map(line => line.trim())
                    .filter(line => line.length > 0);
                if (lines.length > 0) {
                    return lines;
                }
                // Nếu sau khi filter không còn dòng nào, trả về mảng rỗng
                return [];
            }
        }
    } catch (e) {
        console.warn('Không đọc được letterContent từ apiData, dùng default:', e);
    }
    // Chỉ dùng dữ liệu mặc định nếu không có apiData hoặc không có trường letterContent
    return defaultMessageData;
}

// Typing state với GSAP
var typingState = {
    currentLine: 0,
    pElements: [],
    timelines: [],
    isPaused: false
};

// Hàm split text thành từng từ (đẹp hơn cho bức thư)
function splitTextIntoWords(text) {
    return text.split(/(\s+)/).map(function (word, index) {
        if (/^\s+$/.test(word)) {
            return '<span class="word-space">' + word + '</span>';
        }
        return '<span class="word">' + word + '</span>';
    }).join('');
}

// Hàm split text thành từng từ, mỗi từ chứa các ký tự (tránh ngắt ký tự khi xuống dòng)
function splitTextIntoChars(text) {
    // Split thành từng từ (bao gồm khoảng trắng)
    var words = text.split(/(\s+)/);

    return words.map(function (word) {
        if (/^\s+$/.test(word)) {
            // Nếu là khoảng trắng, giữ nguyên
            return '<span class="word-wrapper"><span class="char-space">' + word + '</span></span>';
        }
        // Nếu là từ, wrap trong word-wrapper và split thành ký tự
        var chars = word.split('').map(function (char) {
            return '<span class="char">' + char + '</span>';
        }).join('');
        return '<span class="word-wrapper">' + chars + '</span>';
    }).join('');
}

// Hàm scroll đến element
function scrollToElement(element) {
    var details = element.closest(".details");
    if (!details) return;

    var elementTop = element.offsetTop;
    var elementHeight = element.offsetHeight;
    var containerHeight = details.clientHeight;
    var scrollTop = details.scrollTop;

    if (
        elementTop < scrollTop ||
        elementTop + elementHeight > scrollTop + containerHeight
    ) {
        details.scrollTo({
            top: elementTop - 20,
            behavior: "smooth"
        });
    }
}

// Hàm typing effect với GSAP - Typewriter cổ điển
function typeTextWithGSAP(element, text, lineIndex, callback) {
    // Kiểm tra xem đã có timeline và nội dung chưa
    var existingTimeline = typingState.timelines[lineIndex];
    var existingChars = element.querySelectorAll('.char');

    // Nếu đã có timeline và đang paused, chỉ cần resume
    if (existingTimeline && existingTimeline.paused() && existingChars.length > 0) {
        if (!typingState.isPaused) {
            existingTimeline.play();
        }
        return;
    }

    // Nếu timeline đã completed, không làm gì
    if (existingTimeline && !existingTimeline.paused() && existingTimeline.progress() === 1) {
        if (callback) callback();
        return;
    }

    // Clear element và split text thành từng ký tự
    element.innerHTML = splitTextIntoChars(text);
    var chars = element.querySelectorAll('.char');

    if (chars.length === 0) {
        if (callback) callback();
        return;
    }

    // Set initial state cho tất cả chars - ẩn hoàn toàn
    gsap.set(chars, {
        opacity: 0
    });

    // Tạo timeline cho dòng này
    var tl = gsap.timeline({
        onComplete: function () {
            scrollToElement(element);
            if (callback) callback();
        },
        paused: typingState.isPaused
    });

    // Typewriter effect: từng ký tự xuất hiện một cách tuần tự
    tl.to(chars, {
        opacity: 1,
        duration: 0.05, // Rất nhanh cho từng ký tự
        ease: "none", // Không có easing để giống máy đánh chữ
        stagger: {
            each: 0.08, // Mỗi ký tự cách nhau 0.08s (chậm hơn)
            from: "start"
        },
        onUpdate: function () {
            // Auto scroll khi typing
            if (this.progress() > 0.2 && this.progress() % 0.1 < 0.05) {
                scrollToElement(element);
            }
        }
    });

    // Lưu timeline để có thể pause/resume
    typingState.timelines[lineIndex] = tl;

    // Play timeline
    if (!typingState.isPaused) {
        tl.play();
    }
}

// Hàm bắt đầu/tiếp tục typing effect với GSAP
function startTypingEffect() {
    var messageContent = document.getElementById("messageContent");
    if (!messageContent) return;

    // Lấy dữ liệu bức thư (ưu tiên từ API)
    const messageData = getMessageDataFromApi();

    // Nếu messageData rỗng (letterContent rỗng), không hiển thị book
    if (messageData.length === 0) {
        console.log('letterContent rỗng, không hiển thị book');
        var guideInfo = document.getElementById("guideInfo");
        if (guideInfo) {
            guideInfo.classList.remove("show");
            guideInfo.classList.add("hidden");
        }
        return;
    }

    if (typingState.pElements.length === 0) {
        messageContent.innerHTML = "";
        messageData.forEach(function (text) {
            var p = document.createElement("p");
            messageContent.appendChild(p);
            typingState.pElements.push(p);
        });
    }

    typingState.isPaused = false;

    function typeNextLine() {
        if (typingState.isPaused) return;

        if (typingState.currentLine < typingState.pElements.length) {
            var currentLine = typingState.currentLine;
            var element = typingState.pElements[currentLine];
            var text = messageData[currentLine];

            // Calculate progress
            const progress = (currentLine + 1) / typingState.pElements.length;
            if (progress >= 0.5 && !typingState.hasPreloaded) {
                typingState.hasPreloaded = true;
                if (typeof window.preloadSnowScene === 'function') {
                    window.preloadSnowScene();
                }
            }

            scrollToElement(element);

            typeTextWithGSAP(
                element,
                text,
                currentLine,
                function () {
                    typingState.currentLine++;
                    if (!typingState.isPaused) {
                        setTimeout(typeNextLine, 300);
                    }
                }
            );
        }
    }

    typeNextLine();
}

// Hàm dừng typing
function pauseTyping() {
    typingState.isPaused = true;
    // Pause tất cả timelines
    typingState.timelines.forEach(function (tl) {
        if (tl) tl.pause();
    });
}

// Hàm resume typing
function resumeTyping() {
    typingState.isPaused = false;
    // Resume tất cả timelines đang paused
    typingState.timelines.forEach(function (tl) {
        if (tl && tl.paused() && tl.progress() < 1) {
            tl.play();
        }
    });

    // Nếu có dòng chưa bắt đầu, tiếp tục typing
    if (typingState.currentLine < typingState.pElements.length) {
        var currentLine = typingState.currentLine;
        var element = typingState.pElements[currentLine];
        var text = messageData[currentLine];

        // Kiểm tra xem dòng này đã có timeline chưa
        if (!typingState.timelines[currentLine] || typingState.timelines[currentLine].progress() === 1) {
            // Nếu chưa có hoặc đã hoàn thành, tiếp tục dòng tiếp theo
            function typeNextLine() {
                if (typingState.isPaused) return;

                if (typingState.currentLine < typingState.pElements.length) {
                    var currentLine = typingState.currentLine;
                    var element = typingState.pElements[currentLine];
                    var text = messageData[currentLine];

                    scrollToElement(element);

                    typeTextWithGSAP(
                        element,
                        text,
                        currentLine,
                        function () {
                            typingState.currentLine++;
                            if (!typingState.isPaused) {
                                setTimeout(typeNextLine, 300);
                            }
                        }
                    );
                }
            }

            typeNextLine();
        }
    }
}

// Initialize book
document.addEventListener("DOMContentLoaded", function () {
    var guideInfo = document.getElementById("guideInfo");
    var messageContent = document.getElementById("messageContent");
    var card = document.querySelector(".card");

    if (!guideInfo || !card) return;

    // Create empty p tags theo dữ liệu hiện tại (API nếu đã có)
    if (messageContent) {
        const messageData = getMessageDataFromApi();
        messageData.forEach(function () {
            var p = document.createElement("p");
            messageContent.appendChild(p);
        });
    }

    // Watch for book visibility changes
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (
                mutation.type === "attributes" &&
                mutation.attributeName === "class"
            ) {
                var hasHidden = guideInfo.classList.contains("hidden");

                if (hasHidden) {
                    // Reset when book is fully closed
                    // Kill all timelines
                    typingState.timelines.forEach(function (tl) {
                        if (tl) tl.kill();
                    });
                    typingState.currentLine = 0;
                    typingState.pElements = [];
                    typingState.timelines = [];
                    typingState.isPaused = false;
                    card.classList.remove("book-opened");
                    if (messageContent) {
                        messageContent.innerHTML = "";
                        messageData.forEach(function () {
                            var p = document.createElement("p");
                            messageContent.appendChild(p);
                        });
                    }
                }
            }
        });
    });

    observer.observe(guideInfo, {
        attributes: true,
        attributeFilter: ["class"]
    });

    // Click to toggle book state separate from closing
    card.addEventListener("click", function (e) {
        if (!guideInfo.classList.contains("show") || guideInfo.classList.contains("hidden")) return;

        // Check if currently opened
        const isOpened = card.classList.contains("book-opened");

        if (isOpened) {
            // Close it -> This now ACTS as starting the scene
            // card.classList.remove("book-opened"); // Animation close (optional, maybe keep it open while fading out?)
            // pauseTyping();

            // Activate the scene transition
            if (typeof window.activateSnowScene === 'function') {
                window.activateSnowScene();
            }
        } else {
            // Open it
            card.classList.add("book-opened");
            if (typingState.timelines.length === 0 || typingState.currentLine === 0) {
                startTypingEffect();
            } else {
                resumeTyping();
            }
        }
    });

    // Đã bỏ nút đóng (X), việc đóng sách sẽ do logic khác điều khiển
});