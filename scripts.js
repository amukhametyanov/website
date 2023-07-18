document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('.sticky-header');
  
    // dynamically calculates the submenu's height
    function setMenuHeight() {
      if (navMenu.classList.contains('show')) {
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
      } else {
        navMenu.style.maxHeight = '0';
      }
    }

    function closeMenu() {
        mobileMenuButton.classList.remove('active');
        navMenu.classList.remove('show');
        setMenuHeight();
      }
  
    mobileMenuButton.addEventListener('click', function () {
      mobileMenuButton.classList.toggle('active');
      navMenu.classList.toggle('show');
      setMenuHeight();
    });

    document.addEventListener('click', function (event) {
        if (!header.contains(event.target) && !mobileMenuButton.contains(event.target)) {
          closeMenu();
        }
      });
  
    // Set initial max-height based on the current state of the menu
    setMenuHeight();

    // animate category names, when user scrolls to them
    var observer = new IntersectionObserver(function(entries) {
      // Loop over the entries
      entries.forEach(function(entry) {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          // Add the showUp class
          // entry.target.classList.add('showsUp');
          // Add the animate__bounceInRight class
          entry.target.classList.add('animate__bounceInRight');

          // Select the sibling span element
          var textElement = entry.target.parentElement.previousElementSibling;
          // Add the squeeze-animation class
          textElement.classList.add('squeeze-animation');

          

          // Unobserve the element
          observer.unobserve(entry.target);
        }
      });
    });
  
    // Start observing an element
    observer.observe(document.querySelector('.fa-sharp'));
    observer.observe(document.querySelector('.fa-envelopes-bulk'));
    observer.observe(document.querySelector('.fa-lightbulb-o'));
  });
  