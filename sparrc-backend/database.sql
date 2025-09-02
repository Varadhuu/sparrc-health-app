-- This script creates the database, all required tables, and inserts sample data.
-- Running this script will reset your database to the correct state.

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS sparrc;
USE sparrc;

-- 2. Create the doctors table
CREATE TABLE IF NOT EXISTS sparrc_doctor_info (
    doctor_id VARCHAR(50) PRIMARY KEY,
    doctor_name VARCHAR(255),
    specialization VARCHAR(255),
    years_of_experience INT
);

-- 3. Create the patients table
CREATE TABLE IF NOT EXISTS sparrc_patient_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255),
    dob DATE,
    gender VARCHAR(20),
    mobile_number VARCHAR(20),
    occupation VARCHAR(255),
    main_complaints TEXT,
    complaint_duration VARCHAR(255),
    pain_scale INT,
    current_medication TEXT,
    doctor_id VARCHAR(50),
    FOREIGN KEY (doctor_id) REFERENCES sparrc_doctor_info(doctor_id)
);

-- 4. Create the appointments table
CREATE TABLE IF NOT EXISTS sparrc_appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id VARCHAR(50),
    reason TEXT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Waiting for Confirmation',
    consultation_type VARCHAR(50),
    branch VARCHAR(255),
    FOREIGN KEY (patient_id) REFERENCES sparrc_patient_info(id),
    FOREIGN KEY (doctor_id) REFERENCES sparrc_doctor_info(doctor_id)
);

-- 5. Insert sample data
INSERT INTO sparrc_doctor_info (doctor_id, doctor_name, specialization, years_of_experience) VALUES
('D001', 'Dr. Tamil Selvan', 'Spine Care Specialist', 15),
('D002', 'Dr. Anitha Mohan', 'Sports Medicine Specialist', 10)
ON DUPLICATE KEY UPDATE doctor_name=VALUES(doctor_name);

INSERT INTO sparrc_patient_info (id, patient_name, dob, gender, mobile_number, occupation, main_complaints, complaint_duration, pain_scale, current_medication, doctor_id) VALUES
(1, 'Vijay Kumar', '1983-05-12', 'Male', '+91 9876543210', 'IT Professional', 'Chronic Low Back Pain', '5 years', 7, 'Occasional painkiller', 'D001')
ON DUPLICATE KEY UPDATE patient_name=VALUES(patient_name);

-- Insert sample appointments
INSERT INTO sparrc_appointments (patient_id, doctor_id, reason, appointment_date, status, consultation_type, branch)
VALUES
-- --- NEW: This is the completed dummy record with a date in the past ---
(1, 'D001', 'Post-Surgery Checkup', '2025-08-20 10:00:00', 'Confirmed', 'In Person', 'Anna Nagar, Chennai'),
-- These are the upcoming appointments
(1, 'D001', 'Follow-up Consultation', '2025-09-10 11:00:00', 'Confirmed', 'In Person', 'Anna Nagar, Chennai'),
(1, 'D002', 'Physical Therapy Session', '2025-09-15 15:00:00', 'Waiting for Confirmation', 'Online', 'Avadi, Chennai');



