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


    // Getting all textarea elements on the page
    var textareas = document.getElementsByTagName('textarea');

    // Checking if there is at least one textarea field on the page
    if (textareas.length > 0) {
        // Iterating over each textarea field and adding keydown event listener
        for (var i = 0; i < textareas.length; i++) {
            textareas[i].addEventListener('keydown', resize);
        }
    }

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

    // progress code  end


    // Getting all elements with class "preview"
    const previews = document.querySelectorAll('.preview');

    // Iterating over each element
    previews.forEach(function (preview) {
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


    // comments code

    const textarea = document.querySelector('.annotate__input');
    const row = document.querySelector('.annotate__row');
    const cancelBtn = document.querySelector('.annotate__cancel');

    textarea?.addEventListener('focus', function () {
        row.style.display = 'flex';
        textarea.rows = 3;
    });

    cancelBtn?.addEventListener('click', function () {
        row.style.display = 'none';
        textarea.value = '';
        textarea.rows = 1;
        textarea.style.height = ""
    });

    // comments code end

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
    var textElements = document.querySelectorAll(".post__text");

    textElements?.forEach(function (textElement) {
        // Check if the text element exists
        if (!textElement) {
            console.error("Error: Text element not found.");
            return; // Interrupt the current iteration of the loop
        }

        var text = textElement.textContent.trim();
        // Check if the text content is empty
        if (!text) {
            console.error("Error: Text content is empty.");
            return; // Interrupt the current iteration of the loop
        }

        if (text.length > 100) {
            var slicedText = text.slice(0, 100);
            var remainingText = text.slice(100);
            textElement.innerHTML = slicedText + '<span class="remaining-text" style="display: none;">' + remainingText + '</span> <div class="preview__more post__more">more</div>';
            var moreButton = textElement.querySelector('.preview__more');
            // Check if the "more" button exists
            if (!moreButton) {
                console.error("Error: More button not found.");
                return; // Interrupt the current iteration of the loop
            }
            moreButton.addEventListener('click', function () {
                var remainingText = textElement.querySelector(".remaining-text");
                // Check if the remaining text element exists
                if (!remainingText) {
                    console.error("Error: Remaining text element not found.");
                    return; // Interrupt the current iteration of the loop
                }
                var buttonText = this.textContent;
                if (remainingText.style.display === "none") {
                    remainingText.style.display = "inline";
                    this.textContent = "less";
                } else {
                    remainingText.style.display = "none";
                    this.textContent = "more";
                }
            });
        }
    });



});
