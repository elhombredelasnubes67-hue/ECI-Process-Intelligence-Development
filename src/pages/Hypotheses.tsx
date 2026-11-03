import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Lightbulb, Plus, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Hypothesis, HypothesisStatus } from '../types';

export default function Hypotheses() {
  const { state, dispatch } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: '', processId: 'P01', indicator: '', method: '', criteria: '' });

  const handleAdd = () => {
    if (!form.question) return;
    const newHyp: Hypothesis = {
      id: `H${String(state.hypotheses.length + 1).padStart(3, '0')}`,
      question: form.question,
      processId: form.processId,
      interfaceId: '',
      availableEvidence: [],
      pendingData: [],
      mainIndicator: form.indicator,
      baseline: 'No establecida',
      expectedResult: 'Por definir',
      validationMethod: form.method || 'Por definir',
      risks: [],
      acceptanceCriteria: form.criteria || 'Por definir',
      obtainedResult: '',
      uncertainty: 'Alta',
      conclusion: '',
      status: 'PROPUESTA',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_HYPOTHESIS', payload: newHyp });
    setForm({ question: '', processId: 'P01', indicator: '', method: '', criteria: '' });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: HypothesisStatus) => {
    const hyp = state.hypotheses.find(h => h.id === id);
    if (hyp) {
      dispatch({ type: 'UPDATE_HYPOTHESIS', payload: { ...hyp, status, updatedAt: new Date().toISOString() } });
    }
  };

  const statusColor = (s: string) => {
    const c: Record<string, string> = {
      'PROPUESTA': 'bg-blue-100 text-blue-800',
      'EN_ANALISIS': 'bg-indigo-100 text-indigo-800',
      'PENDIENTE_DE_DATOS': 'bg-amber-100 text-amber-800',
      'LISTA_PARA_ENSAYO': 'bg-yellow-100 text-yellow-800',
      'ENSAYO_AUTORIZADO': 'bg-cyan-100 text-cyan-800',
      'RESULTADO_INCONCLUSO': 'bg-gray-100 text-gray-800',
      'MEJORA_DEMOSTRADA': 'bg-green-100 text-green-800',
      'MEJORA_NO_DEMOSTRADA': 'bg-red-100 text-red-800',
      'DESCARTADA': 'bg-stone-200 text-stone-600',
    };
    return c[s] || 'bg-gray-100 text-gray-800';
  };

  const statusIcon = (s: string) => {
    if (['MEJORA_DEMOSTRADA'].includes(s)) return <CheckCircle size={12} className="text-green-600" />;
    if (['MEJORA_NO_DEMOSTRADA', 'DESCARTADA'].includes(s)) return <XCircle size={12} className="text-red-500" />;
    if (['PENDIENTE_DE_DATOS'].includes(s)) return <Clock size={12} className="text-amber-600" />;
    return <AlertTriangle size={12} className="text-blue-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Motor de Hipótesis</h1>
          <p className="text-sm opacity-60">{state.hypotheses.length} hipótesis registradas</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">
          <Plus size={14} /> Nueva hipótesis
        </button>
      </div>

      <div className={`p-4 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
        <AlertTriangle size={12} className="inline mr-1" />
        Una hipótesis no puede convertirse automáticamente en deficiencia acreditada ni en mejora demostrada. Requiere validación con datos verificables.
      </div>

      {showForm && (
        <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <h3 className="font-semibold mb-3">Formular nueva hipótesis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <textarea placeholder="Pregunta investigable" value={form.question} onChange={e => setForm({...form, question: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border md:col-span-2 ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} rows={2} />
            <select value={form.processId} onChange={e => setForm({...form, processId: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`}>
              {state.processes.map(p => <option key={p.id} value={p.id}>{p.id} — {p.name}</option>)}
            </select>
            <input placeholder="Indicador principal" value={form.indicator} onChange={e => setForm({...form, indicator: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            <input placeholder="Método de validación" value={form.method} onChange={e => setForm({...form, method: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            <input placeholder="Criterio de aceptación" value={form.criteria} onChange={e => setForm({...form, criteria: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">Registrar</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300">Cancelar</button>
          </div>
        </div>
      )}

      {state.hypotheses.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <Lightbulb size={48} className="mx-auto opacity-20 mb-3" />
          <p className="opacity-50">No hay hipótesis formuladas todavía.</p>
          <p className="text-xs opacity-40 mt-1">Formule hipótesis comprobables a partir del análisis de procesos e interfaces.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {state.hypotheses.map(hyp => (
            <div key={hyp.id} className={`rounded-xl border p-4 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs opacity-50">{hyp.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${statusColor(hyp.status)}`}>
                    {statusIcon(hyp.status)}{hyp.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <select
                  value={hyp.status}
                  onChange={e => updateStatus(hyp.id, e.target.value as HypothesisStatus)}
                  className={`px-2 py-1 rounded text-xs border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`}
                >
                  {['PROPUESTA', 'EN_ANALISIS', 'PENDIENTE_DE_DATOS', 'LISTA_PARA_ENSAYO', 'ENSAYO_AUTORIZADO', 'RESULTADO_INCONCLUSO', 'MEJORA_DEMOSTRADA', 'MEJORA_NO_DEMOSTRADA', 'DESCARTADA'].map(s => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <h3 className="font-semibold mt-2">{hyp.question}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs">
                <div><span className="opacity-50">Proceso:</span> <span className="font-mono">{hyp.processId}</span></div>
                <div><span className="opacity-50">Indicador:</span> {hyp.mainIndicator || '—'}</div>
                <div><span className="opacity-50">Incertidumbre:</span> {hyp.uncertainty}</div>
                <div><span className="opacity-50">Método:</span> {hyp.validationMethod}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
