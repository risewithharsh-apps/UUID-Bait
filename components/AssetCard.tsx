import React, { useState } from 'react';
import { Download, MapPin, Loader2, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { Asset, Coordinates } from '../types';
import { getUserLocation } from '../utils/geo';

interface AssetCardProps {
  asset: Asset;
  cachedLocation: Coordinates | null;
  onLocationCaptured: (coords: Coordinates) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, cachedLocation, onLocationCaptured }) => {
  const [status, setStatus] = useState<'idle' | 'locating' | 'downloading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDownload = async () => {
    try {
      let coords = cachedLocation;

      // Step 1: Get Location if not already cached
      if (!coords) {
        setStatus('locating');
        coords = await getUserLocation();
        onLocationCaptured(coords);
      }

      // Step 2: Download
      setStatus('downloading');
      
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch(asset.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${asset.name.replace(/\s+/g, '_')}_Official_Copy.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus('success');
      
      // Reset to idle after a few seconds
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage('अधिकार क्षेत्र सत्यापन विफल। पुनः प्रयास करें।');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 4000);
    }
  };

  return (
    <div className="bg-white border border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-md relative group">
       {/* Official New Tag */}
       <div className="absolute -top-3 -right-3 z-10">
         <span className="bg-red-600 text-white text-xs px-2 py-1 font-extrabold animate-pulse shadow-md rounded-sm border border-red-700">नया</span>
       </div>

      <div className="flex border-b border-gray-200 bg-gray-50 p-3 items-center gap-2 rounded-t-md">
         <FileText className="w-5 h-5 text-gray-500" />
         <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">फॉर्म आईडी: {asset.id}</span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#003366] mb-3 font-serif leading-snug group-hover:text-blue-800 transition-colors">
          {asset.name}
        </h3>
        
        <div className="bg-yellow-50 border border-yellow-200 p-3 mb-5 text-sm text-gray-800 leading-relaxed rounded-sm">
           <strong className="text-gray-900 block mb-1">विषय:</strong> {asset.description}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-6 border-t border-gray-100 pt-3">
           <div><span className="font-bold text-gray-800">आकार:</span> {asset.size}</div>
           <div><span className="font-bold text-gray-800">दिनांक:</span> {asset.uploadDate}</div>
        </div>
        
        <div className="mt-auto">
          <button
            onClick={handleDownload}
            disabled={status !== 'idle' && status !== 'error'}
            className={`w-full relative flex items-center justify-center space-x-2 py-3.5 px-4 text-base font-extrabold border-2 transition-all duration-200 rounded shadow-md hover:shadow-lg transform active:scale-[0.98]
              ${status === 'idle' ? 'bg-[#138808] hover:bg-[#0f6b06] text-white border-[#138808]' : ''}
              ${status === 'locating' ? 'bg-orange-100 text-orange-900 border-orange-400 cursor-wait' : ''}
              ${status === 'downloading' ? 'bg-blue-100 text-blue-900 border-blue-400 cursor-wait' : ''}
              ${status === 'success' ? 'bg-white text-green-800 border-green-600' : ''}
              ${status === 'error' ? 'bg-red-50 text-red-800 border-red-400' : ''}
            `}
          >
            {status === 'idle' && (
              <>
                <Download className="w-5 h-5" />
                <span>डाउनलोड और सत्यापित करें</span>
              </>
            )}
            
            {status === 'locating' && (
              <>
                <MapPin className="w-5 h-5 animate-pulse" />
                <span>जियो-फेंसिंग जांच...</span>
              </>
            )}

            {status === 'downloading' && (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>रिकॉर्ड प्राप्त कर रहा है...</span>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>सत्यापित</span>
              </>
            )}

             {status === 'error' && (
              <>
                <AlertTriangle className="w-5 h-5" />
                <span>{errorMessage || 'विफल'}</span>
              </>
            )}
          </button>
          {status === 'idle' && (
            <p className="text-xs font-semibold text-center text-gray-600 mt-3 bg-gray-50 py-1 rounded">
              * ऑडिट ट्रेल के लिए स्थान अनिवार्य है
            </p>
          )}
        </div>
      </div>
    </div>
  );
};