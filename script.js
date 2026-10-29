
/* Michelle Lahung Kerdua
   Personal Portfolio JavaScript
*/

document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Navigation Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });

        // Close the menu after clicking a navigation link
        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
            });
        });
    }


    // 2. Dark Mode and Light Mode
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");

            const darkMode =
                document.body.classList.contains("dark-theme");

            const themeIcon =
                themeToggle.querySelector(".theme-icon");

            const themeText =
                themeToggle.querySelector(".theme-text");

            themeToggle.setAttribute("aria-pressed", darkMode);

            themeToggle.setAttribute(
                "aria-label",
                darkMode ? "Switch to light theme" : "Switch to dark theme"
            );

            if (themeIcon) {
                themeIcon.textContent = darkMode ? "☀️" : "🌙";
            }

            if (themeText) {
                themeText.textContent = darkMode ? "Light" : "Dark";
            }
        });
    }


    // 3. Typing Effect in the Home Section
    const typingText = document.getElementById("typingText");

    if (typingText) {
        const words = [
            "Network Computing student",
            "University student",
            "Lifelong learner"
        ];

        let wordIndex = 0;
        let letterIndex = words[0].length;
        let deleting = true;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                letterIndex--;

                typingText.textContent =
                    currentWord.substring(0, letterIndex);

                if (letterIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;

                    setTimeout(typeEffect, 400);
                    return;
                }

                setTimeout(typeEffect, 50);

            } else {
                const nextWord = words[wordIndex];

                letterIndex++;

                typingText.textContent =
                    nextWord.substring(0, letterIndex);

                if (letterIndex === nextWord.length) {
                    deleting = true;

                    setTimeout(typeEffect, 1500);
                    return;
                }

                setTimeout(typeEffect, 80);
            }
        }

        setTimeout(typeEffect, 1500);
    }


    // 4. Scroll Progress Bar
    const scrollProgress = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");

    function updateScroll() {
        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        let progress = 0;

        if (pageHeight > 0) {
            progress = (window.scrollY / pageHeight) * 100;
        }

        if (scrollProgress) {
            scrollProgress.style.width = progress + "%";
        }

        // Show the Back to Top button after scrolling down
        if (backToTop) {
            backToTop.hidden = window.scrollY < 350;
        }
    }

    window.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);

    updateScroll();


    // 5. Back to Top Button
    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // 6. Reveal Sections When Scrolling
    const sections = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });

    } else {
        // Display sections normally in older browsers
        sections.forEach(function (section) {
            section.classList.add("active");
        });
    }


    // 7. Contact Form Character Counter
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const messageCount = document.getElementById("messageCount");
    const formStatus = document.getElementById("formStatus");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    if (messageInput && messageCount) {
        function updateCharacterCount() {
            messageCount.textContent =
                messageInput.value.length + " / " +
                messageInput.maxLength;
        }

        messageInput.addEventListener(
            "input",
            updateCharacterCount
        );

        updateCharacterCount();
    }


    // 8. Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Clear previous error messages
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (messageError) messageError.textContent = "";
            if (formStatus) formStatus.textContent = "";

            let valid = true;

            // Check the name field
            if (nameInput && nameInput.value.trim() === "") {
                if (nameError) {
                    nameError.textContent =
                        "Please enter your name.";
                }

                valid = false;
            }

            // Check the email field
            if (emailInput) {
                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(emailInput.value.trim())) {
                    if (emailError) {
                        emailError.textContent =
                            "Please enter a valid email address.";
                    }

                    valid = false;
                }
            }

            // Check the message field
            if (
                messageInput &&
                messageInput.value.trim() === ""
            ) {
                if (messageError) {
                    messageError.textContent =
                        "Please enter your message.";
                }

                valid = false;
            }

            // Display the validation result
            if (!valid) {
                if (formStatus) {
                    formStatus.textContent =
                        "Please check your information and try again.";
                }

                return;
            }

            // This form validates input but does not send an email
            if (formStatus) {
                formStatus.textContent =
                    "Your information is valid. This demonstration form does not send messages.";
            }

            contactForm.reset();

            if (messageCount && messageInput) {
                messageCount.textContent =
                    "0 / " + messageInput.maxLength;
            }
        });
    }


    // 9. Automatically Update the Footer Year
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 10. Display the Current Time
    const liveClock = document.getElementById("liveClock");

    function updateClock() {
        if (liveClock) {
            liveClock.textContent =
                new Date().toLocaleTimeString();
        }
    }

    if (liveClock) {
        updateClock();

        setInterval(updateClock, 1000);
    }

});
