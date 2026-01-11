// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Trigger on initial load
    window.addEventListener('load', fadeInOnScroll);
    
    // Form submission handling
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('userName').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const service = document.getElementById('userService').value;
            const message = document.getElementById('userMessage').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            
            if (!name || !phone || !service) {
                alert('Please fill all required fields (Name, Phone, and Service)');
                return;
            }
            
            // Create formatted message
            const inquiryDetails = 
                `📞 *NEW INQUIRY - Mukesh's Canteen* 📞%0A%0A` +
                `👤 *Name:* ${name}%0A` +
                `📱 *Phone:* ${phone}%0A` +
                `📧 *Email:* ${email || 'Not provided'}%0A` +
                `🏪 *Service:* ${service}%0A` +
                `📝 *Message:* ${message || 'No message provided'}%0A%0A` +
                `⏰ *Time:* ${new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}%0A` +
                `🌐 *Via:* Website Contact Form`;
            
            // Send via WhatsApp
            window.open(`https://wa.me/919105662287?text=${inquiryDetails}`, '_blank');
            
            // Show success message
            const statusElement = document.getElementById('formStatus');
            statusElement.textContent = '✅ Inquiry sent! Please check WhatsApp to complete.';
            statusElement.style.color = 'green';
            statusElement.style.display = 'block';
            statusElement.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
            statusElement.style.border = '1px solid green';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                inquiryForm.reset();
                statusElement.style.display = 'none';
            }, 3000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Add phone number formatting
    const phoneInput = document.getElementById('userPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });
    }
    
    // Add social media links functionality
    const socialLinks = document.querySelectorAll('.social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.querySelector('i').className;
            
            // You can add specific actions for each platform
            if (platform.includes('whatsapp')) {
                // Already handled by href
            } else if (platform.includes('phone')) {
                // Already handled by href
            } else {
                // For Facebook and Instagram, you can add your links
                e.preventDefault();
                alert('Social media links can be updated in the HTML file with your actual profile URLs.');
            }
        });
    });
    
    // Initialize with first scroll check
    fadeInOnScroll();
});