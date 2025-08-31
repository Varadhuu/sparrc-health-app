// --- IMPORTANT ---
// 1. Find your computer's local IP address (run 'ipconfig' in Command Prompt).
// 2. Replace 'YOUR_COMPUTER_IP_ADDRESS' with that IP address.
const API_BASE_URL = 'http://192.168.1.4:3001';

export const fetchPatientData = async (patientId) => {
    console.log(`Attempting to fetch data from: ${API_BASE_URL}/api/patient/${patientId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/api/patient/${patientId}`);
        
        console.log('Received response from server. Status:', response.status);

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Successfully fetched and parsed data:', data);
        return data;
    } catch (error) {
        console.error('FETCH ERROR:', error);
        console.error('Is your backend server running and accessible on your network?');
        return null; 
    }
};

