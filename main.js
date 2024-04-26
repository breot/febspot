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
        searchList?.classList.add("active")
        document.body.classList.add("darken")
    });

    headerInput.addEventListener('blur', () => {
        headerBody?.classList.remove("active")
        searchList?.classList.remove("active")
        document.body.classList.remove("darken")
    });

    // Function to remove classes on matching media query
    function removeClassesOnSmallScreen(mq) {
        if (mq.matches) {
            aside.classList?.remove('active');
            hamburgerButton?.classList.remove("active");
            headerBody?.classList.remove("active");
            searchList?.classList.remove("active");
        }
        if (mmq.matches) {
            document.body.classList.remove("darken")
        }
    }

    // Calling the function for the current media query state
    removeClassesOnSmallScreen(mq);

    // Adding event listener for media query state change
    mq.addListener(removeClassesOnSmallScreen);

    // interaction code

    var links = document.querySelectorAll('.interaction__link');

    // Check if there are any links with the specified class
    if (links.length > 0) {
        links.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // prevent default link behavior

                // Check if the clicked link is not already active
                if (!this.classList.contains('active')) {
                    // Check if there's an element with the 'active' class
                    var activeLink = document.querySelector('.interaction__link.active');

                    // If there's an active link, remove the 'active' class from it
                    if (activeLink) {
                        activeLink.classList.remove('active');
                    }

                    // Add the 'active' class to the clicked link
                    this.classList.add('active');
                }
            });
        });
    }

    // interaction code end



    // Function to resize textarea
    function resize() {
        var el = this;
        setTimeout(function () {
            // Resetting styles to default values
            // Setting textarea height based on content height
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 1);
    }

    // progress code 

    const previewElements = document.querySelectorAll(".preview");
    previewElements?.forEach(previewElement => {
        const progressBar = previewElement.querySelector(".preview__bar");
        const progressBarFill = previewElement.querySelector(".preview__fill");

        if (progressBar && progressBarFill) {
            // Getting view data from the current preview
            const currentViews = parseInt(progressBar.getAttribute("data-current"));
            const totalViews = parseInt(progressBar.getAttribute("data-total"));

            if (!isNaN(currentViews) && !isNaN(totalViews) && totalViews !== 0) {
                // Calculating the fill percentage of the progress bar
                const fillPercentage = (currentViews / totalViews) * 100;
                // Setting the width of the progress bar fill
                progressBarFill.style.width = fillPercentage + "%";
            } else {
                console.error("Error: Invalid view data in preview element.");
            }
        } else {
            console.error("Error: Progress bar elements not found in preview element.");
        }
    });
    // progress code  end

    // Getting all elements with class "preview"
    const previews = document.querySelectorAll('.preview');

    // Iterating over each element
    previews?.forEach(function (preview) {
        // Finding the "preview__info" element inside the current "preview" element
        const previewInfo = preview.querySelector('.preview__title');

        // Finding the link inside "preview__info"
        const link = previewInfo.getAttribute('href');

        // Finding the "Copy link" button inside the current "preview" element
        const copyLinkButton = preview.querySelector('.share__action:nth-child(1)');

        // Adding event listener for click on "Copy link" button
        copyLinkButton.addEventListener('click', function () {
            // Copying the link to the clipboard
            navigator.clipboard.writeText(link)
                .then(function () {
                    console.log('Link copied successfully:', link);
                })
                .catch(function (error) {
                    console.error('Error copying link:', error);
                });
        });
    });


    // Function to check if the top of an element is in viewport
    function isTopInViewport(element) {
        var rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
    }

    // Function to check if the bottom of an element is in viewport
    function isBottomInViewport(element) {
        var rect = element.getBoundingClientRect();
        return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
    }

    // Function to lazy load videos
    function lazyLoadVideos() {
        var lazyVideos = document.querySelectorAll('.lazy');
        lazyVideos?.forEach(function (video) {
            if (isTopInViewport(video) || isBottomInViewport(video)) {
                // Load the video by setting its src attribute
                video.src = video.getAttribute('data-src');
                // Remove the 'lazy' class to prevent re-loading
                video.classList.remove('lazy');
            }
        });
    }

    // Attach event listener for scroll event to trigger lazy loading
    window.addEventListener('scroll', lazyLoadVideos);

    // Trigger lazy loading on initial page load
    window.addEventListener('load', lazyLoadVideos);

    // Select all elements with the class "preview__btn"
    var buttons = document.querySelectorAll(".preview__btn");

    // Loop through each button and add click event listener
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            this.style.display = 'none';
        });
    });

       // Function to check if the device is mobile
       function isMobileDevice() {
        return window.matchMedia("(max-width: 991px)").matches;
    }

    // Function to toggle the "active" class for the "share__list" element
    function toggleShareListActive(event) {
        // Check if the device is mobile
        if (isMobileDevice()) {
            // Check if the target element or its parent is an element of the "share__list" or "share__action" list
            if (event.target.closest('.share__list') || event.target.closest('.share__action')) {
                return; // If so, exit the function
            }

            // Get the "share__list" element
            var shareList = event.currentTarget.querySelector('.share__list');

            // Toggle the "active" class for the "share__list" element
            shareList.classList.toggle('active');

            // Prevent event bubbling to avoid triggering click event handlers on the document
            event.stopPropagation();
        }
    }

    // Add click event listener to each "share" button
    document.querySelectorAll('.share').forEach(function (shareButton) {
        shareButton?.addEventListener('click', toggleShareListActive);
    });

    // Add click event listener to the document
    document.addEventListener('click', function (event) {
        // Check if the device is mobile
        if (isMobileDevice()) {
            // Check if the target element or its parent is an element of the "share" area
            if (!event.target.closest('.share')) {
                // Remove the "active" class from all "share__list" elements
                document.querySelectorAll('.share__list').forEach(function (shareList) {
                    shareList.classList.remove('active');
                });
            }
        }
    });

    // Add scroll event listener
    window.addEventListener('scroll', function () {
        // Check if the device is mobile
        if (isMobileDevice()) {
            // Remove the "active" class from all "share__list" elements if it exists
            document.querySelectorAll('.share__list.active').forEach(function (shareList) {
                shareList.classList.remove('active');
            });
        }
    });
})