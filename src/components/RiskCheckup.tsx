import React, { useState } from 'react';
import { Calculator, Activity, AlertCircle } from 'lucide-react';
import { RiskCalculator } from '../utils/riskCalculator';
import type { RiskAssessmentForm } from '../types';

export default function RiskCheckup() {
  const [formData, setFormData] = useState<RiskAssessmentForm>({
    pregnancies: 0,
    glucose: 100,
    bloodPressure: 80,
    skinThickness: 20,
    insulin: 80,
    bmi: 25,
    diabetesPedigreeFunction: 0.5,
    age: 30
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: keyof RiskAssessmentForm, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRisk = () => {
    const riskResults = RiskCalculator.calculateMultiHorizonRisk(formData);
    setResults(riskResults);
  };

  const getTierColor = (tier: number) => {
    const colors = {
      1: 'text-green-600 bg-green-100 border-green-200',
      2: 'text-blue-600 bg-blue-100 border-blue-200',
      3: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      4: 'text-orange-600 bg-orange-100 border-orange-200',
      5: 'text-red-600 bg-red-100 border-red-200'
    };
    return colors[tier as keyof typeof colors] || colors[3];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-6">
          <Calculator className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Risk Assessment Calculator</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pregnancies
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={formData.pregnancies}
                onChange={(e) => handleInputChange('pregnancies', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Glucose Level (mg/dL)
              </label>
              <input
                type="number"
                min="50"
                max="300"
                value={formData.glucose}
                onChange={(e) => handleInputChange('glucose', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure (mmHg)
              </label>
              <input
                type="number"
                min="40"
                max="200"
                value={formData.bloodPressure}
                onChange={(e) => handleInputChange('bloodPressure', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skin Thickness (mm)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.skinThickness}
                onChange={(e) => handleInputChange('skinThickness', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insulin Level (μU/mL)
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={formData.insulin}
                onChange={(e) => handleInputChange('insulin', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BMI (Body Mass Index)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                step="0.1"
                value={formData.bmi}
                onChange={(e) => handleInputChange('bmi', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diabetes Pedigree Function
              </label>
              <input
                type="number"
                min="0"
                max="3"
                step="0.001"
                value={formData.diabetesPedigreeFunction}
                onChange={(e) => handleInputChange('diabetesPedigreeFunction', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => handleInputChange('age', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={calculateRisk}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Activity className="h-5 w-5 mr-2" />
            Calculate Risk Score
          </button>
        </div>
      </div>

      {results && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-6 w-6 text-orange-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Risk Assessment Results</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">30-Day Risk</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{results.p30}%</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTierColor(results.tier30)}`}>
                  Tier {results.tier30}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">60-Day Risk</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{results.p60}%</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTierColor(results.tier60)}`}>
                  Tier {results.tier60}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">90-Day Risk</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{results.p90}%</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTierColor(results.tier90)}`}>
                  Tier {results.tier90}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Overall Risk Assessment</h4>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getTierColor(results.finalTier)}`}>
                {results.riskCategory} Risk (Tier {results.finalTier})
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Final Risk Score: {results.finalScore}</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    results.finalTier <= 2 ? 'bg-green-500' :
                    results.finalTier === 3 ? 'bg-yellow-500' :
                    results.finalTier === 4 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((results.finalScore / 5) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Recommended Care Plan:</p>
              <p className="text-sm text-blue-800 bg-white border border-blue-200 rounded-md p-3">
                {results.carePlan}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}