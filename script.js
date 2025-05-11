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
  const form = document.getElementById('beta-signup-form');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(form);
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLScIIKMnT2VUa49RoT-jtifhPu2A17LGZ6ydFGrxssvqEM9QGQ/formResponse';
    
    try {
      await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Forms
      });
      // Redirect to thank-you page
      window.location.href = 'confirmation.html';
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  });
});