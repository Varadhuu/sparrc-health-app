SPARRC Health App
This is a full-stack mobile application designed for patients of the SPARRC clinic. It allows users to view their medical reports, manage appointments, and interact with an AI-powered recovery coach. The project is built with a React Native frontend and a Node.js backend connected to a MySQL database.

Project Structure
The repository contains two main folders:

/sparrc-app-final: The frontend React Native (Expo) application.

/sparrc-backend: The backend Node.js (Express) server and database files.

Prerequisites
Before you begin, ensure you have the following software installed on your computer:

Node.js: (Version 18 or newer recommended) - This is required for both the frontend and backend.

[suspicious link removed]: The database used to store all application data. You can also use a tool like XAMPP.

Git: For version control and cloning the repository.

Expo Go App: Install the Expo Go app on your physical Android or iOS device to run the app. Alternatively, you can use an Android Emulator from Android Studio.

How to Run the Project
Follow these steps in order to get the application running. You will need two separate terminal windows.

1. Backend Setup (Terminal 1)
First, we'll set up and run the database and the backend server.

Clone the Repository:

git clone [https://github.com/Varadhuu/sparrc-health-app.git](https://github.com/Varadhuu/sparrc-health-app.git)
cd sparrc-health-app

Navigate to the Backend Folder:

cd sparrc-backend

Install Dependencies:

npm install

Set Up the Database:

Make sure your MySQL server is running.

Log in to MySQL (e.g., mysql -u root -p).

Run the database.sql script provided in this folder. This will create the sparrc database, all necessary tables, and insert sample data.

Important: Open the server.js file and update the password in the dbConfig object to match your MySQL root password.

Start the Backend Server:

node server.js

The server should now be running at http://localhost:3001. Keep this terminal open.

2. Frontend Setup (Terminal 2)
Now, let's run the mobile application.

Open a New Terminal.

Navigate to the Frontend Folder:

cd path/to/sparrc-health-app/sparrc-app-final

Install Dependencies:

npm install

Configure the IP Address:

Find your computer's local IP address (e.g., by running ipconfig on Windows or ifconfig on Mac/Linux).

Open the src/api.js file.

Update the API_BASE_URL with your computer's IP address (e.g., http://192.168.1.5:3001).

Start the App:

npx expo start

Scan the QR code with the Expo Go app on your phone, or press a to open it on a running Android Emulator.

Your SPARRC Health App should now be fully functional!