
 
document.addEventListener("DOMContentLoaded", function () {



    document.body.classList.add("loaded")
    // Creating a MediaQueryList object for the media query
    const mq = window.matchMedia('(min-width: 991px)');
    const mmq = window.matchMedia('(max-width: 991px)');

    const hamburgerButton = document.querySelector('.header__hamburger');
    const aside = document.querySelector('.aside');

    hamburgerButton.addEventListener('click', () => {
        aside.classList.toggle('active');
        hamburgerButton.classList.toggle("active")
    });

    const headerBody = document.querySelector(".header__body")
    const headerInput = document.querySelector(".search__input")
    const searchList = document.querySelector(".search-list")

    headerInput.addEventListener('focus', () => {
        headerBody?.classList.add("active")
        // searchList?.classList.add("active")
        document.body.classList.add("darken")
    });

    headerInput.addEventListener('blur', () => {
        headerBody?.classList.remove("active")
        // searchList?.classList.remove("active")
        document.body.classList.remove("darken")
    });

    // Function to remove classes on matching media query
    function removeClassesOnSmallScreen(mq) {
        if (mq.matches) {
            aside.classList?.remove('active');
            hamburgerButton?.classList.remove("active");
            headerBody?.classList.remove("active");
            // searchList?.classList.remove("active");
        }
        if (mmq.matches) {
            document.body.classList.remove("darken")
        }
    }

    // Calling the function for the current media query state
    removeClassesOnSmallScreen(mq);

    // Adding event listener for media query state change
    mq.addListener(removeClassesOnSmallScreen);

    // Getting form elements
    const loginForm = document.querySelector('.login');
    const loginInputs = loginForm ? loginForm.querySelectorAll('.login__input') : [];

    // Adding event listener for form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Preventing form submission
            let isValid = true; // Flag to track form validity

            // Checking each input field
            loginInputs.forEach(function (input) {
                if (!input.validity.valid) { // If the field is invalid
                    isValid = false; // Set the flag to false
                    input.classList.add('invalid'); // Adding a class for styling
                } else {
                    input.classList.remove('invalid'); // Remove the class if the field is valid
                }
            });

            // If the form is valid, data can be submitted or other actions can be performed
            if (isValid) {
                console.log('Form is valid, data can be submitted');
                // Submission of data or other actions can be performed here
            }
        });
    }

    // Adding event listener for input value changes
    loginInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            this.classList.remove('invalid'); // Removing the class on value change
        });
    });

    // Adding event listener for password visibility
    const passwordInput = loginForm ? loginForm.querySelector('[type="password"]') : null;
    const eye = document.querySelector(".input__eye");

    // Adding event listener for password visibility toggle
    if (passwordInput && eye) {
        eye.addEventListener('click', function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text'; // Show password
            } else {
                passwordInput.type = 'password'; // Hide password
            }
        });
    }
});
