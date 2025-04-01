const switcher = document.getElementById('companySwitcherSelect');
const companyNameElement = document.getElementById('companyName');

// Function to update company name
switcher.addEventListener('change', function () {
    const selectedCompany = switcher.value;
    companyNameElement.innerHTML = `<b>${selectedCompany}</b>`;
});

const searchInput = document.querySelector('.input');

// Get all the menu items
const menuItems = document.querySelectorAll('.menu-item');

// Add an event listener to detect input changes
searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();

    menuItems.forEach(item => {
        // Get the text of each menu item
        const menuItemText = item.textContent.toLowerCase();

        // Check if the item starts with the typed letters
        if (menuItemText.startsWith(searchValue)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

// Get all navbar items
const navItems = document.querySelectorAll('.navv');

// Function to handle the click event
function handleNavClick(event) {
  // Remove 'l1' class from all items
  navItems.forEach(item => {
    item.classList.remove('l1');
  });

  // Add 'l1' class to the clicked item
  event.currentTarget.classList.add('l1');
}

// Attach event listener to each navbar item
navItems.forEach(item => {
  item.addEventListener('click', handleNavClick);
});


const menuItems1 = document.querySelectorAll('.menu-item');

menuItems1.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all menu items
        menuItems1.forEach(i => i.classList.remove('active'));
        
        // Add 'active' class to the clicked item
        item.classList.add('active');
    });
});
