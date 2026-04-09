[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=SebasFj_ArquiSoftLab1)](https://sonarcloud.io/summary/new_code?id=SebasFj_ArquiSoftLab1)

[![CI/CD Pipeline](https://github.com/SebasFj/ArquiSoftLab1/actions/workflows/build.yml/badge.svg)](https://github.com/SebasFj/ArquiSoftLab1/actions/workflows/build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SebasFj_ArquiSoftLab1&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=SebasFj_ArquiSoftLab1)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=SebasFj_ArquiSoftLab1&metric=bugs)](https://sonarcloud.io/summary/new_code?id=SebasFj_ArquiSoftLab1)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=SebasFj_ArquiSoftLab1&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=SebasFj_ArquiSoftLab1)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=SebasFj_ArquiSoftLab1&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=SebasFj_ArquiSoftLab1)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=SebasFj_ArquiSoftLab1&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=SebasFj_ArquiSoftLab1)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=SebasFj_ArquiSoftLab1&metric=coverage)](https://sonarcloud.io/summary/new_code?id=SebasFj_ArquiSoftLab1)


# 💳 Banking Simulation Monorepo

This project is a **monorepo** that contains a full-stack banking simulation system, including a backend API and a frontend application. It demonstrates modern development practices such as CI/CD, code quality analysis, containerization, and cloud deployment.

---

## 📁 Project Structure

```
.
├── lab12026p-back      # Spring Boot backend (API)
└── lab12026p front     # React + Vite frontend
```

---

## 🚀 Backend - Spring Boot API

The `lab12026p-back` folder contains a backend application built with **Spring Boot**. It exposes endpoints to simulate basic banking operations.

### 🔧 Features

* Customer management:

    * Create customers
    * Retrieve customer information

* Transaction management:

    * Perform money transfers
    * Retrieve transaction history by account

* Database:

    * PostgreSQL deployed on Render

---

### ⚙️ DevOps & Automation

The backend includes a complete CI/CD pipeline using GitHub Actions:

* ✅ **Unit Testing**
* 📊 **Code Quality Analysis** with SonarCloud
* 📈 **Code Coverage** with JaCoCo
* 📦 **Automatic JAR generation**
* 🐳 **Docker image build & push** to Docker Hub
* 🚀 **Ready for deployment** using container-based platforms (e.g., Render)

---

### 📦 Artifacts & Images

* 🔗 **Download JAR artifact (GitHub Actions):**
  https://github.com/SebasFj/ArquiSoftLab1/actions/runs/24151251385/artifacts/6334175512

* 🐳 **Pull Docker image:**

```bash
docker pull sebasfj95/arqui_lab12:latest
```

---

### ▶️ Running the Backend

```bash
cd lab12026p-back
./mvnw spring-boot:run
```

Or using the generated JAR:

```bash
java -jar target/lab12026p.jar
```

---

## 💻 Frontend - React + Vite

The `lab12026p front` folder contains a frontend application built with:

* React
* Vite
* JavaScript

It provides a simple UI to interact with the backend API.

---

### 🧩 Features

* Home page
* Customer management page
* Transaction management page

---

### ▶️ Running the Frontend

```bash
cd "lab12026p front"
yarn install
yarn dev
```

The app will run locally (by default on port 5173).

---

## 🌐 Integration

The frontend communicates with the backend API to perform all operations:

* Create and query customers
* Execute transfers
* View transaction history

---

## 🗄️ Database

* PostgreSQL database hosted on **Render**
* Used for persistent storage of customers and transactions

---

## 🧪 Technologies Used

### Backend

* Spring Boot
* PostgreSQL
* Maven
* JUnit
* JaCoCo
* SonarCloud
* Docker

### Frontend

* React
* Vite
* JavaScript
* Yarn

---

## 📌 Notes

* This project is intended for educational purposes.
* It simulates banking operations but does not implement real-world security measures.

---

## 👨‍💻 Author

Developed as part of an academic project.

---
