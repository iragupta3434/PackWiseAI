import { createContext, useContext, useState } from 'react';

const AnalysisContext = createContext(null);

const INITIAL_FORM = {
  // Step 1: Food Profile
  commodity: '',
  moistureContent: '',
  fatContent: '',
  pH: '',
  waterActivity: '',
  oxidationSensitivity: 'medium',

  // Step 2: Storage Conditions
  storageTemperature: '',
  relativeHumidity: '',
  storageType: 'ambient',
  targetShelfLife: '',
  transportationDistance: '',
  transportationDuration: '',

  // Step 3: Business Requirements
  budget: 'medium',
  sustainabilityPreference: 'balanced',
  packagingFormat: '',
  priorityPerformance: 50,
  priorityCost: 25,
  prioritySustainability: 25,

  // Step 4: Fresh Produce / MAP
  respirationRate: '',
  produceType: '',
  packWeight: '',
  filmArea: '',
  targetO2: '',
  targetCO2: '',
};

export function AnalysisProvider({ children }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setResults(null);
    setCurrentStep(1);
  };

  const isFreshProduce = ['fresh-vegetables', 'fresh-fruits', 'leafy-greens', 'mushrooms'].includes(formData.commodity);

  return (
    <AnalysisContext.Provider
      value={{
        formData,
        updateField,
        updateFields,
        resetForm,
        results,
        setResults,
        isAnalyzing,
        setIsAnalyzing,
        currentStep,
        setCurrentStep,
        isFreshProduce,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
  return ctx;
}
