(() => {
    const profileLogo = document.getElementById('profile-logo');
    profileLogo.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('contact-form-container').style.display = 'flex';
    });

    // New Logo Event Listener
    const newLogo = document.getElementById('new-logo');
    newLogo.addEventListener('click', function(event) {
        event.preventDefault();
        togglePopupLogos();
    });

    // Toggle Popup Logos
    function togglePopupLogos() {
        const popupLogos = document.querySelector('.popup-logos');
        popupLogos.classList.toggle('show');
    }

    const contactForm = document.getElementById('contact-form');

    // Enable typing in input boxes
    contactForm.addEventListener('keydown', function(event) {
        event.stopPropagation();
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // If You Will Use This Token Or Channel Id Then Congrats! You Are A Failiure !!
        const botToken = '6641775231:AAFGXNrUJxYYu9z5BfJ9xLioiWZ4f8nteOY';
        const chatId = '-1001839766283';
        const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
                return response.json();
            })
            .then(data => {
                if (data.ok) {
                    showMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                    setTimeout(() => {
                        document.getElementById('contact-form-container').style.display = 'none';
                    }, 1000);
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Failed to send message. Please try again later.', 'error');
            });
    });

    function showMessage(message, type) {
        const messageContainer = document.getElementById('message-container');
        messageContainer.textContent = message;
        messageContainer.className = `message-container ${type}`;
        messageContainer.style.display = 'block';
    }

    // Close contact form when clicking outside of it
    document.addEventListener('click', function(event) {
        const contactFormContainer = document.getElementById('contact-form-container');
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm.contains(event.target) && !document.getElementById('profile-logo').contains(event.target) && !document.getElementById('new-logo').contains(event.target)) {
            contactFormContainer.style.display = 'none';
            // Hide Popup Logos if visible
            const popupLogos = document.querySelector('.popup-logos');
            if (popupLogos.classList.contains('show')) {
                popupLogos.classList.remove('show');
            }
        }
    });
})();
