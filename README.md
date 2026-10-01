# 🩺 PulseCare - Enterprise Patient Portal & Clinical Assistant

PulseCare is an industry-standard, high-performance web application designed to act as a comprehensive Patient Portal. It empowers patients to manage their health vitals, book specialist appointments, review physician care plans, access secure medical documents, and interact with a real-time clinical AI assistant.

## 🚀 Key Modules & Features

### 1. Patient Health Dashboard
* **Real-time Telemetry:** Live tracking of vital health metrics including Heart Rate (bpm), Blood Pressure (mmHg), Blood Glucose (mg/dL), and Oxygen Saturation ($SpO_2$).

* **Status Indicators:** Automated color-coded badges indicating normal, optimal, and healthy thresholds.

### 2. PulseAI Clinical Assistant
* **Context-Aware Medical Triage:** Smart intent routing capable of parsing diverse clinical queries (muscular pain, asthma, blood pressure irregularities, fever, etc.).

* **Hospital Admission Guidance:** Direct instructions for planned and emergency admissions.

* **Direct Hospital Helplines:** Integrated hotlines (`1800-PULSE-SOS`, `1800-PULSE-CARE`) for immediate contact.

* **Interactive Chat Experience:** Real-time typing indicators (`Analyzing symptoms...`), quick-prompt pills, and persistent chat history stored locally via browser `localStorage`.

* **Session Management:** Built-in "New Chat" reset button to clear conversation threads instantly.

### 3. Appointment Scheduler

* **Interactive Booking System:** Select preferred departments (Cardiology, Neurology, General Checkup) and attending specialists (Dr. Sarah Smith, Dr. Robert Chen).

* **State Persistence:** Booked appointments persist across page refreshes and tab switches using `localStorage`.

* **Approval Status Tracking:** Real-time status tags indicating *Confirmed* or *Pending Doctor Approval*.

### 4. Medical Document Vault

* **Advanced Search:** Instant record filtering via React's `useMemo` hook.

* **Secure PDF Downloads:** Generates and downloads formatted clinical records directly as secure PDF files (`.pdf`).

### 5. Doctor's Advice & Care Plan
* **Physician Verified Guidelines:** View dietary restrictions, exercise regimens, and lifestyle instructions with priority flags (High, Medium, Normal).

* **Attending Specialists Directory:** Detailed profile cards outlining physician experience, specialties, and weekly schedules.

### 6. Enterprise Navigation & Safety Controls

* **Global Navbar & Notifications:** Real-time alert popover with automatic route-change closing.

* **Emergency SOS Modal:** Rapid-response dispatch simulation with ambulance details and direct hotline access.

* **Patient Profile Modal:** Clickable patient identity widget displaying full demographics (Name, Age: 34, Patient ID: `#PC-8492`, Blood Group: O+, Contact).

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite)
* **Routing:** React Router DOM
* **Styling & Design System:** Tailwind CSS
* **Icons:** Lucide React
* **State Persistence:** HTML5 Web Storage (`localStorage`)

## 📂 Project Directory Structure

pulsecare-project/
├── public/
├── src/
│   ├── App.jsx          # Main application router, layout wrapper, and view components
│   ├── main.jsx         # React application entry point
│   └── index.css        # Tailwind CSS global stylesheet
├── package.json         # Project dependencies and metadata
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # Project documentation
