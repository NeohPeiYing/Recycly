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

// GSAP
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
document.head.appendChild(script);

// Floating Leaves Animation
const canvas = document.getElementById('background-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const header = document.querySelector('.hero');
    canvas.width = header ? header.clientWidth : window.innerWidth;
    canvas.height = header ? header.clientHeight : 200;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let leaves = [];
  const leafCount = 30;

  for (let i = 0; i < leafCount; i++) {
    leaves.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 15 + Math.random() * 25,
      speed: 0.3 + Math.random() * 0.5,
      sway: 1 + Math.random() * 1.5,
      rotation: Math.random() * 2 * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      opacity: 0.3 + Math.random() * 0.5
    });
  }

  function drawLeaf(x, y, size, rotation, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size / 2, -size / 2, 0, -size);
    ctx.quadraticCurveTo(-size / 2, -size / 2, 0, 0);
    ctx.fillStyle = 'rgb(56, 111, 22)';
    ctx.fill();
    ctx.restore();
  }

  function drawLeaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    leaves.forEach(leaf => {
      drawLeaf(leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.opacity);

      leaf.y += leaf.speed;
      leaf.x += Math.sin(leaf.y * 0.02) * leaf.sway * 0.3;
      leaf.rotation += leaf.rotationSpeed;

      if (leaf.y > canvas.height + leaf.size) {
        leaf.y = -leaf.size;
        leaf.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawLeaves);
  }

  drawLeaves();
}

// Micro-interactions for r-card, intro-card, fact-card icons
window.addEventListener('load', () => {
    const hoverScaleElements = document.querySelectorAll('.r-icon, .intro-icon, .fact-icon');

    hoverScaleElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, { scale: 1.2, rotate: 10, duration: 0.4, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { scale: 1, rotate: 0, duration: 0.4, ease: 'power2.out' });
        });
    });

    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, boxShadow: '0 0 20px rgba(50, 130, 80, 0.5)', duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', duration: 0.3 });
        });
    });
});

// GSAP Animation for hero section

window.addEventListener('load', () => {
  // Hero text animation
  gsap.from('.hero h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });
  
  gsap.from('.hero p', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
  });
  
  gsap.from('.cta-button', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
  });
});

// 3D Card for R's Section

document.querySelectorAll('.r-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        gsap.to(card, {
            rotationX: angleX,
            rotationY: angleY,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Bubbles Animation for Facts Section
const bubblesCanvas = document.getElementById('bubbles-canvas');
if (bubblesCanvas) {
    const bubblesCtx = bubblesCanvas.getContext('2d');

    function resizeBubblesCanvas() {
        const factsSection = document.querySelector('.recycling-facts');
        bubblesCanvas.width = factsSection.clientWidth;
        bubblesCanvas.height = factsSection.clientHeight;
    }
    resizeBubblesCanvas();
    window.addEventListener('resize', resizeBubblesCanvas);

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
        bubblesCtx.clearRect(0, 0, bubblesCanvas.width, bubblesCanvas.height);
        bubbles.forEach(bubble => {
            bubblesCtx.beginPath();
            bubblesCtx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            bubblesCtx.fillStyle = `rgba(50, 130, 80, ${bubble.opacity})`;
            bubblesCtx.fill();

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

// Green test 

function calculate() {
  const transport = document.getElementById('transport').value;
  const container = document.getElementById('container').value;
  const recycle = document.getElementById('recycle').value;
  const electricity = document.getElementById('electricity').value;
  const plastic = document.getElementById('plastic').value;

  if (
    transport === "" ||
    container === "" ||
    recycle === "" ||
    electricity === "" ||
    plastic === ""
  ) {
    document.getElementById('result').innerHTML = `
      <strong>Your score is:</strong> ❓ (Unanswered questions)<br><br>
      Please answer all the questions above to see your Green Level.
    `;
    return;
  }

  const total =
    parseInt(transport) +
    parseInt(container) +
    parseInt(recycle) +
    parseInt(electricity) +
    parseInt(plastic);

  let level = "";
  let message = "";
  let page = "";

  if (total <= 4) {
    level = "🟢 Low Level";
    message = "Amazing! You're very eco-friendly!";
    page = "suggest-low.html";
  } else if (total <= 9) {
    level = "🟡 Medium Level";
    message = "You're doing well, but there's still room to improve!";
    page = "suggest-medium.html";
  } else {
    level = "🔴 High Level";
    message = "You can start making small eco-friendly changes today!";
    page = "suggest-high.html";
  }

  const result = document.getElementById('result');
  result.innerHTML = `
  <div style="line-height: 1.6;">
    <strong>Your score is:</strong> ${total} (${level})
  </div>
  <p style="margin-top: 0.6rem;">${message}</p>
  <div style="margin-top: 0.5rem;">
    <button id="suggestBtn" class="learn-more-button" style="padding: 0.6rem 1.4rem; border-radius: 8px;">
      View Suggestions
    </button>
  </div>
`;

  document.getElementById("suggestBtn").addEventListener("click", () => {
    window.location.href = page;
  });
}

window.addEventListener('load', () => {
  const transportDropdown = document.getElementById('transport');
  const containerDropdown = document.getElementById('container');
  const recycleDropdown = document.getElementById('recycle');
  const electricityDropdown = document.getElementById('electricity');
  const plasticDropDown = document.getElementById('plastic');

  new Choices(transportDropdown, { searchEnabled: false, itemSelectText: '' });
  new Choices(containerDropdown, { searchEnabled: false, itemSelectText: '' });
  new Choices(recycleDropdown, { searchEnabled: false, itemSelectText: '' });
  new Choices(electricityDropdown, { searchEnabled: false, itemSelectText: '' });
  new Choices(plasticDropDown, { searchEnabled: false, itemSelectText: ''});
});

function loadPage(page) {
  fetch(page)
    .then(res => res.text())
    .then(html => document.getElementById("main").innerHTML = html);
}

// Search bar

const input = document.getElementById('searchInput');

input.addEventListener('input', function() {
  const searchText = input.value.toLowerCase();
  const cards = document.querySelectorAll('.explore-card');

cards.forEach(function(card) {
  const title = card.querySelector('h2').innerText.toLowerCase();
  if (title.includes(searchText)) {
    card.style.display = '';
  } else {
    card.style.display = 'none';
  }
});
});

// FAQ page

function toFAQ() {
  const selected = document.getElementById('question-select');
  const prompt = document.getElementById('question-prompt');

  if (!selected.value) {
    prompt.style.color = "#48b46d";
    prompt.style.font.weight = "600";
    prompt.style.marginTop = "1rem";
    prompt.style.display = "block";
    return
  } else {
    prompt.style.display = "none";
  }

  const selectedValue = selected.value;
  window.location.href = `About Pages/faq.html#${selected}`;
}

// Quiz

function checkQuiz() {
  const answers = {
    q1: "a",
    q2: "b",
    q3: "c",
    q4: "c",
    q5: "b",
    q6: "a",
    q7: "a",
    q8: "b",
    q9: "b",
    q10: "b"
  };
  let correctCount = 0;

  Object.keys(answers).forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    document.querySelectorAll(`input[name="${q}"]`).forEach(input => {
      input.parentElement.style.fontWeight = "normal";
      input.parentElement.style.color = "#333";
    });
    if (selected) {
      if (selected.value === answers[q]) {
        selected.parentElement.style.color = "green";
        selected.parentElement.style.fontWeight = "bold";
        correctCount++;
      } else {
        selected.parentElement.style.color = "red";
        selected.parentElement.style.fontWeight = "bold";
      }
    }
  });

  const resultDiv = document.getElementById('quizResult');
  resultDiv.textContent = `You got ${correctCount} correct out of 10!`;

  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.disabled = true;
  });

  document.getElementById('submitBtn').style.display = 'none';
  document.getElementById('restartBtn').style.display = 'inline-block';
}


// Restart Quiz
function restartQuiz() {
  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.checked = false;
    input.disabled = false;
    input.parentElement.style.color = "#333";
    input.parentElement.style.fontWeight = "normal";
  });

  document.getElementById('quizResult').textContent = '';

  document.getElementById('submitBtn').style.display = 'inline-block';
  document.getElementById('restartBtn').style.display = 'none';
}

// toggle steps
function toggleSteps(id) {
  const steps = document.getElementById(id);
  if (steps) {
    steps.classList.toggle('hidden');
  }
}

// Diy search bar
window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    const diyCards = document.querySelectorAll('.diy-card');

    diyCards.forEach(card => {
      const titleElement = card.querySelector('h2') || card.querySelector('h3');
      const title = titleElement?.innerText.toLowerCase() || '';
      
      if (title.includes(searchText)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchForm").addEventListener("submit", e => e.preventDefault());

  const ideas = [
    "Tin Can Organizer",
    "T-Shirt Tote Bag",
    "Plastic Bottle Planter",
    "Jar Latern",
    "CD Mosaic Art",
    "Jar Snow Globe",
    "Paper Roll Phone Stand",
    "Egg Carton Flowers",
    "Cereal Box Drawer Organizer",
    "Mini Garden in Plastic Bottles",
    "Bottle Cap Magnets",
    "Light Bulb Terrarium"
  ];

  const input = document.getElementById("searchInput");
  const box = document.getElementById("suggestions");
  const cards = document.querySelectorAll(".diy-card");

  input.addEventListener("input", () => {
    const val = input.value.toLowerCase();
    box.innerHTML = "";

    if (val === "") {
      box.style.display = "none";
      cards.forEach(c => c.style.display = "");
      return;
    }

    const results = ideas.filter(i => i.toLowerCase().includes(val));
    if (results.length === 0) { box.style.display = "none"; return; }

    results.forEach(r => {
      const div = document.createElement("div");
      div.textContent = r;
      div.classList.add("suggestion-item");
      div.onclick = () => {
        input.value = r;
        box.style.display = "none";
        cards.forEach(c => {
          const title = c.querySelector("h3").innerText.toLowerCase();
          c.style.display = title.includes(r.toLowerCase()) ? "" : "none";
        });
      };
      box.appendChild(div);
    });

    box.style.display = "block";
  });
});
