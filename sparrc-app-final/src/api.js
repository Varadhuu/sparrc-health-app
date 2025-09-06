// This is the special IP address that the Android emulator uses to
// refer to the host machine (your computer) where the server is running.
export const API_BASE_URL = 'http://10.0.2.2:3001';

export const fetchPatientData = async (patientId) => {
    try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${API_BASE_URL}/api/patient/${patientId}`, {
            signal: controller.signal,
            headers: {
                'Cache-Control': 'no-cache',
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please check your connection.');
        }
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

