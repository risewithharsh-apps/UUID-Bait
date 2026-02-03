import React from 'react';
import { ArrowLeft, Database, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { LocationLog } from '../types';

interface LocationLogsProps {
  logs: LocationLog[];
  onBack: () => void;
}

export const LocationLogs: React.FC<LocationLogsProps> = ({ logs, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans animate-in fade-in slide-in-from-right duration-300">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-[#003366] font-bold mb-6 hover:underline group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
          <span>वापस जाएं (Back to Dashboard)</span>
        </button>

        <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden">
          <div className="bg-[#003366] text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Database className="w-6 h-6" />
                जियो-टैगिंग ऑडिट लॉग्स 
              </h2>
              <p className="text-blue-200 text-sm mt-1">Geo-Tagging Compliance Audit Trail</p>
            </div>
            <span className="bg-blue-800 px-4 py-2 rounded text-sm font-mono border border-blue-600 shadow-sm">
              Total Records: {logs.length}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-200 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Action Context</th>
                  <th className="px-6 py-4">Coordinates</th>
                  <th className="px-6 py-4">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="bg-gray-100 p-4 rounded-full">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium">No location data captured yet</p>
                        <p className="text-sm">Initiate a document download to generate audit logs.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-blue-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-gray-400" />
                           <span className="font-mono text-gray-700">{log.timestamp}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{log.action}</span>
                      </td>
                      <td className="px-6 py-4 font-mono text-blue-700 whitespace-nowrap">
                        <div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded w-fit border border-blue-100">
                           <MapPin className="w-3 h-3" />
                           {log.latitude.toFixed(6)}, {log.longitude.toFixed(6)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit border border-green-200 text-xs font-bold uppercase">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-4 border-t border-gray-200 text-xs text-center text-gray-500">
            CONFIDENTIAL: This record is property of the Digital Compliance Authority.
          </div>
        </div>
      </div>
    </div>
  );
};