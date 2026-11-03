import { useState } from 'react';
import { useStore } from '../store/useStore';
import { FlaskConical, AlertTriangle, Play, RotateCcw } from 'lucide-react';

export default function Simulator() {
  const { state, dispatch } = useStore();
  const [vars, setVars] = useState({
    duration: 90,
    operatingDays: 65,
    dailyReturns: 20,
    compatibilityRate: 25,
    incrementalValue: 470,
    co2PerOperation: 0.318,
  });
  const [results, setResults] = useState<Record<string, number> | null>(null);

  const calculate = () => {
    const potentialOps = vars.operatingDays * vars.dailyReturns * (vars.compatibilityRate / 100);
    const totalValue = potentialOps * vars.incrementalValue;
    const co2 = potentialOps * vars.co2PerOperation;
    setResults({ potentialOperations: Math.round(potentialOps), totalIncrementalValue: Math.round(totalValue), co2Equivalent: Math.round(co2 * 10) / 10 });
  };

  const reset = () => {
    setVars({ duration: 90, operatingDays: 65, dailyReturns: 20, compatibilityRate: 25, incrementalValue: 470, co2PerOperation: 0.318 });
    setResults(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Simulador</h1>
        <p className="text-sm opacity-60">Sistema de simulación independiente de los datos reales</p>
      </div>

      <div className={`p-4 rounded-lg text-xs ${state.darkMode ? 'bg-red-900/20 text-red-300 border border-red-800/30' : 'bg-red-50 text-red-800 border border-red-200'}`}>
        <AlertTriangle size={12} className="inline mr-1" />
        <strong>IMPORTANTE:</strong> Este simulador produce resultados sintéticos. Las cifras NO representan datos reales de El Corte Inglés. Los escenarios son hipótesis del modelo documental. No declare ahorro de emisiones sin estudiar los viajes efectivamente sustituidos.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Variables */}
        <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FlaskConical size={18} /> Variables del escenario
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium opacity-70">Duración del escenario (días)</label>
              <input type="number" value={vars.duration} onChange={e => setVars({...vars, duration: +e.target.value})} className={`w-full mt-1 px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            </div>
            <div>
              <label className="text-xs font-medium opacity-70">Días operativos</label>
              <input type="number" value={vars.operatingDays} onChange={e => setVars({...vars, operatingDays: +e.target.value})} className={`w-full mt-1 px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            </div>
            <div>
              <label className="text-xs font-medium opacity-70">Retornos diarios analizados</label>
              <input type="number" value={vars.dailyReturns} onChange={e => setVars({...vars, dailyReturns: +e.target.value})} className={`w-full mt-1 px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            </div>
            <div>
              <label className="text-xs font-medium opacity-70">Tasa de compatibilidad (%)</label>
              <input type="number" value={vars.compatibilityRate} onChange={e => setVars({...vars, compatibilityRate: +e.target.value})} className={`w-full mt-1 px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            </div>
            <div>
              <label className="text-xs font-medium opacity-70">Valor incremental supuesto por operación (€)</label>
              <input type="number" value={vars.incrementalValue} onChange={e => setVars({...vars, incrementalValue: +e.target.value})} className={`w-full mt-1 px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            </div>
            <div>
              <label className="text-xs font-medium opacity-70">CO₂ por operación (kg, proxy no verificado)</label>
              <input type="number" step="0.001" value={vars.co2PerOperation} onChange={e => setVars({...vars, co2PerOperation: +e.target.value})} className={`w-full mt-1 px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={calculate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
              <Play size={14} /> Calcular escenario
            </button>
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300">
              <RotateCcw size={14} /> Restablecer
            </button>
          </div>
        </div>

        {/* Results */}
        <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <h3 className="font-semibold mb-4">Resultados del escenario</h3>
          {results ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'}`}>
                <div className="text-xs opacity-60">Operaciones potenciales</div>
                <div className="text-3xl font-bold text-blue-600">{results.potentialOperations.toLocaleString()}</div>
                <div className="text-xs opacity-50 mt-1">= días operativos × retornos diarios × tasa compatibilidad</div>
              </div>
              <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-green-900/20 border border-green-800/30' : 'bg-green-50 border border-green-200'}`}>
                <div className="text-xs opacity-60">Valor incremental bruto hipotético</div>
                <div className="text-3xl font-bold text-green-600">{results.totalIncrementalValue.toLocaleString()} €</div>
                <div className="text-xs opacity-50 mt-1">= operaciones potenciales × valor por operación</div>
              </div>
              <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-amber-900/20 border border-amber-800/30' : 'bg-amber-50 border border-amber-200'}`}>
                <div className="text-xs opacity-60">CO₂ equivalente (proxy no verificado)</div>
                <div className="text-3xl font-bold text-amber-600">{results.co2Equivalent.toLocaleString()} kg</div>
                <div className="text-xs opacity-50 mt-1">= operaciones × CO₂ por operación (proxy)</div>
              </div>
              <div className={`p-3 rounded-lg text-xs ${state.darkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-800'}`}>
                <AlertTriangle size={12} className="inline mr-1" />
                Estos resultados son hipotéticos y sintéticos. No representan mediciones reales. No constituyen ahorro de emisiones acreditado.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 opacity-40">
              <div className="text-center">
                <FlaskConical size={48} className="mx-auto mb-3 opacity-30" />
                <p>Configure variables y pulse "Calcular escenario"</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulation History */}
      {state.simulations.length > 0 && (
        <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <h3 className="font-semibold mb-3">Escenarios registrados ({state.simulations.length})</h3>
          <div className="space-y-2">
            {state.simulations.map(sim => (
              <div key={sim.id} className={`flex items-center gap-3 p-3 rounded-lg ${state.darkMode ? 'bg-gray-750' : 'bg-stone-50'}`}>
                <FlaskConical size={16} className="opacity-40" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{sim.name}</div>
                  <div className="text-xs opacity-50">{sim.createdAt} · Sintético: {sim.isSynthetic ? 'Sí' : 'No'}</div>
                </div>
                <div className="text-xs text-right">
                  <div>{sim.results?.potentialOperations || 0} ops</div>
                  <div>{(sim.results?.totalIncrementalValue || 0).toLocaleString()} €</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
