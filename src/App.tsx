import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LeadTimeSlider } from './components/LeadTimeSlider';
import { IndiaMap } from './components/IndiaMap';
import { QuickStatsBanner } from './components/QuickStatsBanner';
import { BustDiagnosticPanel } from './components/BustDiagnosticPanel';
import { VerificationDashboard } from './components/VerificationDashboard';
import { PhysicsDiagnosticsView } from './components/PhysicsDiagnosticsView';
import {
  REGIONS,
  evaluateRegionLead,
  getIMDOperationalVerification,
} from './services/mockData';
import type { LeadDay, RegionData, WeatherVariable } from './types';
import { ShieldAlert } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'monitor' | 'verification' | 'physics'>('monitor');
  const [selectedVariable, setSelectedVariable] = useState<WeatherVariable>('rainfall');
  const [leadDay, setLeadDay] = useState<LeadDay>(4);
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS[0]); // Konkan & Goa

  // Compute active region evaluation
  const activeEvaluation = useMemo(() => {
    return evaluateRegionLead(selectedRegion.id, leadDay, selectedVariable);
  }, [selectedRegion.id, leadDay, selectedVariable]);

  // Compute overall stats across all regions for current leadDay & variable
  const { bustCount, avgConfidence } = useMemo(() => {
    let busts = 0;
    let totalConf = 0;
    REGIONS.forEach((r) => {
      const ev = evaluateRegionLead(r.id, leadDay, selectedVariable);
      if (ev.bustProbability >= 65) busts++;
      totalConf += ev.confidenceScore;
    });
    return {
      bustCount: busts,
      avgConfidence: Math.round(totalConf / REGIONS.length),
    };
  }, [leadDay, selectedVariable]);

  const imdStats = useMemo(() => getIMDOperationalVerification(), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        selectedVariable={selectedVariable}
        onSelectVariable={setSelectedVariable}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-3 sm:p-4 lg:p-6 space-y-5">
        {/* TAB 1: Live Pre-Verification Spatial Monitor (Two-Column Split 60/40) */}
        {currentTab === 'monitor' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Spatial Risk View (60% Width ~ 7 cols) */}
              <div className="lg:col-span-7 space-y-4 flex flex-col">
                {/* 1. Medium-Range Lead Time Selector */}
                <LeadTimeSlider
                  leadDay={leadDay}
                  onChangeLeadDay={setLeadDay}
                />

                {/* 2. Interactive India Bust Risk Heatmap */}
                <IndiaMap
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                  leadDay={leadDay}
                  variable={selectedVariable}
                />

                {/* 3. Quick Stats Banner */}
                <QuickStatsBanner
                  stats={imdStats}
                  bustCount={bustCount}
                  avgConfidence={avgConfidence}
                />
              </div>

              {/* Right Column: Diagnostic & Bias Correction Panel (40% Width ~ 5 cols) */}
              <div className="lg:col-span-5">
                <BustDiagnosticPanel
                  region={selectedRegion}
                  evaluation={activeEvaluation}
                  onSelectLeadDay={setLeadDay}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IMD / WMO Verification Metrics */}
        {currentTab === 'verification' && <VerificationDashboard />}

        {/* TAB 3: Model Physics Diagnostics */}
        {currentTab === 'physics' && <PhysicsDiagnosticsView />}
      </main>


      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-3 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>NERV-TRUST System Architecture • National Centre for Medium Range Weather Forecasting (NCMRWF) & MoES</span>
        </div>
        <div className="font-mono text-[11px] text-slate-400 flex items-center gap-3">
          <span>Problem Statement: PS SIH26079</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Offline Prototype Ready
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
