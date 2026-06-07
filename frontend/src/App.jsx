import React, { useState } from 'react';
import { Activity, ShieldCheck, Zap, ArrowRight, IndianRupee } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    age: 30,
    bmi: 25.0,
    is_smoker: 0
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const getEstimate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null); // Reset previous prediction for animation effect

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setPrediction(data.estimated_charges);
    } catch (error) {
      console.error("Error connecting to the AI:", error);
      alert("Could not connect to the server. Is your Python FastAPI server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      
      {/* Navigation Bar */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-900">InsurIQ<span className="text-blue-600">.ai</span></span>          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#calculator" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all shadow-sm hover:shadow">
              Try Calculator
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white pb-20 pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Copy */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
              <Zap className="h-4 w-4" /> Powered by Random Forest ML
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Predict Healthcare Costs with <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Precision.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Stop guessing. Our machine learning model analyzes your age, BMI, and lifestyle to instantly forecast your annual medical charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#calculator" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                Get Your Estimate <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column: The AI Calculator Card */}
          <div id="calculator" className="lg:w-1/2 w-full max-w-md lg:max-w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative">
              <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" /> Live AI Engine
                </h3>
              </div>
              
              <div className="p-6 sm:p-8">
                <form onSubmit={getEstimate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Age</label>
                    <input
                      type="number" name="age" value={formData.age} onChange={handleChange} required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">BMI (Body Mass Index)</label>
                    <input
                      type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tobacco User?</label>
                    <select
                      name="is_smoker" value={formData.is_smoker} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                  </div>

                  <button
                    type="submit" disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Processing Data...</span>
                    ) : (
                      <>Calculate Risk Profile <ArrowRight className="h-5 w-5" /></>
                    )}
                  </button>
                </form>

                {/* Dynamic Results Display */}
                {prediction !== null && (
                  <div className="mt-6 p-6 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-sm text-blue-800 font-semibold mb-1 uppercase tracking-wider">Estimated Annual Cost</p>
                    <div className="flex items-center justify-center text-4xl font-extrabold text-slate-900">
                    <IndianRupee className="h-8 w-8 text-blue-600 mr-1" />                      
                    {prediction.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Trust / Features Section */}
      <section id="features" className="bg-slate-900 text-slate-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-slate-800 p-4 rounded-2xl mb-4 text-blue-400">
                <Zap className="h-8 w-8" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Millisecond Latency</h4>
              <p className="text-sm">Our FastAPI backend processes inference requests instantly, providing real-time feedback.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-slate-800 p-4 rounded-2xl mb-4 text-cyan-400">
                <Activity className="h-8 w-8" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">90% Accuracy</h4>
              <p className="text-sm">Trained on thousands of real-world healthcare records using hyper-tuned Random Forest algorithms.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-slate-800 p-4 rounded-2xl mb-4 text-indigo-400">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Secure Processing</h4>
              <p className="text-sm">Zero data retention. Your inputs are passed securely through our API and immediately discarded.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;