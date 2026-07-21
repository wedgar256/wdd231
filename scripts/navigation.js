const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
  });

  const navLinks = document.querySelectorAll('.navigation a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.classList.remove('open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navigation.classList.remove('open');
      menuButton.classList.remove('open');
    }
  });
}
