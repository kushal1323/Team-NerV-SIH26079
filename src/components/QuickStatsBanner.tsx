import React from 'react';
import type { IMDVerificationStats } from '../types';
import { ShieldAlert, Target, Activity, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';


interface QuickStatsBannerProps {
  stats: IMDVerificationStats;
  bustCount: number;
  avgConfidence: number;
}

export const QuickStatsBanner: React.FC<QuickStatsBannerProps> = ({
  stats,
  bustCount,
  avgConfidence,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
      {/* Total Grids */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3 backdrop-blur-md">
        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Grids Evaluated
          </div>
          <div className="text-base font-bold text-white font-mono">
            {stats.evaluatedGridsCount.toLocaleString()} <span className="text-[10px] text-slate-400 font-sans font-normal">(0.12° Res)</span>
          </div>
        </div>
      </div>

      {/* Bust Warning Count */}
      <div className={`border rounded-xl p-3 flex items-center gap-3 backdrop-blur-md ${
        bustCount > 0
          ? 'bg-red-950/30 border-red-500/40 text-red-300'
          : 'bg-slate-900/80 border-slate-800/80'
      }`}>
        <div className={`p-2.5 rounded-lg ${
          bustCount > 0
            ? 'bg-red-500/20 border border-red-500/40 text-red-400'
            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
        }`}>
          <ShieldAlert className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Active Bust Flags
          </div>
          <div className="text-base font-bold font-mono">
            {bustCount} <span className="text-xs text-red-400 font-sans font-normal">Sub-Divisions</span>
          </div>
        </div>
      </div>

      {/* Avg Confidence */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3 backdrop-blur-md">
        <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Mean Confidence
          </div>
          <div className="text-base font-bold text-white font-mono">
            {avgConfidence}% <span className="text-[10px] text-emerald-400 font-sans font-normal">Reliable</span>
          </div>
        </div>
      </div>

      {/* Operational CSI */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3 backdrop-blur-md">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Target className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Operational CSI
          </div>
          <div className="text-base font-bold text-emerald-400 font-mono">
            {stats.csi} <span className="text-[10px] text-slate-400 font-sans font-normal">(vs 0.44 NWP)</span>
          </div>
        </div>
      </div>

      {/* Recalibration Drift Status */}
      <div className="col-span-2 md:col-span-1 bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3 backdrop-blur-md">
        <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <RefreshCw className="w-4 h-4 animate-spin text-purple-400" style={{ animationDuration: '6s' }} />
        </div>
        <div className="overflow-hidden">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Drift Recalibration
          </div>
          <div className="text-xs font-semibold text-purple-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Nominal (NCUM 00Z)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
