import { useStore } from '../store/useStore';
import { ClipboardCheck, Shield, AlertTriangle } from 'lucide-react';

export default function Audit() {
  const { state } = useStore();

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Registro de Auditoría</h1>
        <p className="text-sm opacity-60">{state.auditLog.length} eventos registrados</p>
      </div>

      <div className={`p-4 rounded-lg text-xs ${state.darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-800'}`}>
        <Shield size={12} className="inline mr-1" />
        Los registros de auditoría capturan modificaciones relevantes: actor, fecha, operación, recurso, versión anterior, versión nueva, resultado y motivo. Estos registros están protegidos contra alteraciones no autorizadas.
      </div>

      {state.auditLog.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <ClipboardCheck size={48} className="mx-auto opacity-20 mb-3" />
          <p className="opacity-50">No hay eventos de auditoría registrados.</p>
          <p className="text-xs opacity-40 mt-1">Los eventos se registrarán automáticamente al realizar modificaciones en el sistema.</p>
        </div>
      ) : (
        <div className={`rounded-xl border overflow-hidden ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <table className="w-full text-xs">
            <thead>
              <tr className={state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}>
                <th className="px-3 py-2 text-left font-semibold">Fecha</th>
                <th className="px-3 py-2 text-left font-semibold">Actor</th>
                <th className="px-3 py-2 text-left font-semibold">Operación</th>
                <th className="px-3 py-2 text-left font-semibold">Recurso</th>
                <th className="px-3 py-2 text-left font-semibold">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {state.auditLog.map(event => (
                <tr key={event.id} className={`border-t ${state.darkMode ? 'border-gray-700' : 'border-stone-100'}`}>
                  <td className="px-3 py-2 font-mono">{new Date(event.date).toLocaleString('es-ES')}</td>
                  <td className="px-3 py-2">{event.actor}</td>
                  <td className="px-3 py-2">{event.operation}</td>
                  <td className="px-3 py-2">{event.resource}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded ${event.result === 'EXITO' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {event.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compliance Summary */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3">Resumen de cumplimiento</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-2xl font-bold">{state.processes.length}</div>
            <div className="text-xs opacity-60">Procesos</div>
          </div>
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-2xl font-bold">{state.interfaces.length}</div>
            <div className="text-xs opacity-60">Interfaces</div>
          </div>
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-2xl font-bold">{state.evidence.length}</div>
            <div className="text-xs opacity-60">Evidencias</div>
          </div>
          <div className={`p-3 rounded-lg text-center ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-2xl font-bold">{state.hypotheses.length}</div>
            <div className="text-xs opacity-60">Hipótesis</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle size={12} className="text-amber-500" />
            <span>Todos los procesos están clasificados como INFERIDA_FUNCIONALMENTE</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle size={12} className="text-amber-500" />
            <span>Ninguna interfaz ha sido verificada con datos autorizados</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle size={12} className="text-amber-500" />
            <span>Todos los KPIs están en estado SIN_DATOS</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle size={12} className="text-red-500" />
            <span>No se han atribuido deficiencias a El Corte Inglés sin pruebas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
