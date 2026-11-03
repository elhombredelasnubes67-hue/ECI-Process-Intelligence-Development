import { useStore } from '../store/useStore';
import { AlertTriangle } from 'lucide-react';

interface AxisViewProps {
  axisId: string;
  title: string;
  description: string;
}

export function AxisView({ axisId, title, description }: AxisViewProps) {
  const { state } = useStore();
  const axis = state.axes.find(a => a.id === axisId);
  const processes = state.processes.filter(p => p.axisId === axisId);
  const relatedInterfaces = state.interfaces.filter(i => 
    processes.some(p => p.id === i.originId || p.id === i.destinationId)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm opacity-60 mt-1">{description}</p>
      </div>

      {axis && (
        <div className={`rounded-xl border-l-4 p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`} style={{ borderLeftColor: axis.color }}>
          <h2 className="font-semibold text-lg">{axis.name}</h2>
          <p className="text-sm opacity-70 mt-1">{axis.description}</p>
        </div>
      )}

      {/* Processes in this axis */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3">Procesos del eje ({processes.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {processes.map(proc => (
            <div key={proc.id} className={`p-4 rounded-lg border ${state.darkMode ? 'border-gray-600 bg-gray-750' : 'border-stone-200 bg-stone-50'}`}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs opacity-50">{proc.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${state.darkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                  {proc.verificationLevel.replace(/_/g, ' ')}
                </span>
              </div>
              <h4 className="font-medium mt-1">{proc.name}</h4>
              <p className="text-xs opacity-60 mt-1">{proc.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {proc.risks.map((r, i) => (
                  <span key={i} className={`text-xs px-1.5 py-0.5 rounded ${state.darkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'}`}>
                    <AlertTriangle size={8} className="inline mr-0.5" />{r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Interfaces */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3">Interfaces relacionadas ({relatedInterfaces.length})</h3>
        <div className="space-y-2">
          {relatedInterfaces.map(iface => (
            <div key={iface.id} className={`flex items-center gap-3 p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
              <span className="font-mono text-xs font-bold">{iface.id}</span>
              <span className="text-sm">{iface.originId} → {iface.destinationId}</span>
              <span className="text-sm flex-1">{iface.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${iface.verificationStatus === 'NO_VERIFICADA' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {iface.verificationStatus.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
        <AlertTriangle size={12} className="inline mr-1" />
        Los procesos de este eje están clasificados como inferencias funcionales basadas en documentación pública. No constituyen una reproducción de la organización interna de El Corte Inglés.
      </div>
    </div>
  );
}

export function InventoryPage() {
  return <AxisView axisId="EJE2" title="Disponibilidad de Inventario" description="Gestión de catálogo, movimientos, disponibilidad prometida y conciliación de existencias." />;
}

export function OmnichannelPage() {
  return <AxisView axisId="EJE3" title="Operaciones Omnicanal" description="Captura de pedidos, asignación a orígenes, preparación y atención post-venta." />;
}

export function TransportPage() {
  return <AxisView axisId="EJE4" title="Transporte y Entregas" description="Planificación de expediciones, asignación de operadores, seguimiento y confirmación de entrega." />;
}

export function ReverseLogisticsPage() {
  return <AxisView axisId="EJE5" title="Logística Inversa" description="Solicitud de devolución, recogida, inspección y destino final de la mercancía retornada." />;
}
