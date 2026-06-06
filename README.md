# InsurIQ.ai 

**A full-stack Machine Learning web application that predicts annual healthcare costs based on patient demographics and lifestyle factors.**

![Tech Stack](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind%20CSS-blue)
![Tech Stack](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-green)
![Tech Stack](https://img.shields.io/badge/Machine_Learning-Scikit--Learn-orange)

## Project Overview
InsurIQ bridges the gap between Data Science and Software Engineering. It provides a sleek, component-based user interface that communicates in real-time with a custom machine learning backend to forecast medical insurance charges. 

### The Machine Learning Approach
Initially, the dataset contained 11 different features (including region, gender, and number of children). Through exploratory data analysis and **Pearson Correlation** mapping, I mathematically proved that 8 of those features were statistical noise. 

To optimize the model for production, I performed **Feature Selection** and trained a lightweight **Random Forest Regressor** exclusively on the three highest-impact variables:
1. **Smoker Status** (Highest correlation: `0.787`)
2. **Age** (`0.298`)
3. **BMI** (`0.196`)

By pruning the noise, the resulting model maintains high predictive accuracy while drastically reducing inference time, making it perfect for a real-time web API.

---

## Features
* **Millisecond Latency:** The FastAPI backend processes inference requests instantly.
* **Component-Based UI:** Built with React and Vite for blazing-fast rendering.
* **Modern Styling:** Fully responsive dashboard styled with Tailwind CSS v4 and Lucide React icons.
* **CORS Configured:** Secure cross-origin resource sharing implemented between the React frontend and Python server.

---

## Tech Stack
**Frontend:**
* React (Vite)
* Tailwind CSS v4
* Lucide React (Icons)

**Backend / ML Engine:**
* Python 3
* FastAPI & Uvicorn
* Scikit-Learn (Random Forest)
* Joblib (Model Serialization)
* Pandas & NumPy

---

## How to Run Locally

### 1. Start the FastAPI Backend
Ensure you have Python installed, then navigate to the root directory:
```bash
# Install dependencies
pip install fastapi uvicorn pydantic joblib scikit-learn

# Run the server
uvicorn server:app --reload
