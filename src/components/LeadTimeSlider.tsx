import { useEffect, useState } from 'react';
import type { LeadDay } from '../types';
import { Play, Pause, ChevronLeft, ChevronRight, Clock, Flame } from 'lucide-react';


interface LeadTimeSliderProps {
  leadDay: LeadDay;
  onChangeLeadDay: (day: LeadDay) => void;
}

export const LeadTimeSlider: React.FC<LeadTimeSliderProps> = ({
  leadDay,
  onChangeLeadDay,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      onChangeLeadDay(((leadDay % 10) + 1) as LeadDay);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying, leadDay, onChangeLeadDay]);

  const handlePrev = () => {
    const prev = Math.max(1, leadDay - 1) as LeadDay;
    onChangeLeadDay(prev);
  };

  const handleNext = () => {
    const next = Math.min(10, leadDay + 1) as LeadDay;
    onChangeLeadDay(next);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs uppercase font-semibold tracking-wider text-slate-400">
              NCUM Medium-Range Lead Time
            </div>
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>Day {leadDay} Forecast Horizon</span>
              <span className="font-mono text-cyan-400 text-xs px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                T+{leadDay * 24} Hours
              </span>
              {leadDay >= 7 && (
                <span className="text-[11px] font-medium text-amber-400 flex items-center gap-1 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
                  <Flame className="w-3 h-3 text-amber-400" /> High Uncertainty Regime
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Play/Pause and Step Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={handlePrev}
            disabled={leadDay === 1}
            title="Previous Day"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition shadow-sm ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-cyan-600 text-white hover:bg-cyan-500'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Auto-Simulate
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={leadDay === 10}
            title="Next Day"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Day Buttons Grid */}
      <div className="grid grid-cols-10 gap-1.5 pt-1">
        {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as LeadDay[]).map((d) => {
          const isSelected = leadDay === d;
          return (
            <button
              key={d}
              onClick={() => {
                setIsPlaying(false);
                onChangeLeadDay(d);
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all border ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-500/20 to-cyan-600/30 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400/50'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className={`text-[11px] font-bold ${isSelected ? 'text-cyan-300' : ''}`}>
                D{d}
              </span>
              <span className="text-[9px] font-mono text-slate-400">+{d * 24}h</span>
              <div
                className={`mt-1 h-0.5 w-full rounded-full ${
                  d <= 3
                    ? 'bg-emerald-400/70'
                    : d <= 6
                    ? 'bg-amber-400/70'
                    : 'bg-rose-400/70'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
