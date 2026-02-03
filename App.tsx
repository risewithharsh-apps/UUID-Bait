import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AssetCard } from './components/AssetCard';
import { LocationLogs } from './components/LocationLogs';
import { Asset, Coordinates, LocationLog } from './types';
import { MapPin, AlertTriangle, ExternalLink, ChevronRight, Bell, Download, Loader2 } from 'lucide-react';
import { getUserLocation } from './utils/geo';

const GOV_ASSETS: Asset[] = [
  {
    id: "UID-8921",
    name: "आधार लिंकिंग फॉर्म 6A (अनिवार्य)",
    description: "सेवाओं के तत्काल निलंबन को रोकने के लिए बायोमेट्रिक डेटा को लिंक करने के लिए आवेदन।",
    imageUrl: "https://picsum.photos/800/600?random=1",
    size: "1.2 MB",
    uploadDate: "12 Oct 2023"
  },
  {
    id: "PAN-1022",
    name: "आयकर अनुपालन सूचना",
    description: "दस्तावेजों को लिंक न करने पर दंड के संबंध में आधिकारिक राजपत्र अधिसूचना।",
    imageUrl: "https://picsum.photos/800/600?random=2",
    size: "890 KB",
    uploadDate: "05 Nov 2023"
  },
  {
    id: "REG-3321",
    name: "नागरिक रजिस्ट्री सुधार फॉर्म",
    description: "आवासीय पता निर्देशांक अपडेट करने के लिए मानक संचालन प्रक्रिया।",
    imageUrl: "https://picsum.photos/800/600?random=3",
    size: "2.1 MB",
    uploadDate: "कल"
  },
  {
    id: "CIR-4412",
    name: "डिजिटल लॉकर प्राधिकरण",
    description: "डिजिटल संपत्ति पुनर्प्राप्ति के लिए प्रमाणीकरण प्रमाण पत्र।",
    imageUrl: "https://picsum.photos/800/600?random=4",
    size: "5.5 MB",
    uploadDate: "2 सप्ताह पहले"
  },
  {
    id: "LEG-5591",
    name: "साइबर सुरक्षा दिशानिर्देश 2025",
    description: "डिजिटल पोर्टल्स का उपयोग करने वाले सभी नागरिकों के लिए अनिवार्य सुरक्षा प्रोटोकॉल।",
    imageUrl: "https://picsum.photos/800/600?random=5",
    size: "1.2 MB",
    uploadDate: "1 महीने पहले"
  },
  {
    id: "NOT-6602",
    name: "दंड अनुसूची - अनुलग्नक बी",
    description: "पहचान सत्यापन में देरी के लिए लागू जुर्माने की सूची।",
    imageUrl: "https://picsum.photos/800/600?random=6",
    size: "3.3 MB",
    uploadDate: "2 दिन पहले"
  }
];

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [cachedLocation, setCachedLocation] = useState<Coordinates | null>(null);
  const [showLocationToast, setShowLocationToast] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Initialize logs from localStorage to persist data across page navigations/refreshes
  const [logs, setLogs] = useState<LocationLog[]>(() => {
    const savedLogs = localStorage.getItem('gov_portal_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  // Handle routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist logs whenever they change
  useEffect(() => {
    localStorage.setItem('gov_portal_logs', JSON.stringify(logs));
  }, [logs]);

  const handleLocationCaptured = (coords: Coordinates, source: string = "Unknown Context") => {
    setCachedLocation(coords);
    
    // Add to logs
    const newLog: LocationLog = {
      id: Date.now().toString() + Math.random().toString(),
      timestamp: new Date().toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'medium' }),
      latitude: coords.latitude,
      longitude: coords.longitude,
      action: source
    };
    setLogs(prev => [newLog, ...prev]);

    setShowLocationToast(true);
    // Hide toast after 5 seconds
    setTimeout(() => setShowLocationToast(false), 5000);
  };

  const handleEmergencyDownload = async () => {
    const asset = GOV_ASSETS[0]; // Form 6A is the first asset
    setIsDownloading(true);
    try {
      let coords = cachedLocation;
      if (!coords) {
        coords = await getUserLocation();
        handleLocationCaptured(coords, "Emergency: Form 6A Direct Download");
      } else {
        handleLocationCaptured(coords, "Emergency: Form 6A Direct Download (Cached)");
      }
      
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
    } catch (error) {
      console.error("Emergency download failed", error);
      alert("सत्यापन विफल। कृपया स्थान अनुमति सुनिश्चित करें।");
    } finally {
      setIsDownloading(false);
    }
  };

  // Render Admin View if hash matches
  if (currentHash === '#/admin') {
    return <LocationLogs logs={logs} onBack={() => window.location.hash = ''} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans overflow-x-hidden">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar (Desktop) - DISABLED */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6 select-none">
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden opacity-80">
            <div className="bg-[#003366] text-white p-4 font-bold text-base grayscale">
              त्वरित लिंक (निष्क्रिय)
            </div>
            <ul className="text-sm text-gray-500 divide-y divide-gray-200 cursor-not-allowed">
              {['ऑनलाइन आवेदन करें', 'स्थिति जांचें', 'एडमिट कार्ड डाउनलोड करें', 'शिकायत निवारण', 'निविदाएं', 'रिक्तियां'].map(item => (
                <li key={item} className="p-4 flex justify-between items-center group pointer-events-none">
                  {item}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </li>
              ))}
            </ul>
          </div>

           <div className="bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden p-5 opacity-80">
             <h4 className="font-bold text-gray-900 mb-3 border-b pb-3 text-lg">हेल्पलाइन</h4>
             <p className="text-base text-gray-700">टोल फ्री नंबर:</p>
             <p className="text-2xl font-extrabold text-gray-600 my-1">1947</p>
             <p className="text-sm text-gray-600 mt-2 leading-relaxed">सोमवार से शनिवार<br/>सुबह 9:00 बजे से शाम 6:00 बजे तक</p>
           </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          
          {/* Alert Box - IMPROVED READABILITY & RESPONSIVE */}
          <div className="bg-red-50 border-l-[6px] border-red-700 p-4 sm:p-6 mb-8 shadow-md flex items-start gap-3 sm:gap-5 rounded-r-md">
            <div className="bg-red-100 p-2 sm:p-3 rounded-full flex-shrink-0 mt-1 shadow-inner border border-red-200">
               <AlertTriangle className="w-6 h-6 sm:w-10 sm:h-10 text-red-700 blink-urgent" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-red-900 uppercase tracking-wide mb-2 sm:mb-3">नागरिक ध्यान दें</h2>
              <p className="text-base sm:text-lg text-red-900 font-medium leading-relaxed">
                आपका आधार लिंकिंग लंबित है। यदि सत्यापन तुरंत पूरा नहीं किया गया तो सेवाएं <span className="underline decoration-2 underline-offset-4 decoration-red-600 font-bold">अवरुद्ध कर दी जाएंगी</span>। 
                कृपया नीचे अनिवार्य <strong className="text-red-950 bg-red-200 px-2 py-0.5 rounded border border-red-300 mx-1">फॉर्म 6A</strong> डाउनलोड करें और निवास साबित करने के लिए जियो-टैगिंग सक्षम करें।
              </p>
              
              <button 
                onClick={handleEmergencyDownload}
                disabled={isDownloading}
                className="mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-6 rounded shadow-lg flex items-center gap-2 text-sm sm:text-base transition-all transform active:scale-95 border border-red-800 animate-cta-urgent"
              >
                {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                <span>फॉर्म 6A डाउनलोड करें (Download Form 6A)</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-300 p-6 mb-8 shadow-sm rounded-sm">
             <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-100 pb-3 mb-6 flex items-center gap-3">
               <Bell className="w-6 h-6 text-orange-600" />
               नवीनतम परिपत्र और डाउनलोड
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {GOV_ASSETS.map((asset) => (
                <AssetCard 
                  key={asset.id} 
                  asset={asset} 
                  cachedLocation={cachedLocation}
                  onLocationCaptured={handleLocationCaptured}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-10 opacity-70 cursor-not-allowed">
             <div className="flex-1 bg-gradient-to-br from-gray-50 to-white p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-700 text-lg mb-2">डिजिटल इंडिया पहल</h3>
                <p className="text-sm text-gray-500 leading-relaxed">डिजिटल बुनियादी ढांचे के माध्यम से नागरिकों को सशक्त बनाना।</p>
             </div>
             <div className="flex-1 bg-gradient-to-br from-gray-50 to-white p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-700 text-lg mb-2">स्वच्छ भारत</h3>
                <p className="text-sm text-gray-500 leading-relaxed">स्वच्छता की ओर एक कदम।</p>
             </div>
          </div>

        </div>
      </main>

      {/* Footer - DISABLED */}
      <footer className="bg-[#1a1a1a] text-white py-10 mt-auto border-t-[6px] border-green-700 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-500">
          <div className="opacity-60 cursor-not-allowed">
            <h5 className="font-bold text-gray-400 text-base mb-4 border-b border-gray-700 pb-2 inline-block">वेबसाइट नीतियां</h5>
            <ul className="space-y-2 pointer-events-none">
               <li><span className="hover:text-white transition-colors">नियम और शर्तें</span></li>
               <li><span className="hover:text-white transition-colors">गोपनीयता नीति</span></li>
               <li><span className="hover:text-white transition-colors">कॉपीराइट नीति</span></li>
               <li><span className="hover:text-white transition-colors">हाइपरलिंकिंग नीति</span></li>
            </ul>
          </div>
          <div className="opacity-60 cursor-not-allowed">
            <h5 className="font-bold text-gray-400 text-base mb-4 border-b border-gray-700 pb-2 inline-block">सहायता और समर्थन</h5>
             <ul className="space-y-2 pointer-events-none">
               <li><span className="hover:text-white transition-colors">अक्सर पूछे जाने वाले प्रश्न</span></li>
               <li><span className="hover:text-white transition-colors">साइटमैप</span></li>
               <li><span className="hover:text-white transition-colors">प्रतिक्रिया</span></li>
            </ul>
          </div>
          <div className="md:col-span-2 text-center md:text-right flex flex-col justify-end opacity-60">
             <p className="mb-2 text-gray-500">सामग्री इलेक्ट्रॉनिक्स और आईटी मंत्रालय, भारत सरकार के स्वामित्व में है।</p>
             <p className="font-mono text-gray-600">अंतिम अद्यतन: {new Date().toLocaleDateString('hi-IN')}</p>
          </div>
        </div>
      </footer>

      {/* Location Toast Notification */}
      {showLocationToast && cachedLocation && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border-l-[6px] border-green-600 text-gray-900 px-6 py-4 shadow-2xl flex items-start gap-4 max-w-sm rounded-r-md">
            <div className="bg-green-100 p-2 rounded-full mt-1">
              <MapPin className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-green-900">जियो-टैगिंग सफल</h4>
              <p className="text-sm text-gray-700 mt-1 font-mono">
                निर्देशांक: {cachedLocation.latitude.toFixed(4)}N, {cachedLocation.longitude.toFixed(4)}E
              </p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide font-bold">ऑडिट आईडी: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;