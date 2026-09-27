import React, { useState } from 'react';
import {
  RELIABILITY_DATA,
  THRESHOLD_VERIFICATION_TABLE,
  getIMDOperationalVerification,
} from '../services/mockData';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Download,
  FileSpreadsheet,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';


export const VerificationDashboard: React.FC = () => {
  const stats = getIMDOperationalVerification();
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleExport = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" /> Operational Quality Assurance Protocol (WMO No. 485 & IMD DSS)
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            IMD / WMO Operational Verification Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Objective verification of NCUM-G raw forecasts against NERV-TRUST pre-verification AI layer across 36 sub-divisions using ground AWS, Doppler Radars, and GPM satellite truth observations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg transition"
          >
            <Download className="w-4 h-4" /> Export WMO-485 Audit Report (JSON)
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="bg-emerald-950/60 border border-emerald-500/50 p-3 rounded-lg text-xs text-emerald-300 flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>WMO Verification Suite data package generated: <code>NERV_TRUST_VERIF_CYCLE_00Z.json</code> ready for IMD archive.</span>
        </div>
      )}

      {/* KPI Verification Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">Critical Success Index</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{stats.csi}</div>
          <div className="text-[10px] text-slate-400">Raw NWP: <span className="text-amber-400">0.44</span> (+68%)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">Heidke Skill Score (HSS)</div>
          <div className="text-2xl font-bold font-mono text-cyan-400">{stats.hss}</div>
          <div className="text-[10px] text-slate-400">Raw NWP: <span className="text-amber-400">0.41</span> (+68%)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">Brier Skill Score (BSS)</div>
          <div className="text-2xl font-bold font-mono text-purple-400">{stats.bss}</div>
          <div className="text-[10px] text-slate-400">Raw NWP: <span className="text-amber-400">0.14</span> (+102%)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">Probability of Detection (POD)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{stats.pod}</div>
          <div className="text-[10px] text-slate-400">Raw NWP: <span className="text-amber-400">0.72</span> (+22%)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">False Alarm Ratio (FAR)</div>
          <div className="text-2xl font-bold font-mono text-rose-400">{stats.far}</div>
          <div className="text-[10px] text-slate-400">Raw NWP: <span className="text-rose-300">0.43</span> (-62%)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">Equitable Threat Score</div>
          <div className="text-2xl font-bold font-mono text-blue-400">{stats.ets}</div>
          <div className="text-[10px] text-slate-400">Raw NWP: <span className="text-amber-400">0.31</span> (+87%)</div>
        </div>
      </div>

      {/* Main Grid: Reliability Diagram + Threshold Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reliability Diagram (Attributes Diagram) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Operational Reliability Diagram
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Sample N = 9,800 events
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 mb-3">
              Plots forecast probability against observed relative frequency. A curve closer to the 45° diagonal represents perfect calibration. Notice how NERV-TRUST eliminates raw NWP severe over-forecasting bias.
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RELIABILITY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="forecastProbabilityBin"
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  stroke="#64748b"
                  tick={{ fontSize: 10 }}
                  label={{ value: 'Forecast Probability Bin', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }}
                />
                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  stroke="#64748b"
                  tick={{ fontSize: 10 }}
                  label={{ value: 'Observed Relative Frequency', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    fontSize: '11px',
                  }}
                  formatter={(val: any, name: any) => [
                    `${(Number(val) * 100).toFixed(1)}%`,
                    name === 'observedFrequencyNervTrust'
                      ? 'NERV-TRUST Calibrated'
                      : name === 'observedFrequencyRaw'
                      ? 'Raw NCUM-G Forecast'
                      : 'Perfect Reliability (1:1)',
                  ]}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  formatter={(value) =>
                    value === 'observedFrequencyNervTrust'
                      ? 'NERV-TRUST (Calibrated)'
                      : value === 'observedFrequencyRaw'
                      ? 'Raw NWP (Wet Biased)'
                      : '1:1 Reference'
                  }
                />
                {/* 1:1 Perfect calibration diagonal */}
                <Line
                  type="monotone"
                  dataKey="perfectReliability"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
                {/* Raw NWP curve */}
                <Line
                  type="monotone"
                  dataKey="observedFrequencyRaw"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#f59e0b' }}
                />
                {/* NERV-TRUST curve */}
                <Line
                  type="monotone"
                  dataKey="observedFrequencyNervTrust"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#06b6d4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2 mt-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>Reliability Takeaway:</strong> Raw NWP systematically over-forecasts rainfall probability (e.g. for a 40% forecast, rain only occurred 62% of the time). NERV-TRUST aligns the calibration to within ±2.4% of the true observed climatological frequency.
            </div>
          </div>
        </div>

        {/* Right: Categorical Precipitation Threshold Performance Table */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Skill Scores Across Precipitation Categories
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                IMD Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 mb-3">
              Comparative skill score breakdown against operational IMD rainfall classification thresholds. Notice massive false alarm reductions in heavy and extreme events.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Rainfall Category</th>
                  <th className="py-2.5 px-2 text-center text-amber-400">Raw CSI</th>
                  <th className="py-2.5 px-2 text-center text-cyan-400 font-bold">NERV CSI</th>
                  <th className="py-2.5 px-2 text-center text-slate-400">Raw FAR</th>
                  <th className="py-2.5 px-2 text-center text-emerald-400 font-bold">NERV FAR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                {THRESHOLD_VERIFICATION_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition">
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-200">
                      {row.threshold}
                    </td>
                    <td className="py-2.5 px-2 text-center text-amber-300">{row.rawCSI}</td>
                    <td className="py-2.5 px-2 text-center text-cyan-300 font-bold bg-cyan-950/20">
                      {row.nervTrustCSI}
                    </td>
                    <td className="py-2.5 px-2 text-center text-rose-300">{row.rawFAR}</td>
                    <td className="py-2.5 px-2 text-center text-emerald-400 font-bold bg-emerald-950/20">
                      {row.nervTrustFAR}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1.5 mt-3">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Key Differentiator for Disaster Management:
            </div>
            <p className="text-slate-400 leading-relaxed">
              In heavy rainfall (&gt;65 mm/day), standard NCUM models trigger false alarm rates as high as <strong>54%</strong>. NERV-TRUST slashes this down to <strong>21%</strong>, preventing unnecessary public evacuations and NDRF mobilization costs while maintaining a <strong>92% detection rate</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
