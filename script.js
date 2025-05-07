// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // EVENT HANDLING SECTION
    // ======================
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickOutput.style.color = '#27ae60';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickOutput.style.color = '';
        }, 2000);
    });
    
    // Hover effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Mouse is hovering!';
        hoverOutput.style.color = '#3498db';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Hover over this box';
        hoverOutput.style.color = '';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
        keypressOutput.style.color = '#9b59b6';
    });
    
    // Secret action (double-click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let pressTimer;
    
    // Double click event
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = 'Secret revealed! You double-clicked! 🎉';
        secretBox.style.backgroundColor = '#f1c40f';
        secretBox.classList.add('active');
        
        setTimeout(() => {
            secretOutput.textContent = 'Find the secret action! (hint: try double-click or long press)';
            secretBox.style.backgroundColor = '';
            secretBox.classList.remove('active');
        }, 3000);
    });
    
    // Long press events
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            secretOutput.textContent = 'Secret revealed! You did a long press! 🎉';
            secretBox.style.backgroundColor = '#e67e22';
            secretBox.classList.add('active');
            
            setTimeout(() => {
                secretOutput.textContent = 'Find the secret action! (hint: try double-click or long press)';
                secretBox.style.backgroundColor = '';
                secretBox.classList.remove('active');
            }, 3000);
        }, 1000); // 1 second for long press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // ==========================
    // INTERACTIVE ELEMENTS SECTION
    // ==========================
    
    // Button that changes text and color
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.textContent = 'Change My Color';
        }, 2000);
    });
    
    // Image gallery
    const galleryImage = document.getElementById('gallery-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageIds = [10, 11, 12, 13, 14]; // Different image IDs from picsum.photos
    let currentImageIndex = 0;
    
    function updateGalleryImage() {
        galleryImage.style.opacity = 0;
        setTimeout(() => {
            galleryImage.src = `https://picsum.photos/id/${imageIds[currentImageIndex]}/400/300`;
            galleryImage.style.opacity = 1;
        }, 300);
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + imageIds.length) % imageIds.length;
        updateGalleryImage();
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % imageIds.length;
        updateGalleryImage();
    });
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ======================
    // FORM VALIDATION SECTION
    // ======================
    
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        const nameFeedback = document.getElementById('name-feedback');
        
        if (this.value.length > 0) {
            nameFeedback.textContent = 'Looking good!';
        } else {
            nameFeedback.textContent = '';
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const emailFeedback = document.getElementById('email-feedback');
        const emailError = document.getElementById('email-error');
        
        if (this.value.length === 0) {
            emailFeedback.textContent = '';
            emailError.textContent = '';
        } else if (validateEmail(this.value)) {
            emailFeedback.textContent = 'Valid email format';
            emailError.textContent = '';
        } else {
            emailFeedback.textContent = '';
            emailError.textContent = 'Please enter a valid email address';
        }
    });
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        const passwordFeedback = document.getElementById('password-feedback');
        const passwordError = document.getElementById('password-error');
        const strengthBar = document.querySelector('.strength-bar::after');
        const strengthText = document.querySelector('.strength-text');
        
        if (this.value.length === 0) {
            passwordFeedback.textContent = '';
            passwordError.textContent = '';
            document.querySelector('.strength-bar').style.setProperty('--width', '0');
            strengthText.textContent = 'Password Strength';
        } else if (this.value.length < 8) {
            passwordFeedback.textContent = '';
            passwordError.textContent = 'Password must be at least 8 characters';
            document.querySelector('.strength-bar').style.setProperty('--width', '30%');
            document.querySelector('.strength-bar').style.setProperty('background-color', '#e74c3c');
            strengthText.textContent = 'Weak';
        } else {
            passwordError.textContent = '';
            
            // Calculate password strength
            let strength = 0;
            if (this.value.length >= 8) strength += 30;
            if (this.value.length >= 12) strength += 20;
            if (/[A-Z]/.test(this.value)) strength += 20;
            if (/[0-9]/.test(this.value)) strength += 20;
            if (/[^A-Za-z0-9]/.test(this.value)) strength += 10;
            
            // Update strength bar
            const strengthPercentage = Math.min(strength, 100);
            document.querySelector('.strength-bar').style.setProperty('--width', `${strengthPercentage}%`);
            
            // Set color based on strength
            if (strengthPercentage < 50) {
                document.querySelector('.strength-bar').style.setProperty('background-color', '#e74c3c');
                strengthText.textContent = 'Weak';
            } else if (strengthPercentage < 80) {
                document.querySelector('.strength-bar').style.setProperty('background-color', '#f39c12');
                strengthText.textContent = 'Moderate';
                passwordFeedback.textContent = 'Good, but could be stronger';
            } else {
                document.querySelector('.strength-bar').style.setProperty('background-color', '#2ecc71');
                strengthText.textContent = 'Strong';
                passwordFeedback.textContent = 'Excellent password!';
            }
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name (required)
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = '';
        }
        
        // Validate email format if provided
        if (emailInput.value.trim() !== '' && !validateEmail(emailInput.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            document.getElementById('email-error').textContent = '';
        }
        
        // Validate password
        if (passwordInput.value.length < 8) {
            document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
            isValid = false;
        } else {
            document.getElementById('password-error').textContent = '';
        }
        
        // If form is valid, show success message
        if (isValid) {
            formSuccess.style.display = 'block';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
    
    // Helper function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});