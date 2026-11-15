import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { SavedLocation } from '../../types';
import { 
  MapPin, 
  Navigation, 
  Plus, 
  Trash2, 
  Check, 
  Compass, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

// Fix Leaflet marker icons in React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const LocationPage: React.FC = () => {
  const { savedLocations, addLocation, deleteLocation, fetchLiveWeather } = useStore();
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>({
    lat: 37.7749,
    lng: -122.4194
  });
  const [locationName, setLocationName] = useState('San Francisco, CA (Default Campus)');
  const [isDetecting, setIsDetecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [manualLat, setManualLat] = useState('37.7785');
  const [manualLng, setManualLng] = useState('-122.4150');

  const handleDetectLocation = () => {
    if (!('geolocation' in navigator)) {
      setStatusMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetecting(true);
    setStatusMessage('Detecting current GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentCoords({ lat: latitude, lng: longitude });
        setLocationName(`Current GPS (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`);
        setStatusMessage('Location accurately acquired!');
        setIsDetecting(false);
        triggerConfetti();

        // Refresh weather for detected position
        fetchLiveWeather(latitude, longitude, 'Current Position');
      },
      (err) => {
        setIsDetecting(false);
        setStatusMessage(`Could not acquire location: ${err.message}. You can enter it manually below.`);
      },
      { timeout: 10000 }
    );
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    addLocation({
      label: label.trim(),
      address: address.trim() || 'Custom Campus Location',
      lat: Number(manualLat) || 37.7749,
      lng: Number(manualLng) || -122.4194,
      isDefault: false
    });
    triggerConfetti();
    setLabel('');
    setAddress('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Geolocation & Commute Planning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Location & Travel Buffers</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Keep track of campus halls, libraries, and gyms to calculate realistic transit buffers between timetable slots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>{isDetecting ? 'Acquiring GPS...' : 'Detect Current Location'}</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 glass border border-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Place</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-xs text-brand-200">
          {statusMessage}
        </div>
      )}

      {/* Map & Current Location Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Leaflet Map (2 spans) */}
        <div className="lg:col-span-2 rounded-2xl glass-card border border-white/10 p-2 overflow-hidden h-[420px]">
          {currentCoords && (
            <MapContainer
              center={[currentCoords.lat, currentCoords.lng]}
              zoom={14}
              scrollWheelZoom={false}
              className="h-full w-full rounded-xl"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[currentCoords.lat, currentCoords.lng]} icon={customIcon}>
                <Popup>
                  <div className="text-xs">
                    <strong>Current Active Hub</strong>
                    <br />
                    {locationName}
                  </div>
                </Popup>
              </Marker>
              {savedLocations.map((loc) => (
                <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                  <Popup>
                    <div className="text-xs">
                      <strong>{loc.label}</strong>
                      <br />
                      {loc.address}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Current Active Location Card */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Geolocation Hub
            </h3>
            <div className="font-bold text-base text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-400" />
              <span>{locationName}</span>
            </div>
            {currentCoords && (
              <div className="p-3 rounded-xl bg-dark-900 border border-white/5 font-mono text-xs text-slate-300">
                Lat: {currentCoords.lat.toFixed(4)} &bull; Lng: {currentCoords.lng.toFixed(4)}
              </div>
            )}
            <div className="text-xs text-slate-400 leading-relaxed">
              Timetable transit calculation automatically accounts for walking times between your saved spots.
            </div>
          </div>

          {/* Transit Buffer Rule */}
          <div className="p-5 rounded-2xl glass-card border border-brand-500/30 bg-brand-500/5 space-y-2">
            <div className="flex items-center gap-2 text-brand-300 text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>Automatic Transit Margins</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              When scheduling consecutive in-person events at different venues, TimeWise automatically embeds 15-minute buffers so you never arrive late.
            </p>
          </div>
        </div>
      </div>

      {/* Saved Locations List */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-peach-300" />
          <span>Frequently Visited Places ({savedLocations.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedLocations.map((loc) => (
            <div
              key={loc.id}
              className="p-4 rounded-xl border border-white/10 glass-card-hover bg-dark-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-white">{loc.label}</h4>
                  {loc.isDefault && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-semibold">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">{loc.address}</p>
                <div className="font-mono text-[10px] text-slate-500 mt-2">
                  {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-brand-300 text-[11px]">~10m walk</span>
                {!loc.isDefault && (
                  <button
                    onClick={() => deleteLocation(loc.id)}
                    className="p-1 text-slate-500 hover:text-rose-400"
                    title="Remove location"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Place Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Save Frequent Location"
      >
        <form onSubmit={handleAddLocation} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Place Label
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Science Library Study Carrel"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Address / Campus Wing
            </label>
            <input
              type="text"
              placeholder="e.g. Main Quad, 2nd Floor"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Latitude
              </label>
              <input
                type="text"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Longitude
              </label>
              <input
                type="text"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              Save Place
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

