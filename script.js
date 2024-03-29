// Obfuscate script.js code to deter casual inspection
(() => {
    const profileLogo = document.getElementById('profile-logo');
    profileLogo.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('contact-form-container').style.display = 'flex';
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Forward the message via Telegram bot
        const botToken = 'TRAXDINOSAUR';
        const chatId = 'TRAXDINOSAURS';
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
                    document.getElementById('contact-form').reset();
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
