import { useStore } from '../store/useStore';
import { Building2, AlertTriangle, MapPin } from 'lucide-react';

export default function Sites() {
  const { state } = useStore();

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Centros Logísticos</h1>
        <p className="text-sm opacity-60">{state.sites.length} centros registrados como antecedentes de investigación</p>
      </div>

      <div className={`p-4 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
        <AlertTriangle size={12} className="inline mr-1" />
        <strong>Aviso:</strong> Estos nombres y ubicaciones son antecedentes de investigación basados en fuentes públicas. No se han verificado direcciones, coordenadas, operadores ni rutas. Las funciones históricas y la vigencia de cada plataforma están por confirmar. Son 7 nombres y 1 categoría genérica, no 8 centros individualmente confirmados.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.sites.map(site => (
          <div key={site.id} className={`rounded-xl border p-4 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="opacity-40" />
                <span className="font-mono text-xs opacity-50">{site.id}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${site.status === 'INFORMACION_DESCONOCIDA' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-800'}`}>
                {site.status.replace(/_/g, ' ')}
              </span>
            </div>
            <h3 className="font-semibold mt-2">{site.name}</h3>
            <div className="flex items-center gap-1 mt-1 text-xs opacity-60">
              <MapPin size={10} />
              {site.location}, {site.region}
            </div>
            <div className="mt-3">
              <div className="text-xs font-medium opacity-60 mb-1">Funciones históricas:</div>
              <div className="flex flex-wrap gap-1">
                {site.historicalFunctions.map((f, i) => (
                  <span key={i} className={`text-xs px-2 py-0.5 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-stone-100'}`}>{f}</span>
                ))}
              </div>
            </div>
            <p className="text-xs opacity-50 mt-3 italic">{site.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
