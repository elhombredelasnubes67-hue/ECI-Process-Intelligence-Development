import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ChevronRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Processes() {
  const { state } = useStore();
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [filterAxis, setFilterAxis] = useState<string>('ALL');

  const filtered = filterAxis === 'ALL' ? state.processes : state.processes.filter(p => p.axisId === filterAxis);
  const selected = state.processes.find(p => p.id === selectedProcess);

  const verificationBadge = (level: string) => {
    const colors: Record<string, string> = {
      'INFERIDA_FUNCIONALMENTE': 'bg-amber-100 text-amber-800 border-amber-300',
      'DOCUMENTADA_EN_ANTECEDENTE': 'bg-blue-100 text-blue-800 border-blue-300',
      'HIPOTESIS_POR_VALIDAR': 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Catálogo de Procesos</h1>
          <p className="text-sm opacity-60">{state.processes.length} procesos en 5 ejes empresariales</p>
        </div>
        <select
          value={filterAxis}
          onChange={e => setFilterAxis(e.target.value)}
          className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-stone-300'}`}
        >
          <option value="ALL">Todos los ejes</option>
          {state.axes.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Process List */}
        <div className={`lg:col-span-1 rounded-xl border ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} overflow-hidden`}>
          <div className="max-h-[600px] overflow-y-auto">
            {state.axes.map(axis => {
              const axisProcs = filtered.filter(p => p.axisId === axis.id);
              if (axisProcs.length === 0) return null;
              return (
                <div key={axis.id}>
                  <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b ${state.darkMode ? 'bg-gray-750 border-gray-700' : 'bg-stone-50 border-stone-200'}`} style={{ color: axis.color }}>
                    {axis.id} — {axis.name}
                  </div>
                  {axisProcs.map(proc => (
                    <button
                      key={proc.id}
                      onClick={() => setSelectedProcess(proc.id)}
                      className={`w-full text-left px-4 py-3 border-b flex items-center gap-3 transition-colors ${
                        selectedProcess === proc.id
                          ? state.darkMode ? 'bg-blue-900/30 border-gray-700' : 'bg-blue-50 border-stone-200'
                          : state.darkMode ? 'hover:bg-gray-750 border-gray-700' : 'hover:bg-stone-50 border-stone-100'
                      }`}
                    >
                      <span className="font-mono text-xs opacity-50 w-8">{proc.id}</span>
                      <span className="text-sm flex-1">{proc.name}</span>
                      <ChevronRight size={14} className="opacity-30" />
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Detail */}
        <div className={`lg:col-span-2 rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm opacity-50">{selected.id}</span>
                    <span className={`px-2 py-0.5 text-xs rounded border ${verificationBadge(selected.verificationLevel)}`}>
                      {selected.verificationLevel.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1">{selected.name}</h2>
                </div>
              </div>

              <p className="text-sm opacity-80">{selected.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm mb-2">Entradas</h3>
                  <ul className="space-y-1">
                    {selected.inputs.map((inp, i) => (
                      <li key={i} className={`text-xs px-2 py-1 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-stone-100'}`}>{inp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">Salidas</h3>
                  <ul className="space-y-1">
                    {selected.outputs.map((out, i) => (
                      <li key={i} className={`text-xs px-2 py-1 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-stone-100'}`}>{out}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Riesgos identificados</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.risks.map((risk, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${state.darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'}`}>
                      <AlertTriangle size={10} />{risk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Interfaces asociadas</h3>
                <div className="flex flex-wrap gap-2">
                  {state.interfaces.filter(i => i.originId === selected.id || i.destinationId === selected.id).map(iface => (
                    <span key={iface.id} className={`text-xs px-2 py-1 rounded ${state.darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>
                      {iface.id}: {iface.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-3 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
                <Clock size={12} className="inline mr-1" />
                Nivel de verificación: {selected.verificationLevel.replace(/_/g, ' ')}. Este proceso no ha sido verificado con datos autorizados.
                <br />Fecha de revisión: {selected.reviewDate}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 opacity-40">
              <div className="text-center">
                <CheckCircle size={48} className="mx-auto mb-3 opacity-30" />
                <p>Seleccione un proceso para ver su detalle</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
