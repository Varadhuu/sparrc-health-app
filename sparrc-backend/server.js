const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'YourNewPassword', // IMPORTANT: Use your actual MySQL password here
    database: 'sparrc'
};

// GET endpoint for patient data
app.get('/api/patient/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const patientId = req.params.id;

        const [patientRows] = await connection.execute(
            `SELECT p.*, d.doctor_name, d.specialization 
             FROM sparrc_patient_info p
             LEFT JOIN sparrc_doctor_info d ON p.doctor_id = d.doctor_id
             WHERE p.id = ?`,
            [patientId]
        );

        if (patientRows.length === 0) {
            await connection.end();
            return res.status(404).json({ message: 'Patient not found' });
        }

        const [appointments] = await connection.execute(
            `SELECT a.id, a.reason, a.appointment_date, a.status, d.doctor_name 
             FROM sparrc_appointments a
             JOIN sparrc_doctor_info d ON a.doctor_id = d.doctor_id
             WHERE a.patient_id = ? 
             ORDER BY a.appointment_date DESC`,
            [patientId]
        );

        await connection.end();

        const patientData = {
            ...patientRows[0],
            appointments: appointments,
            chatbot_conversations: [
                { id: 1, message: "Hello! How can I help with your recovery today?", sender: "bot" }
            ]
        };
        
        res.json(patientData);

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ message: 'Error fetching patient data' });
    }
});

// --- NEW: PUT endpoint to update patient data ---
app.put('/api/patient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const { patient_name, email, mobile_number, gender, occupation } = req.body;

        if (!patient_name || !mobile_number) {
            return res.status(400).json({ message: 'Patient name and mobile number are required.' });
        }

        const connection = await mysql.createConnection(dbConfig);

        await connection.execute(
            `UPDATE sparrc_patient_info 
             SET patient_name = ?, email = ?, mobile_number = ?, gender = ?, occupation = ?
             WHERE id = ?`,
            [patient_name, email, mobile_number, gender, occupation, patientId]
        );

        await connection.end();
        res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
        console.error('Failed to update profile:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});


// POST endpoint for appointments
app.post('/api/appointments', async (req, res) => {
    try {
        const { patientId, doctorId, reason, date } = req.body;
        
        if (!patientId || !doctorId || !reason || !date) {
            return res.status(400).json({ message: 'Missing required appointment data.' });
        }

        const connection = await mysql.createConnection(dbConfig);
        const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

        const [result] = await connection.execute(
            'INSERT INTO sparrc_appointments (patient_id, doctor_id, reason, appointment_date, status) VALUES (?, ?, ?, ?, ?)',
            [patientId, doctorId, reason, formattedDate, 'pending']
        );
        
        await connection.end();
        res.status(201).json({ message: 'Appointment created successfully', appointmentId: result.insertId });

    } catch (error) {
        console.error('Failed to create appointment:', error);
        res.status(500).json({ message: 'Error creating appointment' });
    }
});

app.listen(port, () => {
    console.log(`SPARRC backend (DATABASE mode) listening at http://localhost:${port}`);
});

