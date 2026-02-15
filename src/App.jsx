import React, { useState, useEffect } from "react";
// import "./App.css";
import "./App2.css";

// const BACKEND_URL = "https://diabetes-prediction-backend-xbjg.onrender.com";
// const BACKEND_URL = "http://localhost:8000";
const App = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    // blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree_function: "",
    age: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiHealth, setApiHealth] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    try {
      const response = await fetch(
        `https://diabetes-prediction-backend-xbjg.onrender.com/health`,
      );
      const data = await response.json();
      setApiHealth(data);
    } catch (err) {
      setApiHealth({ status: "offline" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "https://diabetes-prediction-backend-xbjg.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pregnancies: parseInt(formData.pregnancies),
            glucose: parseFloat(formData.glucose),
            blood_pressure: parseFloat(formData.blood_pressure),
            skin_thickness: parseFloat(formData.skin_thickness),
            insulin: parseFloat(formData.insulin),
            bmi: parseFloat(formData.bmi),
            diabetes_pedigree_function: parseFloat(
              formData.diabetes_pedigree_function,
            ),
            age: parseInt(formData.age),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Prediction failed");
      }

      const data = await response.json();
      setResult(data);
      setShowResults(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      pregnancies: "",
      glucose: "",
      blood_pressure: "",
      skin_thickness: "",
      insulin: "",
      bmi: "",
      diabetes_pedigree_function: "",
      age: "",
    });
    setResult(null);
    setError(null);
    setShowResults(false);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Low":
        return "#00ff88";
      case "Medium":
        return "#ffbb00";
      case "High":
        return "#ff3366";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="app">
      <div className="background-grid"></div>

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="pulse-ring"></div>

            <div>
              <h1 className="title">Diabetes Prediction System</h1>
              <p className="subtitle">
                ML-Powered Diabetes Prediction System by Ataklti Okbe
              </p>
            </div>
          </div>
          <div className="status-badge">
            <div
              className={`status-indicator ${apiHealth?.status === "healthy" ? "active" : "inactive"}`}
            ></div>
            <span className="status-text">
              {apiHealth?.status === "healthy" ? "System Active" : "Offline"}
            </span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {!showResults ? (
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Patient Data Input</h2>
              <p className="form-description">
                Enter clinical parameters for diabetes risk assessment
              </p>
            </div>

            {error && (
              <div className="alert alert-error">
                <svg viewBox="0 0 24 24" fill="none" className="alert-icon">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12.01"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Pregnancies</span>
                    <span className="label-hint">Count</span>
                  </label>
                  <input
                    type="number"
                    name="pregnancies"
                    value={formData.pregnancies}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="0"
                    min="0"
                    max="20"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Glucose</span>
                    <span className="label-hint">mg/dL</span>
                  </label>
                  <input
                    type="number"
                    name="glucose"
                    value={formData.glucose}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="120"
                    step="0.1"
                    min="0"
                    max="300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Blood Pressure</span>
                    <span className="label-hint">mm Hg</span>
                  </label>
                  <input
                    type="number"
                    name="blood_pressure"
                    value={formData.blood_pressure}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="70"
                    step="0.1"
                    min="0"
                    max="200"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Skin Thickness</span>
                    <span className="label-hint">mm</span>
                  </label>
                  <input
                    type="number"
                    name="skin_thickness"
                    value={formData.skin_thickness}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="20"
                    step="0.1"
                    min="0"
                    max="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Insulin</span>
                    <span className="label-hint">μU/mL</span>
                  </label>
                  <input
                    type="number"
                    name="insulin"
                    value={formData.insulin}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="80"
                    step="0.1"
                    min="0"
                    max="900"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">BMI</span>
                    <span className="label-hint">kg/m²</span>
                  </label>
                  <input
                    type="number"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="25.5"
                    step="0.1"
                    min="0"
                    max="70"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Diabetes Pedigree</span>
                    <span className="label-hint">Function</span>
                  </label>
                  <input
                    type="number"
                    name="diabetes_pedigree_function"
                    value={formData.diabetes_pedigree_function}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="0.5"
                    step="0.001"
                    min="0"
                    max="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Age</span>
                    <span className="label-hint">Years</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="33"
                    min="1"
                    max="120"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="btn-icon">
                    <path
                      d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" className="btn-icon">
                        <path
                          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Run Analysis - prediction
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="results-container">
            <div className="results-header">
              <h2 className="results-title">Analysis Complete</h2>
              <button onClick={handleReset} className="btn btn-ghost">
                <svg viewBox="0 0 24 24" fill="none" className="btn-icon">
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                New Analysis
              </button>
            </div>

            <div className="results-grid">
              <div className="result-card main-result">
                <div className="card-label">Diabetes Risk Prediction</div>
                <div className="prediction-display">
                  <div
                    className="prediction-icon"
                    style={{ borderColor: getRiskColor(result.risk_level) }}
                  >
                    {result.prediction === 0 ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ color: getRiskColor(result.risk_level) }}
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ color: getRiskColor(result.risk_level) }}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="12"
                          y1="8"
                          x2="12"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="12"
                          y1="16"
                          x2="12.01"
                          y2="16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <h3 className="prediction-text">
                    {result.prediction === 0
                      ? "No Diabetes Detected"
                      : "Diabetes Risk Detected"}
                  </h3>
                </div>
              </div>

              <div className="result-card">
                <div className="card-label">Risk Level</div>
                <div className="metric-display">
                  <div
                    className="risk-badge"
                    style={{
                      backgroundColor: `${getRiskColor(result.risk_level)}20`,
                      borderColor: getRiskColor(result.risk_level),
                      color: getRiskColor(result.risk_level),
                    }}
                  >
                    {result.risk_level}
                  </div>
                </div>
              </div>

              {result.confidence && (
                <div className="result-card">
                  <div className="card-label">Confidence Score</div>
                  <div className="metric-display">
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="confidence-value">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="result-card recommendation-card">
                <div className="card-label">
                  <svg viewBox="0 0 24 24" fill="none" className="label-icon">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Clinical Recommendation
                </div>
                <p className="recommendation-text">{result.recommendation}</p>
              </div>

              <div className="result-card data-summary">
                <div className="card-label">Input Summary</div>
                <div className="data-grid">
                  {Object.entries(result.input_data).map(([key, value]) => (
                    <div key={key} className="data-item">
                      <span className="data-key">{key.replace(/_/g, " ")}</span>
                      <span className="data-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Machine Learning Project by Ataklti Okbe - Internship Project</p>
      </footer>
    </div>
  );
};

export default App;
