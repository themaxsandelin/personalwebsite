document.addEventListener('DOMContentLoaded', () => {
  // Loop through all menu items and add click event listeners.
  const menuItems = document.querySelectorAll('header .menu li');
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', (e) => {
      const id = e.target.innerText.toLowerCase();
      Velocity(document.getElementById(id), 'scroll', 600);
    });
  }
});

window.addEventListener('load', () => {
  // Add a simple class to body to animate in all content.
  document.body.classList.add('show');
});