document.addEventListener('DOMContentLoaded', () => {
    console.log('Burger Bár oldal betöltve');
    
    // Mobile menu toggle logic will go here
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
