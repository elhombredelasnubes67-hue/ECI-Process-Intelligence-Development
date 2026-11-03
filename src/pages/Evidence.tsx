import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Shield, AlertTriangle, Plus, FileText } from 'lucide-react';
import { Evidence, EvidenceNature, EvidenceVerification, EvidenceVigencia } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function EvidencePage() {
  const { state, dispatch } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', claim: '', nature: 'HIPOTESIS_POR_VALIDAR' as EvidenceNature, verification: 'NO_VERIFICADA' as EvidenceVerification, vigencia: 'VIGENCIA_DESCONOCIDA' as EvidenceVigencia, source: '', author: '', limitations: '' });

  const handleAdd = () => {
    if (!form.title || !form.claim) return;
    const newEvidence: Evidence = {
      id: `EV${String(state.evidence.length + 1).padStart(3, '0')}`,
      title: form.title,
      sourceId: '',
      author: form.author || 'Investigador',
      date: new Date().toISOString().split('T')[0],
      reference: '',
      file: '',
      hash: '',
      claim: form.claim,
      limitations: form.limitations ? form.limitations.split(',').map(l => l.trim()) : [],
      reviewer: '',
      nature: form.nature,
      verification: form.verification,
      vigencia: form.vigencia,
      linkedProcesses: [],
      linkedInterfaces: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_EVIDENCE', payload: newEvidence });
    setForm({ title: '', claim: '', nature: 'HIPOTESIS_POR_VALIDAR', verification: 'NO_VERIFICADA', vigencia: 'VIGENCIA_DESCONOCIDA', source: '', author: '', limitations: '' });
    setShowForm(false);
  };

  const natureBadge = (n: string) => {
    const c: Record<string, string> = {
      'DOCUMENTADA_EN_ANTECEDENTE': 'bg-blue-100 text-blue-800',
      'INFERIDA_FUNCIONALMENTE': 'bg-amber-100 text-amber-800',
      'HIPOTESIS_POR_VALIDAR': 'bg-purple-100 text-purple-800',
    };
    return c[n] || 'bg-gray-100 text-gray-800';
  };

  const verificationBadge = (v: string) => {
    const c: Record<string, string> = {
      'NO_VERIFICADA': 'bg-red-100 text-red-800',
      'FUENTE_LOCALIZADA': 'bg-yellow-100 text-yellow-800',
      'CONTRASTADA': 'bg-blue-100 text-blue-800',
      'VALIDADA_CON_DATOS_AUTORIZADOS': 'bg-green-100 text-green-800',
    };
    return c[v] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Registro de Evidencias</h1>
          <p className="text-sm opacity-60">{state.evidence.length} evidencias registradas</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">
          <Plus size={14} /> Nueva evidencia
        </button>
      </div>

      {showForm && (
        <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <h3 className="font-semibold mb-3">Registrar nueva evidencia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Título" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            <input placeholder="Autor" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
            <textarea placeholder="Afirmación respaldada" value={form.claim} onChange={e => setForm({...form, claim: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border md:col-span-2 ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} rows={2} />
            <select value={form.nature} onChange={e => setForm({...form, nature: e.target.value as EvidenceNature})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`}>
              <option value="DOCUMENTADA_EN_ANTECEDENTE">Documentada en antecedente</option>
              <option value="INFERIDA_FUNCIONALMENTE">Inferida funcionalmente</option>
              <option value="HIPOTESIS_POR_VALIDAR">Hipótesis por validar</option>
            </select>
            <select value={form.verification} onChange={e => setForm({...form, verification: e.target.value as EvidenceVerification})} className={`px-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`}>
              <option value="NO_VERIFICADA">No verificada</option>
              <option value="FUENTE_LOCALIZADA">Fuente localizada</option>
              <option value="CONTRASTADA">Contrastada</option>
              <option value="VALIDADA_CON_DATOS_AUTORIZADOS">Validada con datos autorizados</option>
            </select>
            <input placeholder="Limitaciones (separadas por coma)" value={form.limitations} onChange={e => setForm({...form, limitations: e.target.value})} className={`px-3 py-2 rounded-lg text-sm border md:col-span-2 ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-300'}`} />
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">Guardar</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300">Cancelar</button>
          </div>
        </div>
      )}

      {state.evidence.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
          <Shield size={48} className="mx-auto opacity-20 mb-3" />
          <p className="opacity-50">No hay evidencias registradas todavía.</p>
          <p className="text-xs opacity-40 mt-1">Utilice el botón "Nueva evidencia" para comenzar a documentar.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {state.evidence.map(ev => (
            <div key={ev.id} className={`rounded-xl border p-4 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs opacity-50">{ev.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${natureBadge(ev.nature)}`}>{ev.nature.replace(/_/g, ' ')}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${verificationBadge(ev.verification)}`}>{ev.verification.replace(/_/g, ' ')}</span>
                  </div>
                  <h3 className="font-semibold mt-1">{ev.title}</h3>
                </div>
                <FileText size={16} className="opacity-30" />
              </div>
              <p className="text-sm mt-2 opacity-80">{ev.claim}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs opacity-60">
                <span>Autor: {ev.author}</span>
                <span>·</span>
                <span>Fecha: {ev.date}</span>
                <span>·</span>
                <span>Vigencia: {ev.vigencia.replace(/_/g, ' ')}</span>
              </div>
              {ev.limitations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {ev.limitations.map((l, i) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded ${state.darkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                      <AlertTriangle size={8} className="inline mr-0.5" />{l}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
