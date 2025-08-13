// Our Mission, How We Recycle, and Our Impact page JS

// Toggle sidebar and hamburger icon
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const hero = document.querySelector('.hero');
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    if (hero) {
        hero.classList.toggle('shifted');
    }
    if (menuToggle.textContent === '☰') {
        menuToggle.textContent = '✕';
    } else {
        menuToggle.textContent = '☰';
    }
});

// Dropdown inside sidebar
document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('active');
    });
});

// Bubbles Animation for Our Mission Hero
const bubblesCanvas = document.getElementById('bubbles-canvas');
if (bubblesCanvas) {
    const ctx = bubblesCanvas.getContext('2d');

    function resizeCanvas() {
        bubblesCanvas.width = window.innerWidth;
        bubblesCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const bubbles = [];
    const bubbleCount = 30;

    for (let i = 0; i < bubbleCount; i++) {
        bubbles.push({
            x: Math.random() * bubblesCanvas.width,
            y: Math.random() * bubblesCanvas.height,
            radius: 5 + Math.random() * 10,
            speed: 0.5 + Math.random() * 1,
            opacity: 0.2 + Math.random() * 0.4
        });
    }

    function drawBubbles() {
        ctx.clearRect(0, 0, bubblesCanvas.width, bubblesCanvas.height);
        bubbles.forEach(bubble => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(58, 156, 93, ${bubble.opacity})`;
            ctx.fill();

            bubble.y -= bubble.speed;
            if (bubble.y + bubble.radius < 0) {
                bubble.y = bubblesCanvas.height + bubble.radius;
                bubble.x = Math.random() * bubblesCanvas.width;
            }
        });
        requestAnimationFrame(drawBubbles);
    }
    drawBubbles();
}

// Filter Buttons

const timelineFilterButtons = document.querySelectorAll('.filter-buttons button');
const timelineItems = document.querySelectorAll('.timeline-container');

timelineFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        timelineItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        AOS.refresh();
    });
});

// FAQ

var acc = document.getElementsByClassName('faq-btn');
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    })
}

// Image Slider

let slides = document.querySelectorAll(".slide");
let currentIndex = 0;

document.querySelector(".next").onclick = () => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
};
document.querySelector(".prev").onclick = () => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
};