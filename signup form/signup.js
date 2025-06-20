document.addEventListener('DOMContentLoaded', function() {
    // Google Sign Up Button
    const googleBtn = document.getElementById('googleSignUp');
    
    googleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
    
    // Regular Form Submission
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const password = this.querySelector('input[type="password"]').value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
        const email = this.querySelector('input[type="email"]').value;
        const username = this.querySelector('input[type="text"]').value;
        
        // Validate passwords match
        if(password !== confirmPassword) {
            alert('Passwords do not match!');
            return false;
        }
        
        // Validate password strength (optional)
        if(password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return false;
        }
        
        // Validate email format (optional)
        if(!/^\S+@\S+\.\S+$/.test(email)) {
            alert('Please enter a valid email address!');
            return false;
        }
        
        // Validate username (optional)
        if(username.length < 3) {
            alert('Username must be at least 3 characters long!');
            return false;
        }
        

        window.location.href = 'index.html';
        
     
        
        return false; 
    });
});