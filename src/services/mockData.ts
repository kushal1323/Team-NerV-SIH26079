import type {
  WeatherVariable,
  VariableMeta,
  LeadDay,
  RegionData,
  RegionLeadEvaluation,
  IMDVerificationStats,
  ReliabilityPoint,
} from '../types';


export const VARIABLES: Record<WeatherVariable, VariableMeta> = {
  rainfall: {
    id: 'rainfall',
    name: 'Precipitation Flux',
    unit: 'mm/day',
    shortName: 'Rainfall',
    bustThreshold: 'Δ > 35 mm/day or categorical error',
    description: 'NCUM-G 24-hr accumulated rainfall against GPM/AWS ground observations.',
  },
  cape: {
    id: 'cape',
    name: 'Convective Available Potential Energy',
    unit: 'J/kg',
    shortName: 'CAPE',
    bustThreshold: 'Δ > 650 J/kg thermodynamic drift',
    description: 'Atmospheric instability measure indicating severe thunderstorm potential.',
  },
  temperature: {
    id: 'temperature',
    name: '2-Meter Surface Temperature',
    unit: '°C',
    shortName: '2m Temp',
    bustThreshold: 'Δ > 3.5 °C deviation',
    description: 'Boundary-layer thermodynamic equilibrium and heatwave tracking.',
  },
  wind850: {
    id: 'wind850',
    name: '850 hPa Lower Tropospheric Wind',
    unit: 'knots',
    shortName: '850hPa Wind',
    bustThreshold: 'Directional error > 30° or Speed Δ > 15 kts',
    description: 'Low-Level Jet (LLJ) and monsoon trough moisture transport vector.',
  },
};

// Simplified geo-spatial polygons on a 600x700 map coordinate space representing India's meteorological sub-regions
export const REGIONS: RegionData[] = [
  {
    id: 'konkan-goa',
    name: 'Konkan & Goa',
    code: 'K&G',
    subDivisionNo: 21,
    center: [16.8, 73.5],
    latLngPolygon: [
      [19.2, 72.8],
      [19.8, 73.3],
      [18.5, 73.5],
      [17.0, 73.8],
      [15.0, 74.2],
      [14.9, 73.8],
      [15.8, 73.5],
      [17.8, 73.0],
      [19.2, 72.8],
    ],
    svgPath: 'M 195 400 L 220 395 L 210 495 L 185 490 Z',
    labelCoords: [200, 445],
    climateZone: 'Coastal Western Ghats (High Orographic Lift)',
  },
  {
    id: 'kerala-mahe',
    name: 'Kerala & Mahe',
    code: 'KER',
    subDivisionNo: 31,
    center: [10.5, 76.2],
    latLngPolygon: [
      [12.5, 75.0],
      [12.1, 75.8],
      [10.8, 76.6],
      [8.5, 77.3],
      [8.2, 77.0],
      [9.5, 76.3],
      [11.2, 75.7],
      [12.5, 75.0],
    ],
    svgPath: 'M 205 500 L 235 495 L 255 595 L 230 610 L 205 540 Z',
    labelCoords: [225, 555],
    climateZone: 'Tropical Wet Monsoon Coast',
  },
  {
    id: 'gangetic-wb',
    name: 'Gangetic West Bengal',
    code: 'GWB',
    subDivisionNo: 6,
    center: [23.0, 88.0],
    latLngPolygon: [
      [24.5, 87.8],
      [24.1, 88.7],
      [23.0, 88.9],
      [21.6, 88.3],
      [21.8, 87.3],
      [22.8, 87.1],
      [24.0, 87.5],
      [24.5, 87.8],
    ],
    svgPath: 'M 405 285 L 450 280 L 445 350 L 410 355 L 395 320 Z',
    labelCoords: [420, 315],
    climateZone: 'Deltaic Convective / Kalbaisakhi Zone',
  },
  {
    id: 'west-rajasthan',
    name: 'West Rajasthan',
    code: 'WRJ',
    subDivisionNo: 14,
    center: [27.0, 71.8],
    latLngPolygon: [
      [29.8, 71.0],
      [29.9, 73.8],
      [28.2, 74.2],
      [26.5, 73.5],
      [24.8, 72.2],
      [24.5, 70.8],
      [25.8, 69.8],
      [27.5, 70.1],
      [29.8, 71.0],
    ],
    svgPath: 'M 140 180 L 230 170 L 235 270 L 160 280 L 130 220 Z',
    labelCoords: [180, 225],
    climateZone: 'Arid Desert / Thermal Low Basin',
  },
  {
    id: 'rayalaseema',
    name: 'Rayalaseema',
    code: 'RLS',
    subDivisionNo: 29,
    center: [14.6, 78.3],
    latLngPolygon: [
      [15.9, 77.2],
      [16.1, 79.2],
      [14.5, 79.8],
      [13.4, 79.2],
      [13.2, 78.0],
      [14.5, 77.0],
      [15.9, 77.2],
    ],
    svgPath: 'M 255 460 L 315 450 L 310 525 L 250 520 Z',
    labelCoords: [280, 490],
    climateZone: 'Semi-Arid Rainshadow Plateau',
  },
  {
    id: 'assam-meghalaya',
    name: 'Assam & Meghalaya',
    code: 'ASM',
    subDivisionNo: 3,
    center: [26.0, 92.5],
    latLngPolygon: [
      [27.6, 90.2],
      [28.0, 95.8],
      [26.8, 95.5],
      [25.0, 92.8],
      [25.1, 89.8],
      [26.4, 89.9],
      [27.6, 90.2],
    ],
    svgPath: 'M 465 205 L 565 190 L 580 250 L 490 265 L 460 230 Z',
    labelCoords: [515, 225],
    climateZone: 'Sub-Himalayan Orographic Funnel',
  },
  {
    id: 'punjab',
    name: 'Punjab',
    code: 'PJB',
    subDivisionNo: 12,
    center: [31.0, 75.3],
    latLngPolygon: [
      [32.4, 75.8],
      [32.0, 76.1],
      [30.5, 76.9],
      [29.8, 75.5],
      [30.2, 74.2],
      [31.8, 74.6],
      [32.4, 75.8],
    ],
    svgPath: 'M 200 115 L 255 105 L 260 170 L 205 175 Z',
    labelCoords: [230, 140],
    climateZone: 'North-Western Plains (Western Disturbance Axis)',
  },
  {
    id: 'odisha',
    name: 'Odisha',
    code: 'ODI',
    subDivisionNo: 7,
    center: [20.5, 84.5],
    latLngPolygon: [
      [22.5, 86.6],
      [21.6, 87.4],
      [19.3, 85.1],
      [18.2, 82.8],
      [19.8, 82.5],
      [21.6, 83.6],
      [22.5, 86.6],
    ],
    svgPath: 'M 350 325 L 415 320 L 405 405 L 340 400 Z',
    labelCoords: [375, 360],
    climateZone: 'Bay of Bengal Cyclonic Landfall Zone',
  },
  {
    id: 'gujarat-region',
    name: 'Gujarat Region',
    code: 'GUJ',
    subDivisionNo: 17,
    center: [22.5, 71.8],
    latLngPolygon: [
      [24.5, 71.0],
      [24.6, 73.8],
      [21.5, 73.5],
      [20.5, 72.8],
      [21.2, 71.5],
      [22.2, 69.0],
      [23.4, 68.6],
      [24.0, 70.3],
      [24.5, 71.0],
    ],
    svgPath: 'M 145 285 L 210 275 L 230 355 L 140 360 L 115 315 Z',
    labelCoords: [170, 325],
    climateZone: 'Coastal Semi-Arid / Arabian Sea Confluence',
  },
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    code: 'J&K',
    subDivisionNo: 10,
    center: [34.0, 75.0],
    latLngPolygon: [
      [36.8, 74.2],
      [36.5, 77.8],
      [33.8, 77.5],
      [32.4, 75.6],
      [33.2, 74.0],
      [35.0, 73.9],
      [36.8, 74.2],
    ],
    svgPath: 'M 195 40 L 280 25 L 290 100 L 205 110 Z',
    labelCoords: [235, 70],
    climateZone: 'High-Altitude Alpine Complex Terrain',
  },
  {
    id: 'vidarbha',
    name: 'Vidarbha',
    code: 'VID',
    subDivisionNo: 24,
    center: [21.0, 79.0],
    latLngPolygon: [
      [21.8, 77.2],
      [21.6, 80.8],
      [19.8, 80.3],
      [19.5, 77.6],
      [20.5, 76.6],
      [21.8, 77.2],
    ],
    svgPath: 'M 245 325 L 340 315 L 335 390 L 240 395 Z',
    labelCoords: [285, 355],
    climateZone: 'Central Continental Convective Convergence',
  },
  {
    id: 'coastal-ap',
    name: 'Coastal Andhra Pradesh',
    code: 'CAP',
    subDivisionNo: 28,
    center: [16.8, 81.5],
    latLngPolygon: [
      [19.1, 84.8],
      [18.2, 83.7],
      [16.2, 81.2],
      [14.0, 80.2],
      [14.5, 79.6],
      [16.6, 80.4],
      [18.6, 83.2],
      [19.1, 84.8],
    ],
    svgPath: 'M 320 405 L 375 395 L 340 515 L 300 500 Z',
    labelCoords: [335, 455],
    climateZone: 'Southeastern Marine Tropical Corridor',
  },
];


// Seeded pseudo-random generator for reproducible physics-informed data
function seededFactor(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Generate realistic dynamic evaluation for any (Region, Lead Day, Variable) combination
export function evaluateRegionLead(
  regionId: string,
  leadDay: LeadDay,
  variable: WeatherVariable
): RegionLeadEvaluation {
  const region = REGIONS.find((r) => r.id === regionId) || REGIONS[0];
  const charSum = region.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const seed = charSum * 13 + leadDay * 17;

  // Base bust characteristics based on region climate type
  const isHighConvective = ['konkan-goa', 'kerala-mahe', 'gangetic-wb', 'assam-meghalaya'].includes(region.id);
  const isOrographic = ['konkan-goa', 'kerala-mahe', 'jammu-kashmir', 'assam-meghalaya'].includes(region.id);

  // Bust probability naturally scales with lead time (Day 1: ~12-25%, Day 5: ~45-70%, Day 10: ~65-92%)
  const baseProb = isHighConvective ? 22 : 14;
  const leadScaling = Math.pow(leadDay / 10, 0.85) * 65;
  const regionVariance = (seededFactor(seed) - 0.5) * 16;
  const bustProbability = Math.min(96, Math.max(8, Math.round(baseProb + leadScaling + regionVariance)));

  // Risk categorization
  let riskLevel: RegionLeadEvaluation['riskLevel'] = 'Low';
  if (bustProbability >= 70) riskLevel = 'Critical';
  else if (bustProbability >= 50) riskLevel = 'High';
  else if (bustProbability >= 30) riskLevel = 'Moderate';

  // Confidence decays inversely to lead time
  const confidenceScore = Math.max(18, Math.round(98 - leadDay * 7.4 + (seededFactor(seed + 1) - 0.5) * 6));

  // Determine variable-specific Raw NWP vs Bias-Corrected estimates
  let rawVal = 0;
  let corrVal = 0;
  let stdDev = 0;
  let unit = '';
  let bustType = '';
  let primaryDriver = '';
  let summaryStatement = '';
  let thermodynamicRule = '';

  if (variable === 'rainfall') {
    unit = 'mm/day';
    // Raw NWP often over-predicts orographic/monsoon rain or misses localized bursts
    const baseRain = isHighConvective ? 95 : 32;
    rawVal = Math.round(baseRain + seededFactor(seed + 2) * 65 + leadDay * 4);
    // Corrected value removes typical moist bias or lifts missed convective precipitation
    const biasFactor = isOrographic ? 0.62 : 0.76;
    corrVal = Math.round(rawVal * biasFactor + (seededFactor(seed + 3) - 0.3) * 12);
    // Uncertainty standard deviation grows with lead time
    stdDev = Number((4.5 + leadDay * 1.85 + (rawVal * 0.08)).toFixed(1));
    bustType = rawVal > 110 ? 'Spurious Heavy Precipitation False Alarm' : 'Mesoscale Convective Drift';
    primaryDriver = 'Low-level moisture convergence (850hPa) coupled with boundary layer flux divergence';
    thermodynamicRule = 'Rule NCUM-R18: Western Ghats orographic blocking parameterization over-predicts rainfall by 35-50% when 850hPa wind is perpendicular';
    summaryStatement = `NCUM-G Raw model predicts ${rawVal} mm/day, exhibiting persistent wet bias over ${region.name}. NERV-TRUST CRPS engine recalibrates to ${corrVal} ± ${stdDev} mm/day using dual-head probabilistic correction.`;
  } else if (variable === 'cape') {
    unit = 'J/kg';
    rawVal = Math.round(1800 + seededFactor(seed + 2) * 1400 + leadDay * 80);
    corrVal = Math.round(rawVal * 0.82 - 120);
    stdDev = Number((120 + leadDay * 45).toFixed(0));
    bustType = 'Thermodynamic Instability Over-estimation';
    primaryDriver = 'Surface boundary layer dew-point temperature decoupling';
    thermodynamicRule = 'Rule THERMO-C04: Excessive insolation heating without convective capping inversion triggers spurious pre-monsoon squall forecasts';
    summaryStatement = `Extreme CAPE spike (${rawVal} J/kg) detected. Observation shows mid-tropospheric dry air entrainment suppressing full parcel ascent, dampening effective instability to ${corrVal} J/kg.`;
  } else if (variable === 'temperature') {
    unit = '°C';
    rawVal = Number((34.5 + seededFactor(seed + 2) * 8 + leadDay * 0.3).toFixed(1));
    corrVal = Number((rawVal - (seededFactor(seed + 3) * 2.8 + 0.8)).toFixed(1));
    stdDev = Number((0.6 + leadDay * 0.28).toFixed(1));
    bustType = 'Boundary-Layer Surface Flux Warm Bias';
    primaryDriver = 'Soil moisture feedback deficit in land-surface model coupling';
    thermodynamicRule = 'Rule LAND-T02: Surface sensible heat flux over-estimated due to delayed vegetation greening index in NWP core';
    summaryStatement = `Model surface temp of ${rawVal}°C exhibits positive anomaly vs INSAT-3DR land skin temperatures. NERV-TRUST applies thermal equilibrium correction to ${corrVal} ± ${stdDev}°C.`;
  } else {
    // 850hPa Wind
    unit = 'knots';
    rawVal = Math.round(22 + seededFactor(seed + 2) * 24 + leadDay * 1.5);
    corrVal = Math.round(rawVal * 0.88 + 2);
    stdDev = Number((2.2 + leadDay * 0.95).toFixed(1));
    bustType = 'Low-Level Jet Core Displacement';
    primaryDriver = 'Geostrophic wind imbalance and pressure gradient relaxation error';
    thermodynamicRule = 'Rule DYN-W09: Arabian Sea cross-equatorial monsoon surge axis shifted ~120km south of actual observation';
    summaryStatement = `Raw 850 hPa wind speed of ${rawVal} kts shows strong directional shear mismatch. NERV-TRUST realigns wind vector magnitude to ${corrVal} ± ${stdDev} kts.`;
  }

  // Dual-head CRPS metrics
  const crpsRaw = Number((14.2 + leadDay * 2.4 + seededFactor(seed + 4) * 3.5).toFixed(2));
  const crpsImprovementPct = Number((32 + (10 - leadDay) * 1.5 + seededFactor(seed + 5) * 8).toFixed(1));
  const crpsCorrected = Number((crpsRaw * (1 - crpsImprovementPct / 100)).toFixed(2));
  const rmseRaw = Number((crpsRaw * 1.62).toFixed(1));
  const rmseCorrected = Number((crpsCorrected * 1.48).toFixed(1));

  // Physics attribution features
  const features: RegionLeadEvaluation['physicsAttribution']['features'] = [
    {
      factor: '850 hPa Moisture Convergence Flux',
      impactScore: Math.round(72 + seededFactor(seed + 6) * 24),
      anomalyType: 'Divergence',
      description: 'Model generates excessive water vapor convergence over coastal boundaries.',
      level: '850 hPa',
    },
    {
      factor: 'Convective Trigger & Inversion Cap',
      impactScore: Math.round(65 + seededFactor(seed + 7) * 25),
      anomalyType: 'Phase Shift',
      description: 'Premature convective initiation by ~3.5 hours relative to diurnal radar signature.',
      level: '700 - 850 hPa',
    },
    {
      factor: 'Vertical Wind Shear (0-6 km)',
      impactScore: Math.round(52 + seededFactor(seed + 8) * 30),
      anomalyType: 'Negative',
      description: 'Under-represented deep layer shear fails to organize multi-cell squall line.',
      level: 'Surface to 500 hPa',
    },
    {
      factor: 'Orographic Drag Parameterization',
      impactScore: Math.round(isOrographic ? 88 : 42 + seededFactor(seed + 9) * 20),
      anomalyType: 'Positive',
      description: 'Sub-grid scale orographic drag miscalculates slope precipitation runoff.',
      level: 'Boundary Layer',
    },
  ];

  // Lead-time decay curve (Day 1 through Day 10)
  const decayCurve = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as LeadDay[]).map((d) => {
    const dSeed = charSum * 13 + d * 17;
    const dRisk = Math.min(95, Math.max(10, Math.round(baseProb + Math.pow(d / 10, 0.85) * 65 + (seededFactor(dSeed) - 0.5) * 12)));
    const dConf = Math.max(15, Math.round(98 - d * 7.6 + (seededFactor(dSeed + 1) - 0.5) * 5));
    const dRawCrps = Number((10.5 + d * 2.8 + seededFactor(dSeed + 2) * 2).toFixed(1));
    const dCorrCrps = Number((dRawCrps * 0.64).toFixed(1));
    return {
      day: d,
      confidence: dConf,
      bustRisk: dRisk,
      rawCrps: dRawCrps,
      correctedCrps: dCorrCrps,
    };
  });

  return {
    regionId: region.id,
    leadDay,
    leadHours: leadDay * 24,
    variable,
    bustProbability,
    riskLevel,
    confidenceScore,
    bustType,
    dualHead: {
      rawForecastValue: rawVal,
      biasCorrectedMean: corrVal,
      biasCorrectedStdDev: stdDev,
      uncertaintyLow: Math.max(0, Number((corrVal - 1.96 * stdDev).toFixed(1))),
      uncertaintyHigh: Number((corrVal + 1.96 * stdDev).toFixed(1)),
      unit,
      crpsRaw,
      crpsCorrected,
      crpsImprovementPct,
      rmseRaw,
      rmseCorrected,
    },
    physicsAttribution: {
      summaryStatement,
      primaryDriver,
      thermodynamicRule,
      features,
    },
    decayCurve,
  };
}

// Operational IMD/WMO verification metrics summary
export function getIMDOperationalVerification(): IMDVerificationStats {
  return {
    csi: 0.742,
    hss: 0.689,
    bss: 0.284,
    pod: 0.884,
    far: 0.162,
    ets: 0.581,
    evaluatedGridsCount: 14280,
    flaggedBustsCount: 3,
    activeAlerts: 2,
    lastRecalibrated: '14:20 UTC (Cycle NCUM-G 00Z Live)',
  };
}

// Reliability diagram curve data comparing Raw NWP vs NERV-TRUST
export const RELIABILITY_DATA: ReliabilityPoint[] = [
  { forecastProbabilityBin: 0.1, observedFrequencyRaw: 0.24, observedFrequencyNervTrust: 0.11, perfectReliability: 0.1, sampleCount: 1840 },
  { forecastProbabilityBin: 0.2, observedFrequencyRaw: 0.38, observedFrequencyNervTrust: 0.21, perfectReliability: 0.2, sampleCount: 1520 },
  { forecastProbabilityBin: 0.3, observedFrequencyRaw: 0.51, observedFrequencyNervTrust: 0.32, perfectReliability: 0.3, sampleCount: 1390 },
  { forecastProbabilityBin: 0.4, observedFrequencyRaw: 0.62, observedFrequencyNervTrust: 0.41, perfectReliability: 0.4, sampleCount: 1140 },
  { forecastProbabilityBin: 0.5, observedFrequencyRaw: 0.71, observedFrequencyNervTrust: 0.51, perfectReliability: 0.5, sampleCount: 980 },
  { forecastProbabilityBin: 0.6, observedFrequencyRaw: 0.79, observedFrequencyNervTrust: 0.61, perfectReliability: 0.6, sampleCount: 820 },
  { forecastProbabilityBin: 0.7, observedFrequencyRaw: 0.86, observedFrequencyNervTrust: 0.70, perfectReliability: 0.7, sampleCount: 640 },
  { forecastProbabilityBin: 0.8, observedFrequencyRaw: 0.92, observedFrequencyNervTrust: 0.81, perfectReliability: 0.8, sampleCount: 490 },
  { forecastProbabilityBin: 0.9, observedFrequencyRaw: 0.96, observedFrequencyNervTrust: 0.89, perfectReliability: 0.9, sampleCount: 320 },
  { forecastProbabilityBin: 1.0, observedFrequencyRaw: 0.98, observedFrequencyNervTrust: 0.97, perfectReliability: 1.0, sampleCount: 180 },
];

// Operational threshold skill comparison table data
export const THRESHOLD_VERIFICATION_TABLE = [
  { threshold: '> 15 mm/day (Moderate Rain)', rawCSI: 0.58, nervTrustCSI: 0.81, rawHSS: 0.52, nervTrustHSS: 0.76, rawFAR: 0.31, nervTrustFAR: 0.12 },
  { threshold: '> 35 mm/day (Rather Heavy)', rawCSI: 0.44, nervTrustCSI: 0.73, rawHSS: 0.41, nervTrustHSS: 0.69, rawFAR: 0.42, nervTrustFAR: 0.17 },
  { threshold: '> 65 mm/day (Heavy Rain)', rawCSI: 0.32, nervTrustCSI: 0.64, rawHSS: 0.34, nervTrustHSS: 0.62, rawFAR: 0.54, nervTrustFAR: 0.21 },
  { threshold: '> 115 mm/day (Very Heavy Rain)', rawCSI: 0.19, nervTrustCSI: 0.52, rawHSS: 0.22, nervTrustHSS: 0.55, rawFAR: 0.68, nervTrustFAR: 0.28 },
];

// Simulated Async API with 250ms realistic network latency
export async function fetchRegionEvaluation(
  regionId: string,
  leadDay: LeadDay,
  variable: WeatherVariable
): Promise<RegionLeadEvaluation> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(evaluateRegionLead(regionId, leadDay, variable));
    }, 200);
  });
}
