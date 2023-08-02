document.addEventListener('DOMContentLoaded', function () {
    // menu related code --start
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
      // Remove the document-level click event listener when the menu is closed
      document.removeEventListener('click', documentClickListener);
    }

    function documentClickListener(event) {
      if (!header.contains(event.target) && !mobileMenuButton.contains(event.target)) {
        closeMenu();
      }
    }

    mobileMenuButton.addEventListener('click', function () {
      mobileMenuButton.classList.toggle('active');
      navMenu.classList.toggle('show');
      setMenuHeight();
      // Add the document-level click event listener when the menu is expanded
      if (navMenu.classList.contains('show')) {
        document.addEventListener('click', documentClickListener);
      } else {
        document.removeEventListener('click', documentClickListener);
      }
    });

    // Set initial max-height based on the current state of the menu
    setMenuHeight();

    // menu related code --end

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



  }); // end of DOMContentLoaded


  // code that switches between pressed tabs and their content
    const tabs = document.getElementsByClassName("tabcontent");
    const tabButtons = document.getElementsByClassName("tab");
    
    function changeTab(n, el) {
      // first get the current tab
      let oldTab = document.querySelector('.tab.active');

        for(var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
            tabButtons[i].classList.remove("active");
        }
        tabs[n].classList.add("active");
        el.classList.add("active");

        
        moveIndicator(oldTab, el);
    }


    // move underline indicator
    function moveIndicator(oldTab, newTab) {
      let tabsContainer = document.querySelector('.tabs'); // Select the container
      const newTabPosition = oldTab.compareDocumentPosition(newTab);
      
      const newTabWidth = newTab.offsetWidth / tabsContainer.offsetWidth;
      let transitionWidth;

      // if the new tab is to the right
      if(newTabPosition === 4) {
        transitionWidth = newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
      } else {
        // if the tab is to the left
        transitionWidth = oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;
        tabsContainer.style.setProperty('--_left', newTab.offsetLeft + "px");
      }
      
      
      tabsContainer.style.setProperty('--_width', transitionWidth / tabsContainer.offsetWidth);

      setTimeout(() => {
        tabsContainer.style.setProperty('--_left', newTab.offsetLeft + "px");
        tabsContainer.style.setProperty('--_width', newTabWidth);
      }, 240);
    }

    // Update the indicator when the window is resized
    function updateIndicator(newTab) {
      let tabsContainer = document.querySelector('.tabs'); // Select the container
      const newTabWidth = newTab.offsetWidth / tabsContainer.offsetWidth;
      tabsContainer.style.setProperty('--_left', newTab.offsetLeft + "px");
      tabsContainer.style.setProperty('--_width', newTabWidth);
    }

    // make sure that 'resize' fires only if the current width has crossed the 576px threshold in either direction
    let previousWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth;

      // Check if the window width has crossed the 576px threshold
      if ((previousWidth < 576 && currentWidth >= 576) || (previousWidth >= 576 && currentWidth < 576)) {
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
          updateIndicator(activeTab);
        }
        console.log('resize fired');
      }

      previousWidth = currentWidth; // Update the previous width for the next resize event
    });
   // code that switches between pressed tabs and their content
  

  // swiperJS
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 15
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });