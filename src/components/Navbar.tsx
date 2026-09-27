import React from 'react';
import type { WeatherVariable } from '../types';
import { VARIABLES } from '../services/mockData';
import {
  CloudRain,
  Radio,
  ShieldAlert,
  Zap,
  Thermometer,
  Wind,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'monitor' | 'verification' | 'physics';
  onSelectTab: (tab: 'monitor' | 'verification' | 'physics') => void;
  selectedVariable: WeatherVariable;
  onSelectVariable: (variable: WeatherVariable) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  selectedVariable,
  onSelectVariable,
}) => {
  const getVariableIcon = (v: WeatherVariable) => {
    switch (v) {
      case 'rainfall':
        return <CloudRain className="w-3.5 h-3.5 text-cyan-400" />;
      case 'cape':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'temperature':
        return <Thermometer className="w-3.5 h-3.5 text-rose-400" />;
      case 'wind850':
        return <Wind className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <header className="w-full bg-slate-950/90 border-b border-slate-800/90 backdrop-blur-md sticky top-0 z-40">
      {/* Topmost Operational Status Ticker */}
      <div className="bg-slate-900/80 border-b border-slate-800/60 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex items-center gap-1.5 font-bold text-emerald-400 uppercase tracking-wider shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Online Recalibration: Active
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 truncate hidden sm:inline">
            AWS / Doppler Radar Verification Stream Connected (32 DWR Nodes)
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-cyan-300 font-mono hidden md:inline">
            Cycle NCUM-G 00Z Live Assimilation
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 text-slate-400 font-mono text-[10px]">
            <Radio className="w-3 h-3 text-cyan-400" /> Latency: 18ms
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-[11px] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Operational DSS Feed</span>
          </div>
        </div>
      </div>


      {/* Main Navbar */}
      <div className="px-4 lg:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 text-white shadow-lg ring-1 ring-cyan-400/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white m-0">
                NERV-TRUST
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-bold uppercase">
                PS SIH26079
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              NCMRWF Forecast Bust Detection & Pre-Verification Layer (MoES / IMD DSS)
            </div>
          </div>
        </div>

        {/* Center / Right: Variable Selector & Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Variable Selector */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
            {(Object.keys(VARIABLES) as WeatherVariable[]).map((vKey) => {
              const variable = VARIABLES[vKey];
              const isSelected = selectedVariable === vKey;
              return (
                <button
                  key={vKey}
                  onClick={() => onSelectVariable(vKey)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition ${
                    isSelected
                      ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={variable.description}
                >
                  {getVariableIcon(vKey)}
                  <span className="text-xs">{variable.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => onSelectTab('monitor')}
              className={`px-3 py-1.5 rounded transition ${
                currentTab === 'monitor'
                  ? 'bg-cyan-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Spatial Risk Monitor
            </button>
            <button
              onClick={() => onSelectTab('verification')}
              className={`px-3 py-1.5 rounded transition ${
                currentTab === 'verification'
                  ? 'bg-cyan-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              IMD/WMO Verification
            </button>
            <button
              onClick={() => onSelectTab('physics')}
              className={`px-3 py-1.5 rounded transition ${
                currentTab === 'physics'
                  ? 'bg-cyan-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Physics Diagnostics
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
