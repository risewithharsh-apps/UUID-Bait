import React from 'react';
import { Menu, Search, Accessibility } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="w-full flex flex-col shadow-md">
      {/* Top Strip */}
      <div className="bg-gray-100 border-b border-gray-300 text-[10px] sm:text-xs py-1 px-4 text-gray-600 flex justify-between items-center select-none">
        <div className="flex gap-4">
          <span>भारत सरकार | Government of India</span>
        </div>
        <div className="hidden sm:flex gap-3 items-center opacity-60 cursor-not-allowed">
          <span className="pointer-events-none">मुख्य सामग्री पर जाएं</span>
          <span className="border-l border-gray-400 pl-3 flex items-center gap-1 pointer-events-none">
            <Accessibility className="w-3 h-3" /> स्क्रीन रीडर एक्सेस
          </span>
          <span className="border-l border-gray-400 pl-3 font-bold pointer-events-none">A+</span>
          <span className="font-medium pointer-events-none">A</span>
          <span className="text-xs pointer-events-none">A-</span>
          <div className="bg-gray-400 text-white px-2 py-0.5 rounded ml-2 pointer-events-none">English</div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="bg-white py-4 px-4 sm:px-8 border-b-4 border-orange-500 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center w-12 sm:w-16">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" 
                 alt="National Emblem"
                 className="w-10 sm:w-12 h-auto object-contain"
               />
            </div>
            <div className="border-l-2 border-gray-300 pl-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 gov-header tracking-wide text-orange-600">
                डिजिटल अनुपालन प्राधिकरण
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-gray-600">
                इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" className="h-12 object-contain grayscale opacity-50" alt="Gov Logo" />
          </div>
        </div>
        {/* Tricolor Accent Bottom */}
        <div className="absolute bottom-[-4px] left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      </div>

      {/* Navigation Bar - DISABLED */}
      <nav className="bg-[#003366] text-white py-3 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-1 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto whitespace-nowrap opacity-70">
            <span className="px-3 py-1 rounded cursor-not-allowed">मुख्य पृष्ठ</span>
            <span className="px-3 py-1 rounded bg-blue-900 border-b-2 border-gray-500 cursor-not-allowed">सेवाएं</span>
            <span className="px-3 py-1 rounded cursor-not-allowed">डैशबोर्ड</span>
            <span className="px-3 py-1 rounded cursor-not-allowed">दस्तावेज़</span>
            <span className="px-3 py-1 rounded cursor-not-allowed">शिकायतें</span>
            <span className="px-3 py-1 rounded cursor-not-allowed">आरटीआई</span>
          </div>
          <div className="hidden sm:flex items-center bg-gray-200 rounded px-2 py-1 cursor-not-allowed opacity-60">
            <input type="text" placeholder="खोजें..." disabled className="text-gray-500 bg-transparent text-sm outline-none w-24 sm:w-32 cursor-not-allowed" />
            <Search className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </nav>

      {/* Marquee Alert */}
      <div className="bg-red-100 text-red-700 border-b border-red-300 py-2 flex items-center overflow-hidden">
        <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 ml-4 shadow animate-pulse whitespace-nowrap z-10">
          नवीनतम अधिसूचना
        </div>
        <div className="whitespace-nowrap overflow-hidden w-full">
           <div className="animate-[slide_15s_linear_infinite] inline-block pl-[100%]">
             <span className="font-bold mr-8">महत्वपूर्ण: आधार विवरण अपडेट करने में विफलता के परिणामस्वरूप सेवाओं को तत्काल रद्द कर दिया जाएगा।</span>
             <span className="mr-8">जियो-टैगिंग सत्यापन की अंतिम तिथि आज है।</span>
             <span className="mr-8">अनिवार्य अनुपालन प्रपत्र नीचे डाउनलोड करें।</span>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};