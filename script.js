const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-item").forEach(n => n.addEventListener('click',()=> {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}))

document.addEventListener('DOMContentLoaded', () => {
const splashScreen = document.getElementById('splashScreen');

// Check if the splash screen has already been shown in this session
if (!sessionStorage.getItem('splashShown')) {
    // Show the splash screen
    splashScreen.style.display = 'flex';

    // Hide the splash screen after 3 seconds
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
    }, 1500);

    // Allow user to skip the splash screen by clicking
    splashScreen.addEventListener('click', () => {
        splashScreen.classList.add('fade-out');
    });

    // Mark the splash screen as shown in this session
    sessionStorage.setItem('splashShown', 'true');
} else {
    // If already shown, hide the splash screen immediately
    splashScreen.style.display = 'none';
}

// When the fade-out animation ends, hide the splash screen completely
splashScreen.addEventListener('animationend', () => {
    splashScreen.style.display = 'none';
});
});

document.addEventListener('DOMContentLoaded', () => {
    const videoIds = [
    'YdDC0tgyaO4',
    'A2ftOrGXFyk',
    'yAB3HhbIH-w',
    'vQZfiYDbcFc',
    'UyPZRryen6w',
    'f5Z0Q0OmhpA',
    'jGraygBXSCA',
    'YxPaAoZWqI4',
    'OgTm3Xbo360',
    'Jo4PmeHTyZM',
    's4cPJ2DMsoE',
    '8AGYt365SIY',
    'mmvzJ5L-CRk',
    '936wb3Rpl3g',
    'uxQK2YqkZps',
    'njS_qzVJ818',
    'rxdlMnWPIHo',
    'b84vHQP8cqg',
    'CK1ILjr6Bcg',
    'mUnGKCnPrpo',
    'mdimMgVD1tM',
    'kccfw6Oly8U',
    'iepc31I3YN0',
    'XKM9ung-icg',
    '2-pf7DBfbQY',
    'ewaU9wDX72U',
    '2eZFBH3UGo8',
    '2eI1VrmXHOc',
    'gL_tskk6aCI',
    'q99TsulEDGM'
    ];
  const track = document.querySelector('.carousel-track');
  const nextButton = document.querySelector('.right-btn');
  const prevButton = document.querySelector('.left-btn');
  let currentIndex = 0;
  let autoScrollInterval;

  // Function to generate carousel items from video IDs
  const generateCarouselItems = (videoIds) => {
    videoIds.forEach((videoId) => {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      item.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?showinfo=0" 
          title="Lights Out Reel" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      `;
      track.appendChild(item);
    });
  };

  // Generate initial items
  generateCarouselItems(videoIds);

  // Clone first and last items for infinite loop
  const items = Array.from(track.children);
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, items[0]);

  // Function to calculate item width dynamically
  const getItemWidth = () => {
    return items[0].getBoundingClientRect().width + 20; // Width + total margin (10px left + 10px right)
  };

  // Update track position
  const moveToIndex = (index) => {
    const itemWidth = getItemWidth();
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`; // +1 for last clone
  };

  // Reset for infinite loop
  const resetInfinite = () => {
    const itemWidth = getItemWidth();
    track.style.transition = 'none';
    if (currentIndex === items.length) {
      currentIndex = 0;
      track.style.transform = `translateX(-${itemWidth}px)`;
    } else if (currentIndex === -1) {
      currentIndex = items.length - 1;
      track.style.transform = `translateX(-${(items.length) * itemWidth}px)`;
    }
  };

  // Initial position
  moveToIndex(currentIndex);

  nextButton.addEventListener('click', () => {
    currentIndex++;
    moveToIndex(currentIndex);
    if (currentIndex === items.length) {
      setTimeout(resetInfinite, 500);
    }
  });

  prevButton.addEventListener('click', () => {
    currentIndex--;
    moveToIndex(currentIndex);
    if (currentIndex === -1) {
      setTimeout(resetInfinite, 500);
    }
  });

  // Auto-scroll every 3 seconds
  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      currentIndex++;
      moveToIndex(currentIndex);
      if (currentIndex === items.length) {
        setTimeout(resetInfinite, 500);
      }
    }, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  startAutoScroll();

  // Pause on hover
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);

  // Basic touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoScroll();
  });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      currentIndex++;
      moveToIndex(currentIndex);
      if (currentIndex === items.length) {
        setTimeout(resetInfinite, 500);
      }
    } else if (touchEndX - touchStartX > 50) {
      currentIndex--;
      moveToIndex(currentIndex);
      if (currentIndex === -1) {
        setTimeout(resetInfinite, 500);
      }
    }
    startAutoScroll();
  });

  // Recalculate on window resize for responsiveness
  window.addEventListener('resize', () => {
    moveToIndex(currentIndex);
  });
});
