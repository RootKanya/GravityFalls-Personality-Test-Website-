const supabase = require('../config/db');

exports.saveAnswer = async (req, res) => {
    const { email, persona, scores } = req.body;

    try {
        const { data, error } = await supabase
            .from('user_personas')
            .insert([
                { 
                    user_email: email, 
                    persona_name: persona, 
                    score_data: scores 
                }
            ]);

        if (error) throw error;

        res.status(200).json({ message: "Persona saved to database!", data });

    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getResult = async (req, res) => {
    res.json({ message: "Get result feature coming soon!" });
};