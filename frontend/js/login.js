// frontend/js/login.js

// backend server
const API_URL = "http://127.0.0.1:5000/api/auth";

//Helpers
function toast(message, isError = false) {
    if (isError) {
        alert("Error: " + message);
    } else {
        alert("Success: " + message);
    }
}
function setLoading(isLoading) {
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.disabled = isLoading;
        btn.style.opacity = isLoading ? "0.5" : "1";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');

    // SIGN UP HANDLER 
    document.getElementById('signupBtn').addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passInput.value;

        if (!email || !password) return toast("Please fill in both fields", true);

        setLoading(true);
        try {
            console.log("Attempting Signup..."); 

            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Signup failed");
            }
            
            toast("Account created! You can now log in.");
            
        } catch (err) {
            console.error("Signup Error:", err);
            toast(err.message, true);
        } finally {
            setLoading(false);
        }
    });

    // LOGIN HANDLER
    document.getElementById('loginBtn').addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passInput.value;

        if (!email || !password) return toast("Please fill in both fields", true);
        
        setLoading(true);
        try {
            console.log("Attempting Login..."); // Debug log

            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }
            
            toast("Login successful!");
            
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('userEmail', email);
            
            window.location.href = 'persona.html';
            
        } catch (err) {
            console.error("Login Error:", err);
            toast(err.message, true);
        } finally {
            setLoading(false);
            window.parent.document.getElementById("appFrame").src = "pages/home.html";
        }
    });
});