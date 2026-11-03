import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Process, Interface, Evidence, Hypothesis, SimulationRun, AuditEvent, KPIDefinition } from '../types';
import { initialAxes, initialProcesses, initialInterfaces, initialSites, initialKPIs, defaultSimulation } from '../data/initialData';

const STORAGE_KEY = 'eci_process_intelligence_2027';

const initialState: AppState = {
  axes: initialAxes,
  processes: initialProcesses,
  interfaces: initialInterfaces,
  sites: initialSites,
  sources: [],
  evidence: [],
  kpis: initialKPIs,
  hypotheses: [],
  simulations: [defaultSimulation as SimulationRun],
  auditLog: [],
  darkMode: false,
  currentView: 'dashboard',
};

type Action =
  | { type: 'SET_VIEW'; payload: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'ADD_PROCESS'; payload: Process }
  | { type: 'UPDATE_PROCESS'; payload: Process }
  | { type: 'ADD_INTERFACE'; payload: Interface }
  | { type: 'UPDATE_INTERFACE'; payload: Interface }
  | { type: 'ADD_EVIDENCE'; payload: Evidence }
  | { type: 'UPDATE_EVIDENCE'; payload: Evidence }
  | { type: 'ADD_HYPOTHESIS'; payload: Hypothesis }
  | { type: 'UPDATE_HYPOTHESIS'; payload: Hypothesis }
  | { type: 'ADD_SIMULATION'; payload: SimulationRun }
  | { type: 'UPDATE_KPI'; payload: KPIDefinition }
  | { type: 'ADD_AUDIT'; payload: AuditEvent }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'ADD_PROCESS':
      return { ...state, processes: [...state.processes, action.payload] };
    case 'UPDATE_PROCESS':
      return { ...state, processes: state.processes.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'ADD_INTERFACE':
      return { ...state, interfaces: [...state.interfaces, action.payload] };
    case 'UPDATE_INTERFACE':
      return { ...state, interfaces: state.interfaces.map(i => i.id === action.payload.id ? action.payload : i) };
    case 'ADD_EVIDENCE':
      return { ...state, evidence: [...state.evidence, action.payload] };
    case 'UPDATE_EVIDENCE':
      return { ...state, evidence: state.evidence.map(e => e.id === action.payload.id ? action.payload : e) };
    case 'ADD_HYPOTHESIS':
      return { ...state, hypotheses: [...state.hypotheses, action.payload] };
    case 'UPDATE_HYPOTHESIS':
      return { ...state, hypotheses: state.hypotheses.map(h => h.id === action.payload.id ? action.payload : h) };
    case 'ADD_SIMULATION':
      return { ...state, simulations: [...state.simulations, action.payload] };
    case 'UPDATE_KPI':
      return { ...state, kpis: state.kpis.map(k => k.id === action.payload.id ? action.payload : k) };
    case 'ADD_AUDIT':
      return { ...state, auditLog: [...state.auditLog, action.payload] };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...init, ...parsed };
      }
    } catch (e) {
      console.warn('Error loading saved state:', e);
    }
    return init;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error saving state:', e);
    }
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
