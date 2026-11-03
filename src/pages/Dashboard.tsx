import { useStore } from '../store/useStore';
import { BarChart3, Network, GitBranch, Shield, Lightbulb, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const { state } = useStore();

  const stats = {
    axes: state.axes.length,
    processes: state.processes.length,
    interfaces: state.interfaces.length,
    evidenceNodes: state.evidence.length,
    processesWithEvidence: state.processes.filter(p => p.evidenceIds.length > 0).length,
    verifiedInterfaces: state.interfaces.filter(i => i.verificationStatus !== 'NO_VERIFICADA').length,
    inferredRelations: state.interfaces.filter(i => i.verificationStatus === 'NO_VERIFICADA').length,
    openHypotheses: state.hypotheses.filter(h => ['PROPUESTA', 'EN_ANALISIS', 'PENDIENTE_DE_DATOS'].includes(h.status)).length,
    kpisWithBaseline: state.kpis.filter(k => k.baseline !== null).length,
    kpisWithoutData: state.kpis.filter(k => k.validationStatus === 'SIN_DATOS').length,
    contradictoryEvidence: 0,
    pendingValidations: state.evidence.filter(e => e.verification === 'NO_VERIFICADA').length,
    lastUpdate: new Date().toISOString().split('T')[0],
  };

  const cards = [
    { label: 'Ejes empresariales', value: stats.axes, icon: Network, color: 'text-blue-600' },
    { label: 'Procesos catalogados', value: stats.processes, icon: BarChart3, color: 'text-emerald-600' },
    { label: 'Interfaces operativas', value: stats.interfaces, icon: GitBranch, color: 'text-purple-600' },
    { label: 'Nodos documentales', value: stats.evidenceNodes, icon: Shield, color: 'text-amber-600' },
    { label: 'Procesos con evidencia', value: stats.processesWithEvidence, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Interfaces verificadas', value: stats.verifiedInterfaces, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Relaciones inferidas', value: stats.inferredRelations, icon: AlertTriangle, color: 'text-orange-600' },
    { label: 'Hipótesis abiertas', value: stats.openHypotheses, icon: Lightbulb, color: 'text-yellow-600' },
    { label: 'KPIs con línea base', value: stats.kpisWithBaseline, icon: BarChart3, color: 'text-teal-600' },
    { label: 'KPIs sin datos', value: stats.kpisWithoutData, icon: XCircle, color: 'text-red-500' },
    { label: 'Evidencias contradictorias', value: stats.contradictoryEvidence, icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Validaciones pendientes', value: stats.pendingValidations, icon: Clock, color: 'text-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Inicio Ejecutivo</h1>
        <p className="text-sm opacity-60 mt-1">ECI Process Intelligence 2027 — Mapa Maestro de Procesos Críticos</p>
        <div className={`mt-3 p-3 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300 border border-amber-800/30' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
          <AlertTriangle size={14} className="inline mr-1" />
          <strong>Aviso:</strong> Esta herramienta es una investigación tecnológica independiente. No es una aplicación oficial de El Corte Inglés. No existe relación contractual con la compañía. Los datos presentados son inferencias funcionales, hipótesis o antecedentes documentales, no hechos operativos confirmados.
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cards.map((card, i) => (
          <div key={i} className={`p-4 rounded-xl border ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
              <card.icon size={18} className={card.color} />
              <span className="text-2xl font-bold">{card.value}</span>
            </div>
            <p className="text-xs opacity-70">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Axes Overview */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h2 className="font-semibold text-lg mb-4">Ejes Empresariales</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {state.axes.map(axis => {
            const axisProcesses = state.processes.filter(p => p.axisId === axis.id);
            return (
              <div key={axis.id} className={`p-3 rounded-lg border-l-4 ${state.darkMode ? 'bg-gray-750 border-gray-700' : 'bg-stone-50 border-stone-200'}`} style={{ borderLeftColor: axis.color }}>
                <div className="text-xs font-mono opacity-50">{axis.id}</div>
                <div className="font-medium text-sm mt-1">{axis.name}</div>
                <div className="text-xs opacity-60 mt-1">{axisProcesses.length} procesos</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {axisProcesses.map(p => (
                    <span key={p.id} className={`text-xs px-1.5 py-0.5 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-stone-200'}`}>{p.id}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Principles */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h2 className="font-semibold text-lg mb-3">Principios Fundamentales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'}`}>
            <h3 className="font-medium text-sm text-blue-700 dark:text-blue-300">Conocer antes de proponer</h3>
            <p className="text-xs mt-1 opacity-70">No se formula ninguna propuesta sin documentar primero el estado actual del proceso.</p>
          </div>
          <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-green-900/20 border border-green-800/30' : 'bg-green-50 border border-green-200'}`}>
            <h3 className="font-medium text-sm text-green-700 dark:text-green-300">Verificar antes de invertir</h3>
            <p className="text-xs mt-1 opacity-70">Toda inversión requiere evidencia verificable de la necesidad y viabilidad.</p>
          </div>
          <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-50 border border-purple-200'}`}>
            <h3 className="font-medium text-sm text-purple-700 dark:text-purple-300">Demostrar antes de afirmar</h3>
            <p className="text-xs mt-1 opacity-70">Las afirmaciones solo se formulan tras obtener resultados medibles y reproducibles.</p>
          </div>
        </div>
      </div>

      {/* Last update */}
      <div className="text-xs opacity-50 text-right">
        Última actualización del panel: {stats.lastUpdate}
      </div>
    </div>
  );
}
