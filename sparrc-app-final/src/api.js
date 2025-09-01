// This is the special IP address that the Android emulator uses to
// refer to the host machine (your computer) where the server is running.
export const API_BASE_URL = 'http://10.0.2.2:3001';

export const fetchPatientData = async (patientId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/patient/${patientId}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('FETCH ERROR:', error);
        throw error;
    }
};

// --- NEW: Function to update patient data ---
export const updatePatientData = async (patient) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/patient/${patient.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile.');
        }

        return await response.json();
    } catch (error) {
        console.error('UPDATE ERROR:', error);
        throw error;
    }
};

