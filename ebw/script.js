// Get the theme toggle checkbox
const themeSwitch = document.getElementById('themeSwitch');

// Check the current theme in localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeSwitch.checked = true;
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeSwitch.checked = false;
}

// Toggle the theme on switch change
themeSwitch.addEventListener('change', function() {
  if (themeSwitch.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});
