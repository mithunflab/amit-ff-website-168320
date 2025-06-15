<think>
Okay, I need to create a production-ready app.js file for the Garena Free Fire TH website based on the user's requirements. Let me break down what needs to be done.

First, the user wants a modern, professional website with a responsive layout and interactive features. So, I should focus on using modern JavaScript practices, ensuring the code is clean and well-structured.

I'll start by setting up strict mode to enforce better code practices. Then, I'll define a namespace for the project to keep things organized and avoid naming conflicts.

Next, I need to implement smooth scrolling for anchor links. This enhances user experience by making navigation feel more polished. I'll add an event listener to all anchor links and prevent the default behavior while using scrollIntoView for smooth scrolling.

A mobile menu toggle is essential for responsive design. I'll create a function to handle toggling the menu when the hamburger icon is clicked. Using ARIA roles and attributes will ensure accessibility, so I'll update the aria-expanded attribute accordingly.

For animations, I'll use the Intersection Observer API to animate elements as they come into view. This is more efficient than using scroll events. I'll set up an observer to add an 'animate' class to elements with the 'animate-on-scroll' class when they're visible.

Lazy loading images will improve page load times. I'll create an observer that loads images as they enter the viewport, replacing the src with the data-src attribute. This ensures images are only loaded when needed.

Scrolling parallax effects can add visual interest. I'll use a scroll event listener to adjust the position of elements with the 'parallax' class, creating a subtle effect without overdoing it.

Accessibility is crucial, so I'll add keyboard navigation for the mobile menu. This ensures that users can navigate using just a keyboard, which is important for accessibility.

Handling errors is important, so I'll add an event listener for uncaught exceptions and promise rejections. Logging these errors will help with debugging and improving the user experience.

Finally, I'll initialize all these components on page load to ensure everything works smoothly. I'll make sure the code is well-commented and follows best practices for readability and maintainability.

I think that covers all the necessary features and requirements. Now, I'll structure the code accordingly, ensuring each part is modular and easy to understand.
</think>

```javascript
'use strict';

// Namespace for the application
const GFFTH = {
  // Initialize the application
  init() {
    GFFTH.Navigation.init();
    GFFTH.Animations.init();
    GFFTH.LazyLoader.init();
    GFFTH.Parrallax.init();
    GFFTH.Accessibility.init();
    GFFTH.ErrorHandler.init();
  },

  // Navigation module
  Navigation: {
    init() {
      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Mobile menu toggle
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
          this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
          );
          document.getElementById('mobile-menu').classList.toggle('active');
        });
      }
    }
  },

  // Animations module
  Animations: {
    init() {
      // Animate elements on scroll
      const observerOptions = {
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
      });
    }
  },

  // Lazy loading module
  LazyLoader: {
    init() {
      const observerOptions = {
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, observerOptions);

      document.querySelectorAll('img.lazy').forEach(img => {
        observer.observe(img);
      });
    }
  },

  // Parallax effect module
  Parrallax: {
    init() {
      const parallaxElements = document.querySelectorAll('.parallax');
      
      window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
          const parallaxSpeed = element.dataset.parallaxSpeed || 0.5;
          const offset = window.pageYOffset * parallaxSpeed;
          element.style.transform = `translateY(${offset}px)`;
        });
      });
    }
  },

  // Accessibility module
  Accessibility: {
    init() {
      // Add keyboard navigation for mobile menu
      document.getElementById('mobile-menu').addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.getElementById('mobile-menu-toggle').click();
        }
      });

      // Ensure all interactive elements are accessible
      const interactiveElements = document.querySelectorAll('button, [role="button"]');
      interactiveElements.forEach(element => {
        element.setAttribute('role', 'button');
        if (!element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', element.textContent);
        }
      });
    }
  },

  // Error handling module
  ErrorHandler: {
    init() {
      // Global error handler
      window.addEventListener('error', (e) => {
        GFFTH.ErrorHandler.handleError(e);
      });

      // Promise rejection handler
      window.addEventListener('unhandledrejection', (e) => {
        GFFTH.ErrorHandler.handleError(e);
      });
    },

    handleError(error) {
      console.error('Application Error:', error);
      // Implement your error handling logic here
    }
  }
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  GFFTH.init();
});
```