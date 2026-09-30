// ============================================================
// PackWise AI — Packaging Engine (Frontend Demo Layer)
// ============================================================
// Contains demo-mode business logic for what-if calculations,
// MAP OTR estimation, and risk scoring.
// Replace these functions with real API calls when FastAPI backend is ready.
//
// IMPORTANT: All outputs are model estimates only.
// They are NOT laboratory-validated values.
// ============================================================

// ---- Risk Level Scoring ----
export function scoreOxidationRisk(otr, fatContent, shelfLifeDays = 180) {
  // Demo scoring logic — NOT scientifically validated
  // Higher OTR + higher fat + longer shelf life = higher oxidation risk
  const otrNum = typeof otr === 'number' ? otr : parseFloat(otr) || 0;
  const fat = parseFloat(fatContent) || 0;
  const normalizedOTR = Math.min(otrNum / 100, 10);
  const fatFactor = fat > 20 ? 2 : fat > 10 ? 1.3 : 0.8;
  const shelfFactor = shelfLifeDays > 120 ? 1.5 : shelfLifeDays > 60 ? 1.1 : 0.8;
  const score = normalizedOTR * fatFactor * shelfFactor;
  if (score < 0.3) return 'Very Low';
  if (score < 1) return 'Low';
  if (score < 3) return 'Moderate';
  if (score < 6) return 'High';
  return 'Very High';
}

export function scoreMoistureRisk(wvtr, moistureContent, humidity = 60) {
  const wvtrNum = typeof wvtr === 'number' ? wvtr : parseFloat(wvtr) || 0;
  const mc = parseFloat(moistureContent) || 0;
  const isHygroscopic = mc < 5; // dry products absorb moisture
  const humidityFactor = humidity > 70 ? 1.8 : humidity > 50 ? 1.2 : 0.8;
  const score = wvtrNum * (isHygroscopic ? 1.5 : 0.7) * humidityFactor;
  if (score < 0.5) return 'Very Low';
  if (score < 2) return 'Low';
  if (score < 8) return 'Moderate';
  if (score < 20) return 'High';
  return 'Very High';
}

// ---- Quality Index (Demo Model) ----
export function estimateQualityIndex(otr, wvtr, temperature, humidity, shelfLifeDays = 180) {
  // Demo linear decay model — NOT scientifically validated
  const otrNum = typeof otr === 'number' ? otr : parseFloat(otr) || 0;
  const wvtrNum = typeof wvtr === 'number' ? wvtr : parseFloat(wvtr) || 0;
  const tempPenalty = Math.max(0, (temperature - 4) * 0.3);
  const otrPenalty = Math.min(40, Math.log10(otrNum + 1) * 12);
  const wvtrPenalty = Math.min(20, wvtrNum * 1.5);
  const humidityPenalty = Math.max(0, (humidity - 60) * 0.1);
  const shelfPenalty = Math.min(10, (shelfLifeDays / 30) * 0.5);
  const rawIndex = 100 - tempPenalty - otrPenalty - wvtrPenalty - humidityPenalty - shelfPenalty;
  return Math.max(10, Math.min(98, Math.round(rawIndex)));
}

// ---- Shelf Life Estimate (Demo Model) ----
export function estimateShelfLife(otr, wvtr, temperature, humidity, targetDays = 180) {
  // Demo estimate — NOT laboratory validated
  const qi = estimateQualityIndex(otr, wvtr, temperature, humidity, targetDays);
  if (qi >= 85) return `${Math.round(targetDays * 0.95)}–${targetDays} days (est.)`;
  if (qi >= 70) return `${Math.round(targetDays * 0.6)}–${Math.round(targetDays * 0.75)} days (est.)`;
  if (qi >= 50) return `${Math.round(targetDays * 0.35)}–${Math.round(targetDays * 0.5)} days (est.)`;
  return `<${Math.round(targetDays * 0.3)} days (est.)`;
}

// ---- What-If Scenario Computation (Demo) ----
export function computeWhatIfScenario(params, baseScenarios) {
  const {
    temperature = 8,
    humidity = 85,
    film = 'PET/LLDPE Laminate',
    thicknessMicron = 72,
    otr = 65,
    wvtr = 6,
  } = params;

  const baseline = { ...baseScenarios.baseline };

  // Compute modified scenario from params
  const qualityIndex = estimateQualityIndex(otr, wvtr, temperature, humidity);
  const oxidationRisk = scoreOxidationRisk(otr, 35);
  const moistureRisk = scoreMoistureRisk(wvtr, 2, humidity);

  // Cost estimate based on OTR range
  let costEstimate = '₹Unknown';
  if (otr < 1) costEstimate = '₹75–95/m²';
  else if (otr < 50) costEstimate = '₹45–65/m²';
  else if (otr < 500) costEstimate = '₹35–48/m²';
  else costEstimate = '₹18–30/m²';

  const modified = {
    label: 'Modified Scenario',
    temperature,
    humidity,
    film,
    thicknessMicron,
    otr,
    wvtr,
    qualityIndex,
    oxidationRisk,
    moistureRisk,
    overallRisk: oxidationRisk,
    shelfLifeEstimate: estimateShelfLife(otr, wvtr, temperature, humidity),
    estimatedCost: costEstimate,
    note: 'DEMO/MODEL-ESTIMATE — not laboratory validated',
  };

  // Diff metrics
  const diff = {
    qualityIndex: modified.qualityIndex - baseline.qualityIndex,
    temperatureChange: temperature - baseline.temperature,
    otrChange: otr - baseline.otr,
    wvtrChange: wvtr - baseline.wvtr,
  };

  return { baseline, modified, diff };
}

// ---- MAP OTR Requirement Estimator (Demo) ----
export function estimateMAPOTR(respirationRate, packWeight, filmArea, targetO2, targetCO2) {
  // Demo estimation — NOT validated MAP engineering calculation
  // Required OTR ≈ (respirationRate × packWeight/1000) / (filmArea × O2_target_fraction)
  const rr = parseFloat(respirationRate) || 45;
  const pw = parseFloat(packWeight) || 150;
  const fa = parseFloat(filmArea) || 0.04;
  const o2Target = parseFloat(targetO2) || 5;

  const o2Fraction = (21 - o2Target) / 21;
  const otrRequired = ((rr * pw / 1000) / fa) * o2Fraction * 24 * 1000;

  return {
    estimatedOTR: Math.round(otrRequired),
    otrRange: `${Math.round(otrRequired * 0.7).toLocaleString()}–${Math.round(otrRequired * 1.4).toLocaleString()}`,
    unit: 'cc/m²/day/atm',
    note: 'DEMO ESTIMATION — Use validated MAP engineering calculation for actual design',
    isEstimate: true,
  };
}

// ---- Sustainability Score Label ----
export function sustainabilityLabel(score) {
  if (score >= 7) return { label: 'High', color: 'green' };
  if (score >= 5) return { label: 'Moderate', color: 'blue' };
  if (score >= 3) return { label: 'Low', color: 'amber' };
  return { label: 'Very Low', color: 'red' };
}

// ---- Risk Color Map ----
export function riskColor(riskLevel) {
  const map = {
    'Very Low': 'green',
    'Low': 'blue',
    'Moderate': 'amber',
    'High': 'red',
    'Very High': 'red',
    'n/a-produce': 'emerald',
  };
  return map[riskLevel] || 'slate';
}
