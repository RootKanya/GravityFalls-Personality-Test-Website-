const supabase = require('../config/db');

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) throw error;

        res.status(201).json({ 
            message: "User created! Please check your email to verify.", 
            user: data.user 
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        res.status(200).json({ 
            message: "Login successful", 
            token: data.session.access_token, 
            user: data.user 
        });

    } catch (err) {
        res.status(401).json({ error: "Wrong email or password" });
    }
};

exports.logout = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};