export type WeatherVariable = 'rainfall' | 'cape' | 'temperature' | 'wind850';

export interface VariableMeta {
  id: WeatherVariable;
  name: string;
  unit: string;
  shortName: string;
  bustThreshold: string;
  description: string;
}

export type LeadDay = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface RegionData {
  id: string;
  name: string;
  code: string;
  subDivisionNo: number;
  center: [number, number]; // lat, lon
  latLngPolygon: [number, number][]; // [lat, lon] coordinates for geographic Leaflet polygon
  svgPath: string; // SVG path or polygon representation on map projection
  labelCoords: [number, number];
  climateZone: string;
}


export interface PhysicsDriver {
  factor: string;
  impactScore: number; // 0 to 100
  anomalyType: 'Positive' | 'Negative' | 'Divergence' | 'Phase Shift';
  description: string;
  level: string; // e.g., '850 hPa', 'Surface', '200 hPa', 'Boundary Layer'
}

export interface DualHeadCorrection {
  rawForecastValue: number;
  biasCorrectedMean: number;
  biasCorrectedStdDev: number;
  uncertaintyLow: number;
  uncertaintyHigh: number;
  unit: string;
  crpsRaw: number;
  crpsCorrected: number;
  crpsImprovementPct: number;
  rmseRaw: number;
  rmseCorrected: number;
}

export interface RegionLeadEvaluation {
  regionId: string;
  leadDay: LeadDay;
  leadHours: number; // e.g. 24, 48, ... 240
  variable: WeatherVariable;
  bustProbability: number; // 0 to 100%
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  confidenceScore: number; // 0 to 100%
  bustType: string;
  dualHead: DualHeadCorrection;
  physicsAttribution: {
    summaryStatement: string;
    primaryDriver: string;
    thermodynamicRule: string;
    features: PhysicsDriver[];
  };
  decayCurve: {
    day: LeadDay;
    confidence: number;
    bustRisk: number;
    rawCrps: number;
    correctedCrps: number;
  }[];
}

export interface IMDVerificationStats {
  csi: number; // Critical Success Index (0-1)
  hss: number; // Heidke Skill Score (-1 to 1)
  bss: number; // Brier Skill Score (0-1)
  pod: number; // Probability of Detection
  far: number; // False Alarm Ratio
  ets: number; // Equitable Threat Score
  evaluatedGridsCount: number;
  flaggedBustsCount: number;
  activeAlerts: number;
  lastRecalibrated: string;
}

export interface ReliabilityPoint {
  forecastProbabilityBin: number; // 0.1, 0.2, ... 1.0
  observedFrequencyRaw: number;
  observedFrequencyNervTrust: number;
  perfectReliability: number;
  sampleCount: number;
}
