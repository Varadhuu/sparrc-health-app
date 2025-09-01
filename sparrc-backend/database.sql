-- This script creates the database, all required tables, and inserts sample data.
-- Running this script will reset your database to the correct state.

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS sparrc;
USE sparrc;

-- 2. Create the doctors table
CREATE TABLE IF NOT EXISTS sparrc_doctor_info (
    doctor_id VARCHAR(50) PRIMARY KEY,
    doctor_name VARCHAR(255),
    dob DATE,
    contact_number VARCHAR(20),
    email VARCHAR(255),
    specialization VARCHAR(255),
    date_joined DATE,
    years_of_experience INT,
    clinic_branch TEXT
);

-- 3. Create the detailed patients table
CREATE TABLE IF NOT EXISTS sparrc_patient_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255),
    password VARCHAR(255),
    dob DATE,
    age INT,
    mobile_number VARCHAR(20),
    emergency_contact VARCHAR(20),
    gender VARCHAR(20),
    address TEXT,
    referred_by VARCHAR(255),
    consultation_type VARCHAR(255),
    occupation VARCHAR(255),
    lifestyle VARCHAR(255),
    email VARCHAR(255),
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
    status VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (patient_id) REFERENCES sparrc_patient_info(id),
    FOREIGN KEY (doctor_id) REFERENCES sparrc_doctor_info(doctor_id)
);

-- 5. Insert sample data
-- Insert sample doctors
INSERT INTO sparrc_doctor_info 
(doctor_id, doctor_name, dob, contact_number, email, specialization, date_joined, years_of_experience, clinic_branch)
VALUES
('D001', 'Dr. Selvam', '1970-05-15', '+91 9090909090', 'dr.selvam@sparrc.com', 'Spine Care Specialist', '2015-08-25', 15, 'Anna Nagar, Chennai'),
('D002', 'Dr. Arjun', '1980-08-20', '+91 8080808080', 'dr.arjun@sparrc.com', 'Sports Medicine Specialist', '2015-08-25', 10, 'Avadi, Chennai')
ON DUPLICATE KEY UPDATE doctor_name=VALUES(doctor_name);

-- Insert sample patients
INSERT INTO sparrc_patient_info 
(id, patient_name, dob, age, mobile_number, gender, main_complaints, complaint_duration, pain_scale, current_medication, doctor_id)
VALUES
(1, 'Anandan Kumar', '1983-05-12', 41, '+91 9876543210', 'Male', 'Chronic Low Back Pain', '5 years', 7, 'Occasional painkiller', 'D001'),
(2, 'Priya Venkatesh', '1995-11-20', 28, '+91 9123456789', 'Female', 'Right Knee Pain', '3 months', 6, 'Ibuprofen as needed', 'D002')
ON DUPLICATE KEY UPDATE patient_name=VALUES(patient_name);

-- Insert sample appointments
INSERT INTO sparrc_appointments (patient_id, doctor_id, reason, appointment_date, status)
VALUES
(1, 'D001', 'Follow-up Consultation', '2025-09-02 11:00:00', 'Confirmed'),
(1, 'D002', 'Physical Therapy Session', '2025-09-09 15:00:00', 'Pending')
ON DUPLICATE KEY UPDATE reason=VALUES(reason);

