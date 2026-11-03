import { useStore } from '../store/useStore';
import { BarChart3, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function KPIs() {
  const { state } = useStore();

  const statusColor = (status: string) => {
    switch (status) {
      case 'SIN_DATOS': return 'bg-red-100 text-red-700';
      case 'DATOS_PARCIALES': return 'bg-amber-100 text-amber-700';
      case 'VALIDADO': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Motor de Indicadores (KPIs)</h1>
        <p className="text-sm opacity-60">{state.kpis.length} indicadores definidos · {state.kpis.filter(k => k.baseline !== null).length} con línea base · {state.kpis.filter(k => k.validationStatus === 'SIN_DATOS').length} sin datos</p>
      </div>

      <div className={`p-4 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
        <AlertTriangle size={12} className="inline mr-1" />
        <strong>Aviso:</strong> Ningún indicador tiene valores atribuidos a El Corte Inglés. Todos los registros están marcados como SIN_DATOS. No se atribuirán valores sin datos suficientes. Los registros sintéticos se identifican permanentemente.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {state.kpis.map(kpi => (
          <div key={kpi.id} className={`rounded-xl border p-4 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs opacity-50">{kpi.code}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${statusColor(kpi.validationStatus)}`}>
                    {kpi.validationStatus.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="font-semibold mt-1">{kpi.name}</h3>
              </div>
              <BarChart3 size={18} className="opacity-30" />
            </div>

            <div className="mt-3 space-y-2">
              <div>
                <span className="text-xs opacity-50">Fórmula:</span>
                <p className={`text-xs font-mono p-2 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-stone-100'}`}>{kpi.formula}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="opacity-50">Unidad</span>
                  <p className="font-medium">{kpi.unit}</p>
                </div>
                <div>
                  <span className="opacity-50">Período</span>
                  <p className="font-medium">{kpi.period}</p>
                </div>
                <div>
                  <span className="opacity-50">Origen</span>
                  <p className="font-medium">{kpi.dataSource === 'SIN_DATOS' ? 'Sin datos' : kpi.dataSource}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-inherit">
                <div>
                  <span className="opacity-50">Línea base</span>
                  <p className="font-medium">{kpi.baseline !== null ? kpi.baseline : '—'}</p>
                </div>
                <div>
                  <span className="opacity-50">Observado</span>
                  <p className="font-medium">{kpi.observedValue !== null ? kpi.observedValue : '—'}</p>
                </div>
                <div>
                  <span className="opacity-50">Objetivo</span>
                  <p className="font-medium">{kpi.target !== null ? kpi.target : '—'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3">Resumen de estado</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
            <XCircle size={20} className="mx-auto text-red-500 mb-1" />
            <div className="text-2xl font-bold">{state.kpis.filter(k => k.validationStatus === 'SIN_DATOS').length}</div>
            <div className="text-xs opacity-60">Sin datos</div>
          </div>
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
            <CheckCircle size={20} className="mx-auto text-green-500 mb-1" />
            <div className="text-2xl font-bold">{state.kpis.filter(k => k.baseline !== null).length}</div>
            <div className="text-xs opacity-60">Con línea base</div>
          </div>
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <BarChart3 size={20} className="mx-auto text-blue-500 mb-1" />
            <div className="text-2xl font-bold">{state.kpis.filter(k => k.observedValue !== null).length}</div>
            <div className="text-xs opacity-60">Con valor observado</div>
          </div>
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
            <BarChart3 size={20} className="mx-auto text-purple-500 mb-1" />
            <div className="text-2xl font-bold">{state.kpis.length}</div>
            <div className="text-xs opacity-60">Total definidos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
