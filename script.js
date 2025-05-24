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
    }, 3000);

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