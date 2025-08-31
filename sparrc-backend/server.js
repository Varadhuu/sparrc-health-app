const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// --- Database Connection Configuration ---
// IMPORTANT: Update these details to match your MySQL setup.
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root123', // <-- IMPORTANT: Put your new password here!
    database: 'sparrc'
};

// --- API Endpoint to get Patient and Doctor Data ---
// This endpoint fetches detailed information for a specific patient from the database.
app.get('/api/patient/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const patientId = req.params.id;

        // SQL query to join patient and doctor tables
        const [rows] = await connection.execute(`
            SELECT 
                p.*, 
                d.doctor_name, 
                d.specialization 
            FROM sparrc_patient_info p
            LEFT JOIN sparrc_doctor_info d ON p.doctor_id = d.doctor_id
            WHERE p.id = ?
        `, [patientId]);
        
        await connection.end();

        if (rows.length > 0) {
            const patientData = rows[0];
            // We add the mock appointment and chat data here, as they aren't in the DB yet.
            patientData.appointments = [
                { id: 1, specialty: 'Follow-up Consultation', doctor: 'Dr. Tamil Selvan', time: 'Tomorrow, 11:00 AM', status: 'confirmed' },
                { id: 2, specialty: 'Physical Therapy Session', doctor: 'Dr. Anitha Mohan', time: 'Next Tuesday, 3:00 PM', status: 'pending' }
            ];
            patientData.chatbot_conversations = [
                { id: 1, sender: 'bot', message: `Hello ${patientData.patient_name}! I am your AI recovery coach. How are you feeling today?` },
                { id: 2, sender: 'bot', message: 'Remember to perform your knee strengthening exercises.' }
            ];
            res.json(patientData);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ message: 'Error fetching patient data. Check database connection and credentials.' });
    }
});

app.listen(port, () => {
    console.log(`SPARRC backend (DATABASE mode) listening at http://localhost:${port}`);
});

