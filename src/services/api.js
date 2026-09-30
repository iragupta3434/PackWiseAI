// ============================================================
// PackWise AI — API Service Layer
// ============================================================
// This file centralises all API calls. Currently returns demo data.
// Replace mock returns with real fetch() calls once FastAPI backend is ready.
// Environment: VITE_API_BASE_URL=http://localhost:8000 (set in .env)
// ============================================================

import {
  DEMO_RECOMMENDATIONS,
  DEMO_EXPLANATION_CHAIN,
  DEMO_WHATIF_SCENARIOS,
  DEMO_MAP_CALCULATION,
  MATERIALS_DB,
} from '../data/mockData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Simulated network delay for realistic UX during demo
const MOCK_DELAY_MS = 1800;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- Packaging Analysis ----
export async function analyzePackaging(formData) {
  // TODO: Replace with real API call when backend is ready
  // const response = await fetch(`${API_BASE_URL}/api/analyze`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData),
  // });
  // return response.json();

  await delay(MOCK_DELAY_MS);
  return {
    ...DEMO_RECOMMENDATIONS,
    product: formData?.commodity || DEMO_RECOMMENDATIONS.product,
    conditions: {
      temperature: formData?.storageTemperature ? `${formData.storageTemperature}°C` : DEMO_RECOMMENDATIONS.conditions.temperature,
      humidity: formData?.relativeHumidity ? `${formData.relativeHumidity}% RH` : DEMO_RECOMMENDATIONS.conditions.humidity,
      shelfLife: formData?.targetShelfLife || DEMO_RECOMMENDATIONS.conditions.shelfLife,
      storageType: formData?.storageType || DEMO_RECOMMENDATIONS.conditions.storageType,
    },
    isDemoData: true,
    timestamp: new Date().toISOString(),
  };
}

// ---- Explainability ----
export async function getExplanation(recommendationId) {
  // TODO: Replace with real API call
  await delay(600);
  return {
    chain: DEMO_EXPLANATION_CHAIN,
    recommendationId,
    isDemoData: true,
  };
}

// ---- What-If Simulation ----
export async function runWhatIfSimulation(params) {
  // TODO: Replace with real API call
  await delay(MOCK_DELAY_MS);
  return {
    ...DEMO_WHATIF_SCENARIOS,
    modified: {
      ...DEMO_WHATIF_SCENARIOS.modified,
      temperature: params?.temperature || DEMO_WHATIF_SCENARIOS.modified.temperature,
      film: params?.film || DEMO_WHATIF_SCENARIOS.modified.film,
    },
    isDemoData: true,
    timestamp: new Date().toISOString(),
  };
}

// ---- Material Database ----
export async function getMaterials(filters = {}) {
  // TODO: Replace with real API call
  await delay(400);
  let results = [...MATERIALS_DB];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (m) =>
        m.material.toLowerCase().includes(q) ||
        m.structure.toLowerCase().includes(q) ||
        m.applications.some((a) => a.toLowerCase().includes(q))
    );
  }
  if (filters.barrierClass) {
    results = results.filter((m) => m.barrierClass === filters.barrierClass);
  }
  return { materials: results, total: results.length, isDemoData: true };
}

// ---- MAP Calculation ----
export async function calculateMAP(params) {
  // TODO: Replace with real calculation
  await delay(1200);
  return {
    ...DEMO_MAP_CALCULATION,
    produceType: params?.produceType || DEMO_MAP_CALCULATION.produceType,
    isDemoData: true,
  };
}
