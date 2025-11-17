import React, { useState } from 'react';
import { AlertCircle, Activity, CheckCircle2 } from 'lucide-react';

export default function LungCancerPredictor() {
  const [formData, setFormData] = useState({
    gender: '',
    AGE: '',
    SMOKING: '',
    YELLOW_FINGERS: '',
    ANXIETY: '',
    PEER_PRESSURE: '',
    CHRONIC_DISEASE: '',
    FATIGUE: '',
    ALLERGY: '',
    WHEEZING: '',
    ALCOHOL_CONSUMING: '',
    COUGHING: '',
    SHORTNESS_OF_BREATH: '',
    SWALLOWING_DIFFICULTY: '',
    CHEST_PAIN: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setPrediction(null);

  //   try {
  //     const symptoms = Object.entries(formData)
  //       .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${value}`)
  //       .join(', ');

  //     const response = await fetch("https://api.anthropic.com/v1/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         model: "claude-sonnet-4-20250514",
  //         max_tokens: 1000,
  //         messages: [
  //           {
  //             role: "user",
  //             content: `As a medical assessment tool, analyze these patient symptoms and risk factors for lung cancer likelihood. Provide a risk assessment (LOW, MODERATE, or HIGH) and brief explanation.

  //               Patient Data: ${symptoms}

  //               Respond in JSON format only:
  //               {
  //               "riskLevel": "LOW|MODERATE|HIGH",
  //               "confidence": "percentage as number",
  //               "explanation": "brief explanation",
  //               "keyFactors": ["factor1", "factor2", "factor3"],
  //               "recommendation": "brief recommendation"
  //               }`
  //           }
  //         ],
  //       })
  //     });

  //     const data = await response.json();
  //     const text = data.content
  //       .map(item => item.type === "text" ? item.text : "")
  //       .join("");
      
  //     const cleanText = text.replace(/```json|```/g, "").trim();
  //     const result = JSON.parse(cleanText);
  //     setPrediction(result);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setPrediction({
  //       riskLevel: "ERROR",
  //       explanation: "Unable to process prediction. Please try again.",
  //       keyFactors: [],
  //       recommendation: "Please consult a healthcare professional."
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    try{

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "AGE": Number(formData.AGE),
          "SMOKING": Number(formData.SMOKING),
          "YELLOW_FINGERS": Number(formData.YELLOW_FINGERS),
          "ANXIETY": Number(formData.ANXIETY),
          "PEER_PRESSURE": Number(formData.PEER_PRESSURE),
          "CHRONIC DISEASE": Number(formData.CHRONIC_DISEASE),
          "FATIGUE": Number(formData.FATIGUE),
          "ALLERGY": Number(formData.ALLERGY),
          "WHEEZING": Number(formData.WHEEZING),
          "ALCOHOL CONSUMING": Number(formData.ALCOHOL_CONSUMING),
          "COUGHING": Number(formData.COUGHING),
          "SHORTNESS OF BREATH": Number(formData.SHORTNESS_OF_BREATH),
          "SWALLOWING DIFFICULTY": Number(formData.SWALLOWING_DIFFICULTY),
          "CHEST PAIN": Number(formData.CHEST_PAIN),
          "GENDER_M": Boolean(formData.gender),
        }),
      });

      const data = await response.json();
      setPrediction(data.prediction);
      setLoading(false);
      setFormData({
        gender: '',
        AGE: '',
        SMOKING: '',
        YELLOW_FINGERS: '',
        ANXIETY: '',
        PEER_PRESSURE: '',
        CHRONIC_DISEASE: '',
        FATIGUE: '',
        ALLERGY: '',
        WHEEZING: '',
        ALCOHOL_CONSUMING: '',
        COUGHING: '',
        SHORTNESS_OF_BREATH: '',
        SWALLOWING_DIFFICULTY: '',
        CHEST_PAIN: ''
      })
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setPrediction({
        level: "ERROR",
        description: "Unable to process prediction. Please try again.",
      });
    }
  };
  const getRiskColor = (level) => {
    switch(level) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      case 'MODERATE': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Lung Cancer Risk Assessment</h1>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Disclaimer:</strong> This tool is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  // value={formData.AGE}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {[
                { name: 'SMOKING', label: 'Smoking' },
                { name: 'YELLOW_FINGERS', label: 'Yellow Fingers' },
                { name: 'ANXIETY', label: 'Anxiety' },
                { name: 'PEER_PRESSURE', label: 'Peer Pressure' },
                { name: 'CHRONIC_DISEASE', label: 'Chronic Disease' },
                { name: 'FATIGUE', label: 'Fatigue' },
                { name: 'ALLERGY', label: 'Allergy' },
                { name: 'WHEEZING', label: 'Wheezing' },
                { name: 'ALCOHOL_CONSUMING', label: 'Alcohol Consuming' },
                { name: 'COUGHING', label: 'Coughing' },
                { name: 'SHORTNESS_OF_BREATH', label: 'Shortness of Breath' },
                { name: 'SWALLOWING_DIFFICULTY', label: 'Swallowing Difficulty' },
                { name: 'CHEST_PAIN', label: 'Chest Pain' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="2">Yes</option>
                    <option value="1">No</option>
                  </select>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Predict Risk'}
            </button>
          </form>

          {prediction && (
            <div className="mt-8 space-y-4">
              <div className={`p-6 rounded-lg border-2 ${getRiskColor(prediction.riskLevel)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {prediction.level === 'LOW' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <AlertCircle className="w-6 h-6" />
                  )}
                  <h2 className="text-2xl font-bold">
                    Risk Level: {prediction.level}
                  </h2>
                </div>
                {prediction.description && (
                  <p className="text-sm font-medium mb-2">
                    Confidence: {prediction.description}
                  </p>
                )}
                {/* <p className="text-sm mt-2">{prediction.explanation}</p> */}
              </div>

              {/* {prediction.keyFactors && prediction.keyFactors.length > 0 && (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Key Risk Factors:</h3>
                  <ul className="space-y-1">
                    {prediction.keyFactors.map((factor, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* {prediction.recommendation && (
                <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-indigo-900 mb-2">Recommendation:</h3>
                  <p className="text-sm text-indigo-800">{prediction.recommendation}</p>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}