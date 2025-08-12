# 📊 Student Risk Analyser Dashboard

A full-stack **Student Risk Analysis** web application leveraging an XGBoost machine learning model to predict student risk levels based on user input, with interactive data visualizations to support decision-making.

---

## 🚀 Features

* **Risk Prediction with XGBoost:**
  Predict student risk categories (e.g., Low, Medium, High) using an XGBoost model trained on Kaggle student data.

* **Backend Server for MongoDB Communication**
  Express+Vite Backend server for CRUD funtionality with the MongoBD database of student records.
  
* **Interactive Input Form:**
  User-friendly form built with React (MERN stack) to input student metrics and receive instant risk predictions.

* **Flask REST API:**
  Backend API serving predictions and data visualizations using Python and Flask.

* **Dynamic Data Visualization:**
  Visualize risk breakdowns and metrics with Python-powered charts integrated into the dashboard using seaborn and mathplotlib.

* **Docker Compatibility**
* Contanerized with docker Compose modeling multi container microservice architecture.

---

## 🛠 Tech Stack

| Frontend                  | Backend               | ML & Data Processing                                                 |
| ------------------------- | --------------------- | ---------------------------------------------------------------------|
| React + Node.js + Express |  Express + MongoDB    | Flask REST API server, Python (XGBoost, Pandas, Matplotlib/Seaborn)  |

---

## 📂 Project Structure

```
Student-Risk-Analyser-Dashboard/
├── client/                # React frontend with input form & UI
├── server/                # Express backend (API proxy, authentication)
├── XGBoostModel/          # Flask API serving XGBoost predictions & visualizations
├── docker-compose.yml     # docker file
├── data/                  # Kaggle dataset & processed files
├── README.md
```

---

## ⚡ Quick Start

### 1. Clone repo

```bash
git clone https://github.com/yourusername/Student-Risk-Analyser-Dashboard.git
cd Student-Risk-Analyser-Dashboard
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd server
npm install

# Flask API
cd XGBoostModel/FlaskAPIServer
pip install -r requirements.txt
```

### 3. Run servers

Open separate terminals for each:

```bash
# React app
cd client
npm run dev

# Express backend
cd server
npm start

# Flask API
cd XGBoostModel/FlaskAPIServer
python FlaskAPIServer.py
```
**ALTERNATIVILY**
Just run ``` docker-compose build ``` and ```docker-compose up ``` from the root :)

---

## 📋 Usage

* Open the React app in your browser ([http://localhost:5173])
* Fill out the student data form with relevant metrics (GPA, attendance, etc.)
* Submit to get risk predictions powered by the XGBoost model
* Explore risk visualizations to analyze student group trends

---

## 🔍 Model Details

* The XGBoost model was trained on a public Kaggle dataset related to student performance and risk factors.
* Features include grades, attendance, participation statistics, and more.
* Model files and training scripts are in the `/XGBoostModel` directory.

---

## 📜 License

This project is licensed under the MIT License.

---
