(() => {
    const profileLogo = document.getElementById('profile-logo');
    profileLogo.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('contact-form-container').style.display = 'flex';
    });

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

        
        const botToken = process.env.TRAX;
        const chatId = process.env.REXS;
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
        if (!contactForm.contains(event.target) && !document.getElementById('profile-logo').contains(event.target)) {
            contactFormContainer.style.display = 'none';
        }
    });
})();
