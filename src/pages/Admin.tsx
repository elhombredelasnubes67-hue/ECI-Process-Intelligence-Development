import { useStore } from '../store/useStore';
import { Settings, AlertTriangle, Database, Shield, RotateCcw, Trash2 } from 'lucide-react';

export default function Admin() {
  const { state, dispatch } = useStore();

  const handleReset = () => {
    if (confirm('¿Restablecer todos los datos a los valores iniciales? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('eci_process_intelligence_2027');
      window.location.reload();
    }
  };

  const handleExportBackup = () => {
    const backup = {
      ...state,
      exportDate: new Date().toISOString(),
      version: '1.0',
      type: 'BACKUP_COMPLETO',
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eci_2027_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Administración</h1>
        <p className="text-sm opacity-60">Configuración del sistema y gestión de datos</p>
      </div>

      {/* System Info */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Database size={16} /> Estado del sistema</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-xs opacity-50">Versión</div>
            <div className="font-medium">1.0</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-xs opacity-50">Almacenamiento</div>
            <div className="font-medium">LocalStorage</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-xs opacity-50">Registros totales</div>
            <div className="font-medium">{state.processes.length + state.interfaces.length + state.evidence.length + state.kpis.length + state.hypotheses.length}</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="text-xs opacity-50">Tema</div>
            <div className="font-medium">{state.darkMode ? 'Oscuro' : 'Claro'}</div>
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Shield size={16} /> Modelo de roles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { role: 'ADMINISTRADOR', perms: 'Lectura, escritura, administración completa', color: 'bg-red-100 text-red-800' },
            { role: 'ANALISTA', perms: 'Lectura, escritura de procesos e hipótesis', color: 'bg-blue-100 text-blue-800' },
            { role: 'AUDITOR', perms: 'Lectura completa, registro de auditoría', color: 'bg-purple-100 text-purple-800' },
            { role: 'LECTOR', perms: 'Solo lectura. No puede modificar.', color: 'bg-green-100 text-green-800' },
          ].map(r => (
            <div key={r.role} className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
              <span className={`text-xs px-2 py-0.5 rounded ${r.color}`}>{r.role}</span>
              <p className="text-xs opacity-60 mt-2">{r.perms}</p>
            </div>
          ))}
        </div>
        <div className={`mt-3 p-3 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
          <AlertTriangle size={12} className="inline mr-1" />
          Nota: En esta versión la autenticación se gestiona localmente. Para producción se requiere integración con Cloudflare Access o sistema equivalente. No se crean administradores anónimos.
        </div>
      </div>

      {/* Architecture */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Settings size={16} /> Arquitectura prevista</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="font-medium text-xs opacity-50">Frontend</div>
            <div>React + TypeScript + Tailwind CSS</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="font-medium text-xs opacity-50">Visualización</div>
            <div>React Flow (@xyflow/react)</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="font-medium text-xs opacity-50">Backend previsto</div>
            <div>Cloudflare Workers</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="font-medium text-xs opacity-50">Base de datos prevista</div>
            <div>Cloudflare D1</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="font-medium text-xs opacity-50">Almacenamiento previsto</div>
            <div>Cloudflare R2 (opcional)</div>
          </div>
          <div className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
            <div className="font-medium text-xs opacity-50">Control de versiones</div>
            <div>GitLab</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3">Acciones de administración</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleExportBackup} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
            <Database size={14} /> Exportar copia de seguridad
          </button>
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700">
            <Trash2 size={14} /> Restablecer datos iniciales
          </button>
        </div>
        <div className={`mt-3 p-3 rounded-lg text-xs ${state.darkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-800'}`}>
          <AlertTriangle size={12} className="inline mr-1" />
          Restablecer eliminará todos los datos locales (evidencias, hipótesis, simulaciones añadidas). Los datos iniciales (20 procesos, 18 interfaces, 20 KPIs) se recargarán.
        </div>
      </div>
    </div>
  );
}
