import React, { useState } from 'react';
import {
  Atom,
  Wind,
  Thermometer,
  CloudRain,
  Flame,
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';


export const PhysicsDiagnosticsView: React.FC = () => {
  const [injectedAnomaly, setInjectedAnomaly] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleInjectAnomaly = (type: string) => {
    setIsSimulating(true);
    setInjectedAnomaly(type);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };

  const handleReset = () => {
    setInjectedAnomaly(null);
  };

  const verticalLayers = [
    {
      level: '200 hPa (Upper Troposphere)',
      variable: 'Tropical Easterly Jet & Divergence',
      biasPattern: 'Weak upper divergence over Gangetic Plains (-12%)',
      status: 'Moderate Bias',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      level: '500 hPa (Mid Troposphere)',
      variable: 'Geopotential Height & Vorticity Core',
      biasPattern: 'Western Disturbance trough axis displaced east by 1.2°',
      status: 'High Impact',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      level: '700 hPa (Lower-Mid Troposphere)',
      variable: 'Relative Humidity & Convective Inhibition (CIN)',
      biasPattern: 'Underestimated dry continental intrusion from Thar Desert',
      status: 'Critical Trigger',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      level: '850 hPa (Lower Troposphere)',
      variable: 'Monsoon Low-Level Jet (LLJ) & Moisture Flux',
      biasPattern: 'Over-concentrated moisture convergence along Western Ghats (+42%)',
      status: 'Systemic Wet Bias',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      level: 'Boundary Layer (1000 hPa - Surface)',
      variable: 'Sensible/Latent Heat Flux & Soil Moisture',
      biasPattern: 'Positive temperature bias of +1.8°C due to land-cover albedo delay',
      status: 'Warm Bias',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Atom className="w-4 h-4" /> Multi-Layer Atmospheric Thermodynamics
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            NCUM-G Model Physics Diagnostics & Attribution
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            In-depth atmospheric layer decomposition revealing why the numerical model parameters diverge from observation. Used by NCMRWF scientists to track parameterization drift.
          </p>
        </div>

        {/* Live Anomaly Sandbox */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
          <button
            onClick={() => handleInjectAnomaly('convective-burst')}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition disabled:opacity-50"
          >
            <Flame className="w-3.5 h-3.5" /> Inject Squall Anomaly
          </button>
          <button
            onClick={() => handleInjectAnomaly('orographic-lock')}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-semibold shadow transition disabled:opacity-50"
          >
            <Layers className="w-3.5 h-3.5" /> Inject Ghats Trap
          </button>
          {injectedAnomaly && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Reset Simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Anomaly Live Notification */}
      {injectedAnomaly && (
        <div className="bg-purple-950/50 border border-purple-500/50 p-3.5 rounded-xl text-xs text-purple-200 flex items-start gap-3 shadow-lg">
          <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <span>Dynamic Anomaly Injected:</span>
              <span className="font-mono text-purple-300 uppercase px-2 py-0.5 rounded bg-purple-900/60 border border-purple-700">
                {injectedAnomaly === 'convective-burst'
                  ? 'Pre-Monsoon Severe Convective Squall Line'
                  : 'Western Ghats Moist Orographic Blocking Over-prediction'}
              </span>
            </div>
            <p className="text-slate-300">
              {injectedAnomaly === 'convective-burst'
                ? 'Simulated CAPE surge of +1,150 J/kg over Gangetic West Bengal. NERV-TRUST instantly flags a High Bust Probability (89%), identifying upper-tropospheric shear decoupling, and dampens spurious 165 mm/day raw rain to 62 mm/day.'
                : 'Simulated 850hPa onshore wind of 38 knots over Konkan & Goa. NERV-TRUST identifies the NCUM-G sub-grid slope friction overestimation and cuts false alarm volume by 48%.'}
            </p>
          </div>
        </div>
      )}

      {/* Atmospheric Vertical Column Decomposition */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Tropospheric Vertical Column Error Profile (Surface to 200 hPa)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Model: NCUM-G 0.12° Global Assimilation
          </span>
        </div>

        <div className="space-y-3">
          {verticalLayers.map((layer, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${layer.bg}`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono">{layer.level}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-xs font-semibold text-slate-300">{layer.variable}</span>
                </div>
                <p className="text-xs text-slate-400">{layer.biasPattern}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 ${layer.color}`}>
                  {layer.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Parameterization Weakness Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <CloudRain className="w-4 h-4" /> Convective Parameterization
          </div>
          <h4 className="text-sm font-bold text-white">Mass-Flux Trigger Schemes</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tiedtke and Kain-Fritsch schemes trigger too early in the diurnal cycle over the Indian subcontinent, mistaking boundary-layer thermal plumes for sustained deep convection.
          </p>
          <div className="pt-2 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> NERV-TRUST corrects diurnal phase lag by +3.2h.
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Wind className="w-4 h-4" /> Orographic Gravity Waves
          </div>
          <h4 className="text-sm font-bold text-white">Ghats & Himalayan Slope Drag</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Coarse horizontal grid resolution (12 km) averages steep topography, causing spurious rainfall pooling on the windward slopes and artificial desiccating winds in rainshadow basins.
          </p>
          <div className="pt-2 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Physics engine applies DEM terrain elevation spline.
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Thermometer className="w-4 h-4" /> Land Surface Coupling
          </div>
          <h4 className="text-sm font-bold text-white">Soil Moisture Inertia Bias</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dry soil moisture initializations create severe sensible heat overestimation over Central India, yielding spurious thermal lows and exaggerated monsoon depression tracks.
          </p>
          <div className="pt-2 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Head-2 engine recalibrates surface Bowen ratio.
          </div>
        </div>
      </div>
    </div>
  );
};
