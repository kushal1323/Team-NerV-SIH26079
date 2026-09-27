import React, { useState, useMemo, useEffect } from 'react';
import { REGIONS, evaluateRegionLead } from '../services/mockData';
import type { RegionData, LeadDay, WeatherVariable } from '../types';
import {
  Radio,
  Layers,
  Satellite,
  ShieldAlert,
  Sparkles,
  Navigation,
  MapPin,
  Compass,
  Key,
  X,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Circle,
  CircleMarker,
  Tooltip as LeafletTooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface IndiaMapProps {
  selectedRegion: RegionData;
  onSelectRegion: (region: RegionData) => void;
  leadDay: LeadDay;
  variable: WeatherVariable;
}

// Real geographic coordinates of key IMD Doppler Weather Radar (DWR) stations
const RADAR_STATIONS = [
  { name: 'Kolkata DWR', latLng: [22.5726, 88.3639] as [number, number], rangeKm: 250 },
  { name: 'Mumbai DWR (Colaba)', latLng: [18.9067, 72.8147] as [number, number], rangeKm: 250 },
  { name: 'Delhi Palam DWR', latLng: [28.5847, 77.0984] as [number, number], rangeKm: 250 },
  { name: 'Chennai DWR', latLng: [13.0827, 80.2707] as [number, number], rangeKm: 250 },
  { name: 'Kochi DWR', latLng: [9.9312, 76.2673] as [number, number], rangeKm: 250 },
  { name: 'Guwahati DWR', latLng: [26.1445, 91.7362] as [number, number], rangeKm: 250 },
  { name: 'Nagpur DWR', latLng: [21.1458, 79.0882] as [number, number], rangeKm: 250 },
  { name: 'Jaipur DWR', latLng: [26.9124, 75.7873] as [number, number], rangeKm: 250 },
  { name: 'Srinagar DWR', latLng: [34.0837, 74.7973] as [number, number], rangeKm: 250 },
];

export const IndiaMap: React.FC<IndiaMapProps> = ({
  selectedRegion,
  onSelectRegion,
  leadDay,
  variable,
}) => {
  const [showRadarLayer, setShowRadarLayer] = useState(true);
  const [showGridMesh, setShowGridMesh] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite' | 'osm'>('dark');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [activeApiKey, setActiveApiKey] = useState<string>(() => {
    return (
      (import.meta as any).env?.VITE_MAPBOX_TOKEN ||
      localStorage.getItem('nerv_mapbox_token') ||
      ''
    );
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (activeApiKey) {
      setApiKeyInput(activeApiKey);
    }
  }, [activeApiKey]);

  // Compute evaluations for each region at current leadDay and variable
  const evaluations = useMemo(() => {
    const map = new Map<string, ReturnType<typeof evaluateRegionLead>>();
    REGIONS.forEach((r) => {
      map.set(r.id, evaluateRegionLead(r.id, leadDay, variable));
    });
    return map;
  }, [leadDay, variable]);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      localStorage.setItem('nerv_mapbox_token', trimmed);
      setActiveApiKey(trimmed);
    } else {
      localStorage.removeItem('nerv_mapbox_token');
      setActiveApiKey('');
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowApiKeyModal(false);
    }, 1200);
  };

  // Determine Tile Layer URL
  const { tileUrl, tileAttribution, tileSize, zoomOffset } = useMemo(() => {
    if (activeApiKey) {
      if (mapStyle === 'satellite') {
        return {
          tileUrl: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${activeApiKey}`,
          tileAttribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © OpenStreetMap',
          tileSize: 512,
          zoomOffset: -1,
        };
      }
      return {
        tileUrl: `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${activeApiKey}`,
        tileAttribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © OpenStreetMap',
        tileSize: 512,
        zoomOffset: -1,
      };
    }

    // Default Free Tile Providers (NO API KEY REQUIRED)
    if (mapStyle === 'satellite') {
      return {
        tileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        tileAttribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP',
        tileSize: 256,
        zoomOffset: 0,
      };
    }

    if (mapStyle === 'osm') {
      return {
        tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        tileAttribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileSize: 256,
        zoomOffset: 0,
      };
    }

    // Default Dark: CartoDB Dark Matter (Free, no key required)
    return {
      tileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      tileAttribution: '© <a href="https://carto.com/">CARTO</a> © OpenStreetMap',
      tileSize: 256,
      zoomOffset: 0,
    };
  }, [activeApiKey, mapStyle]);

  return (
    <div className="relative w-full h-[550px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Map Layer Controls */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/70 text-xs shadow-xl">
        <span className="text-slate-400 font-medium flex items-center gap-1.5 mr-1">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> Overlays:
        </span>
        <button
          type="button"
          onClick={() => setShowRadarLayer(!showRadarLayer)}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
            showRadarLayer
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          Doppler DWR
        </button>
        <button
          type="button"
          onClick={() => setShowGridMesh(!showGridMesh)}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
            showGridMesh
              ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Satellite className="w-3 h-3 text-indigo-400" />
          0.12° Mesh
        </button>
        <button
          type="button"
          onClick={() => setShowStations(!showStations)}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
            showStations
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Navigation className="w-3 h-3 text-emerald-400" />
          AWS Sensors
        </button>
        <span className="text-slate-600">|</span>

        {/* Map Style Selector */}
        <button
          type="button"
          onClick={() => setMapStyle(mapStyle === 'dark' ? 'satellite' : mapStyle === 'satellite' ? 'osm' : 'dark')}
          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          title="Toggle between Tactical Dark, Esri/Mapbox Satellite, and OpenStreetMap"
        >
          <Compass className="w-3 h-3 text-amber-400" />
          {mapStyle === 'dark' ? 'Tactical Dark' : mapStyle === 'satellite' ? 'Satellite GIS' : 'OpenStreetMap'}
        </button>

        {/* Map API Key Settings Trigger */}
        <button
          type="button"
          onClick={() => setShowApiKeyModal(true)}
          className={`flex items-center gap-1 px-2 py-1 rounded border transition ${
            activeApiKey
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-slate-800/80 text-cyan-300 border-cyan-500/40 hover:bg-slate-800'
          }`}
          title="Configure Mapbox / Map API Key"
        >
          <Key className="w-3 h-3 text-cyan-400" />
          <span>{activeApiKey ? 'Mapbox Active' : 'Map Key'}</span>
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/70 text-xs flex flex-col gap-1.5 shadow-xl pointer-events-none">
        <div className="font-semibold text-slate-300 flex items-center gap-1 text-[11px] uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Bust Risk Index
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          <span className="text-slate-300 text-[11px]">Bust Flagged (&gt;65%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-amber-500"></span>
          <span className="text-slate-300 text-[11px]">Uncertain (35–65%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-emerald-500"></span>
          <span className="text-slate-300 text-[11px]">Reliable (&lt;35%)</span>
        </div>
      </div>

      {/* API Key Modal / Settings Drawer */}
      {showApiKeyModal && (
        <div className="absolute inset-0 z-[1200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-md w-full shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Key className="w-4 h-4" /> Map Provider & API Key Setup
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-2">
              <p>
                <strong>Default Mode (No API Key Required):</strong> The map already runs out of the box using free <strong>OpenStreetMap, CartoDB Dark Matter, and Esri Satellite</strong> tiles.
              </p>
              <p className="text-slate-400">
                To upgrade to high-definition <strong>Mapbox Dark / 4K Satellite vector tiles</strong>, paste your free public token below (starts with <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300 font-mono">pk.eyJ1...</code>):
              </p>
            </div>

            <form onSubmit={handleSaveApiKey} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Mapbox Access Token:
                </label>
                <input
                  type="text"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="pk.eyJ1..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {saveSuccess && (
                <div className="text-emerald-400 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Map token saved! Switching map provider...</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <a
                  href="https://account.mapbox.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Get free Mapbox token <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setApiKeyInput('');
                      localStorage.removeItem('nerv_mapbox_token');
                      setActiveApiKey('');
                      setShowApiKeyModal(false);
                    }}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  >
                    Clear (Use Free)
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow transition"
                  >
                    Apply Key
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Interactive Leaflet Map of India */}
      <div className="w-full flex-1 relative">
        <MapContainer
          key={`${mapStyle}-${activeApiKey ? 'mapbox' : 'free'}`}
          center={[22.5, 79.5]}
          zoom={5}
          minZoom={4}
          maxZoom={9}
          scrollWheelZoom={true}
          className="w-full h-full"
          style={{ background: '#090d16' }}
        >
          <TileLayer
            key={tileUrl}
            attribution={tileAttribution}
            url={tileUrl}
            subdomains={['a', 'b', 'c', 'd']}
            tileSize={tileSize}
            zoomOffset={zoomOffset}
          />

          {/* Meteorological Sub-Region Risk Polygons */}
          {REGIONS.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            const ev = evaluations.get(region.id);
            const risk = ev ? ev.bustProbability : 20;
            const isHighRisk = risk >= 65;
            const isModerate = risk >= 35 && risk < 65;

            const fillColor = isHighRisk
              ? '#ef4444'
              : isModerate
              ? '#f59e0b'
              : '#10b981';

            const strokeColor = isSelected
              ? '#38bdf8'
              : isHighRisk
              ? '#ef4444'
              : isModerate
              ? '#f59e0b'
              : '#10b981';

            return (
              <React.Fragment key={region.id}>
                <Polygon
                  positions={region.latLngPolygon}
                  pathOptions={{
                    fillColor: fillColor,
                    fillOpacity: isSelected ? 0.65 : 0.35,
                    color: strokeColor,
                    weight: isSelected ? 3.5 : 1.8,
                    dashArray: isHighRisk ? '4, 4' : undefined,
                  }}
                  eventHandlers={{
                    click: () => onSelectRegion(region),
                  }}
                >
                  <LeafletTooltip sticky className="custom-leaflet-tooltip">
                    <div className="p-1 text-slate-900">
                      <div className="font-bold text-xs">{region.name} ({region.code})</div>
                      <div className="text-[11px] text-slate-700">Sub-Division #{region.subDivisionNo}</div>
                      <div className="mt-1 font-mono text-xs font-semibold">
                        Bust Risk: <span style={{ color: fillColor }}>{risk}%</span>
                      </div>
                      <div className="text-[10px] text-slate-600">
                        Raw: {ev?.dualHead.rawForecastValue} {ev?.dualHead.unit} | Corr: {ev?.dualHead.biasCorrectedMean} ± {ev?.dualHead.biasCorrectedStdDev}
                      </div>
                      <div className="text-[10px] text-cyan-700 font-semibold mt-0.5">Click to inspect diagnostics</div>
                    </div>
                  </LeafletTooltip>
                </Polygon>

                {/* Sub-Division Center Marker with Code */}
                <CircleMarker
                  center={region.center}
                  radius={isSelected ? 14 : 11}
                  pathOptions={{
                    fillColor: fillColor,
                    fillOpacity: 0.9,
                    color: isSelected ? '#ffffff' : '#0f172a',
                    weight: isSelected ? 2.5 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => onSelectRegion(region),
                  }}
                >
                  <LeafletTooltip direction="center" permanent className="bg-transparent border-0 shadow-none">
                    <span className="text-[10px] font-bold text-white font-mono pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {region.code}
                    </span>
                  </LeafletTooltip>
                </CircleMarker>
              </React.Fragment>
            );
          })}

          {/* Doppler Weather Radars Coverage Rings */}
          {showRadarLayer &&
            RADAR_STATIONS.map((radar, idx) => (
              <React.Fragment key={`radar-${idx}`}>
                <Circle
                  center={radar.latLng}
                  radius={radar.rangeKm * 1000}
                  pathOptions={{
                    color: '#06b6d4',
                    weight: 1.2,
                    dashArray: '4, 6',
                    fillColor: '#06b6d4',
                    fillOpacity: 0.04,
                  }}
                />
                <CircleMarker
                  center={radar.latLng}
                  radius={4}
                  pathOptions={{
                    fillColor: '#22d3ee',
                    fillOpacity: 1,
                    color: '#083344',
                    weight: 1.5,
                  }}
                >
                  <LeafletTooltip direction="top" offset={[0, -5]}>
                    <span className="text-xs font-semibold text-cyan-900">{radar.name}</span>
                  </LeafletTooltip>
                </CircleMarker>
              </React.Fragment>
            ))}

          {/* Automatic Weather Stations (AWS) Sensors */}
          {showStations &&
            REGIONS.map((r, i) => (
              <React.Fragment key={`aws-${i}`}>
                <CircleMarker
                  center={[r.center[0] + 0.35, r.center[1] + 0.35]}
                  radius={3}
                  pathOptions={{
                    fillColor: '#34d399',
                    fillOpacity: 0.85,
                    color: '#064e3b',
                    weight: 1,
                  }}
                >
                  <LeafletTooltip direction="right">
                    <span className="text-[10px] text-slate-800">AWS Station: {r.code}-01</span>
                  </LeafletTooltip>
                </CircleMarker>
                <CircleMarker
                  center={[r.center[0] - 0.35, r.center[1] - 0.35]}
                  radius={3}
                  pathOptions={{
                    fillColor: '#34d399',
                    fillOpacity: 0.85,
                    color: '#064e3b',
                    weight: 1,
                  }}
                >
                  <LeafletTooltip direction="right">
                    <span className="text-[10px] text-slate-800">AWS Station: {r.code}-02</span>
                  </LeafletTooltip>
                </CircleMarker>
              </React.Fragment>
            ))}
        </MapContainer>
      </div>

      {/* Bottom map status bar */}
      <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Selected Region: <strong className="text-cyan-300">{selectedRegion.name}</strong> (Sub-Div #{selectedRegion.subDivisionNo})</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span>Lead: Day {leadDay} (T+{leadDay * 24}h)</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Click any region or marker to inspect
          </span>
        </div>
      </div>
    </div>
  );
};
