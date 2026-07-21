const currentYear = document.querySelector('#currentyear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector('#lastModified');
if (lastModified) {
  lastModified.textContent = document.lastModified;
}
