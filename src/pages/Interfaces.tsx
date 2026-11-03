import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ArrowRight, AlertTriangle, Shield } from 'lucide-react';

export default function Interfaces() {
  const { state } = useStore();
  const [selected, setSelected] = useState<string | null>(null);
  const current = state.interfaces.find(i => i.id === selected);

  const verificationColor = (status: string) => {
    switch (status) {
      case 'NO_VERIFICADA': return 'bg-red-100 text-red-800';
      case 'FUENTE_LOCALIZADA': return 'bg-amber-100 text-amber-800';
      case 'CONTRASTADA': return 'bg-blue-100 text-blue-800';
      case 'VALIDADA_CON_DATOS_AUTORIZADOS': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Matriz de Interfaces</h1>
        <p className="text-sm opacity-60">{state.interfaces.length} interfaces operativas entre procesos</p>
      </div>

      {/* Matrix Table */}
      <div className={`rounded-xl border overflow-x-auto ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <table className="w-full text-xs">
          <thead>
            <tr className={state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}>
              <th className="px-3 py-2 text-left font-semibold">ID</th>
              <th className="px-3 py-2 text-left font-semibold">Origen</th>
              <th className="px-3 py-2 text-center"></th>
              <th className="px-3 py-2 text-left font-semibold">Destino</th>
              <th className="px-3 py-2 text-left font-semibold">Nombre</th>
              <th className="px-3 py-2 text-left font-semibold">Objeto</th>
              <th className="px-3 py-2 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {state.interfaces.map(iface => (
              <tr
                key={iface.id}
                onClick={() => setSelected(iface.id)}
                className={`border-t cursor-pointer transition-colors ${
                  selected === iface.id
                    ? state.darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                    : state.darkMode ? 'hover:bg-gray-750' : 'hover:bg-stone-50'
                } ${state.darkMode ? 'border-gray-700' : 'border-stone-100'}`}
              >
                <td className="px-3 py-2 font-mono font-bold">{iface.id}</td>
                <td className="px-3 py-2">{iface.originId}</td>
                <td className="px-3 py-2 text-center"><ArrowRight size={12} className="inline opacity-40" /></td>
                <td className="px-3 py-2">{iface.destinationId}</td>
                <td className="px-3 py-2">{iface.name}</td>
                <td className="px-3 py-2 opacity-70">{iface.transferredObject}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${verificationColor(iface.verificationStatus)}`}>
                    {iface.verificationStatus.replace(/_/g, ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Panel */}
      {current && (
        <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono font-bold text-lg">{current.id}</span>
            <ArrowRight size={16} className="opacity-40" />
            <span className="text-sm">{current.originId} → {current.destinationId}</span>
            <span className={`ml-auto px-2 py-1 rounded text-xs ${verificationColor(current.verificationStatus)}`}>
              {current.verificationStatus.replace(/_/g, ' ')}
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-2">{current.name}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-xs font-semibold uppercase opacity-60 mb-1">Tipo de intercambio</h4>
              <p className="text-sm">{current.exchangeType}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase opacity-60 mb-1">Objeto transferido</h4>
              <p className="text-sm">{current.transferredObject}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase opacity-60 mb-1">Evento desencadenante</h4>
              <p className="text-sm">{current.triggerEvent}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase opacity-60 mb-1">Restricciones</h4>
              <div className="flex flex-wrap gap-1">
                {current.restrictions.map((r, i) => (
                  <span key={i} className={`text-xs px-2 py-0.5 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-stone-100'}`}>{r}</span>
                ))}
              </div>
            </div>
          </div>

          {current.risks.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase opacity-60 mb-2">Riesgos</h4>
              <div className="flex flex-wrap gap-2">
                {current.risks.map((r, i) => (
                  <span key={i} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${state.darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'}`}>
                    <AlertTriangle size={10} />{r}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={`mt-4 p-3 rounded-lg text-xs flex items-center gap-2 ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
            <Shield size={14} />
            Esta interfaz está clasificada como: <strong>{current.verificationStatus.replace(/_/g, ' ')}</strong>. No se ha verificado con datos autorizados.
          </div>
        </div>
      )}
    </div>
  );
}
