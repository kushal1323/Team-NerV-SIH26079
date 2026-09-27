import React from 'react';
import type { RegionData, RegionLeadEvaluation } from '../types';
import {
  ShieldAlert,
  BrainCircuit,
  TrendingDown,
  Info,
  FileCheck2,
  Atom,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

interface BustDiagnosticPanelProps {
  region: RegionData;
  evaluation: RegionLeadEvaluation;
  onSelectLeadDay: (day: any) => void;
}

export const BustDiagnosticPanel: React.FC<BustDiagnosticPanelProps> = ({
  region,
  evaluation,
  onSelectLeadDay,
}) => {

  const isHighRisk = evaluation.bustProbability >= 65;
  const isModerateRisk = evaluation.bustProbability >= 35 && evaluation.bustProbability < 65;

  const riskColor = isHighRisk
    ? 'text-red-400'
    : isModerateRisk
    ? 'text-amber-400'
    : 'text-emerald-400';

  const riskBg = isHighRisk
    ? 'bg-red-500/10 border-red-500/30'
    : isModerateRisk
    ? 'bg-amber-500/10 border-amber-500/30'
    : 'bg-emerald-500/10 border-emerald-500/30';

  // SVG Gauge Calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (evaluation.bustProbability / 100) * circumference;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800/90 rounded-xl p-4 shadow-2xl backdrop-blur-md flex flex-col gap-4 text-slate-100">
      {/* 1. Selected Region & Lead Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Sub-Division #{region.subDivisionNo}
            </span>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs text-slate-400 font-mono">
              [{region.center[0]}°N, {region.center[1]}°E]
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {region.name}
            <span className="text-xs px-2 py-0.5 rounded font-normal font-sans bg-slate-800 text-slate-300 border border-slate-700">
              {region.code}
            </span>
          </h2>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>{region.climateZone}</span>
          </div>
        </div>

        {/* Lead Horizon Badge */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
          <div className="text-[11px] text-slate-400 font-mono">Forecast Horizon</div>
          <div className="text-base font-bold text-cyan-300 font-mono flex items-center gap-1">
            Day {evaluation.leadDay}
            <span className="text-xs font-normal text-slate-400">(T+{evaluation.leadHours}h)</span>
          </div>
        </div>
      </div>

      {/* 2. Bust Risk Gauge & Probability Overview */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center gap-4 ${riskBg} transition-all`}>
        {/* Radial SVG Gauge */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background Track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="rgba(30, 41, 59, 0.8)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Dynamic Risk Arc */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={
                isHighRisk ? '#ef4444' : isModerateRisk ? '#f59e0b' : '#10b981'
              }
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-2xl font-black font-mono leading-none ${riskColor}`}>
              {evaluation.bustProbability}%
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
              Risk
            </span>
          </div>
        </div>

        {/* Diagnostic Verdict & Classification */}
        <div className="flex-1 space-y-1.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-extrabold uppercase tracking-wide border flex items-center gap-1.5 ${
                isHighRisk
                  ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                  : isModerateRisk
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {evaluation.riskLevel} Bust Likelihood
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Confidence: <strong className="text-white">{evaluation.confidenceScore}%</strong>
            </span>
          </div>

          <h3 className="text-sm font-semibold text-slate-200">
            Anomaly: <span className="text-white">{evaluation.bustType}</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {evaluation.physicsAttribution.summaryStatement}
          </p>
        </div>
      </div>

      {/* 3. Dual-Head CRPS Bias-Correction Module (Head 2 Engine) */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Dual-Head CRPS Bias-Correction (Head 2)
            </h4>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-semibold">
            CRPS Improved +{evaluation.dualHead.crpsImprovementPct}%
          </span>
        </div>

        {/* Forecast Comparison Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Raw NWP Model Output */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-3 space-y-1">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span>Raw NCUM-G Model</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">Baseline</span>
            </div>
            <div className="text-xl font-bold font-mono text-amber-300">
              {evaluation.dualHead.rawForecastValue} <span className="text-xs font-sans text-slate-400">{evaluation.dualHead.unit}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>Raw CRPS: {evaluation.dualHead.crpsRaw}</span>
              <span>RMSE: {evaluation.dualHead.rmseRaw}</span>
            </div>
          </div>

          {/* NERV-TRUST Corrected Estimate with Uncertainty */}
          <div className="bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/40 rounded-lg p-3 space-y-1 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <div className="text-[11px] font-medium text-cyan-400 flex items-center justify-between">
              <span>NERV-TRUST Corrected</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono font-semibold">μ_corr ± σ</span>
            </div>
            <div className="text-xl font-bold font-mono text-cyan-300">
              {evaluation.dualHead.biasCorrectedMean} <span className="text-xs font-normal text-cyan-400">± {evaluation.dualHead.biasCorrectedStdDev}</span>{' '}
              <span className="text-xs font-sans text-slate-400">{evaluation.dualHead.unit}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span className="text-emerald-400">CRPS: {evaluation.dualHead.crpsCorrected}</span>
              <span className="text-emerald-400">RMSE: {evaluation.dualHead.rmseCorrected}</span>
            </div>
          </div>
        </div>

        {/* Uncertainty Range Bar (95% Confidence Interval) */}
        <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Probabilistic 95% Confidence Band [μ ± 1.96σ]:</span>
            <span className="text-cyan-300 font-bold">
              {evaluation.dualHead.uncertaintyLow} – {evaluation.dualHead.uncertaintyHigh} {evaluation.dualHead.unit}
            </span>
          </div>
          <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full opacity-80"
              style={{
                left: `${Math.max(10, Math.min(80, (evaluation.dualHead.uncertaintyLow / (evaluation.dualHead.rawForecastValue * 1.5)) * 100))}%`,
                right: `${Math.max(10, 100 - (evaluation.dualHead.uncertaintyHigh / (evaluation.dualHead.rawForecastValue * 1.5)) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Physics Template Explainability Engine (XAI) */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Atom className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Physics Explainability Engine (XAI)
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Thermodynamic Attribution</span>
        </div>

        {/* MoES Physics Rule Callout */}
        <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 flex items-start gap-2">
          <FileCheck2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-semibold text-purple-300 text-[11px]">
              Active Atmospheric Attribution Rule:
            </div>
            <div className="text-[11px] leading-relaxed text-slate-300">
              {evaluation.physicsAttribution.thermodynamicRule}
            </div>
          </div>
        </div>

        {/* Physics Attribution Driver Features */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Top Thermodynamic Driving Features:
          </div>
          {evaluation.physicsAttribution.features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {feat.factor}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {feat.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {feat.impactScore}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                  style={{ width: `${feat.impactScore}%` }}
                />
              </div>
              <div className="text-[10.5px] text-slate-400 leading-snug">
                {feat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Lead-Time Confidence Decay Curve (Recharts) */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Confidence Decay & Bust Risk Drift (Day 1–10)
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Horizon Curve</span>
        </div>

        <div className="h-44 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={evaluation.decayCurve}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              onClick={(e: any) => {
                if (e && e.activeLabel) {
                  onSelectLeadDay(Number(e.activeLabel));
                }
              }}
              className="cursor-pointer"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="day"
                tickFormatter={(v) => `D${v}`}
                stroke="#64748b"
                tick={{ fontSize: 10 }}
              />
              <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '11px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
                formatter={(val: any, name: any) => [
                  `${val}%`,
                  name === 'confidence' ? 'Confidence' : 'Bust Probability',
                ]}
                labelFormatter={(lbl) => `Lead Day ${lbl} (T+${Number(lbl) * 24}h)`}
              />
              <ReferenceLine
                x={evaluation.leadDay}
                stroke="#38bdf8"
                strokeDasharray="3 3"
                label={{ value: 'Active', fill: '#38bdf8', fontSize: 10 }}
              />
              <Line
                type="monotone"
                dataKey="confidence"
                name="confidence"
                stroke="#10b981"
                strokeWidth={2.2}
                dot={{ r: 2.5, fill: '#10b981' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="bustRisk"
                name="bustRisk"
                stroke="#f43f5e"
                strokeWidth={2.2}
                dot={{ r: 2.5, fill: '#f43f5e' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 text-[10.5px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-emerald-500 rounded-sm"></span> Confidence Score (%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-rose-500 rounded-sm"></span> Bust Probability (%)
          </span>
        </div>
      </div>
    </div>
  );
};
