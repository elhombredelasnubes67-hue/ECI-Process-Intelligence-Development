import { useStore } from '../store/useStore';
import { ReactNode } from 'react';
import {
  LayoutDashboard, Network, FolderTree, GitBranch, Building2,
  Package, ShoppingCart, Truck, RotateCcw, BarChart3,
  Shield, Lightbulb, FlaskConical, FileText, ClipboardCheck,
  Settings, Sun, Moon, Search, AlertTriangle, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Inicio Ejecutivo', icon: LayoutDashboard },
  { id: 'map', label: 'Mapa Maestro', icon: Network },
  { id: 'processes', label: 'Procesos', icon: FolderTree },
  { id: 'interfaces', label: 'Interfaces', icon: GitBranch },
  { id: 'sites', label: 'Centros Logísticos', icon: Building2 },
  { id: 'inventory', label: 'Inventario', icon: Package },
  { id: 'omnichannel', label: 'Operaciones Omnicanal', icon: ShoppingCart },
  { id: 'transport', label: 'Transporte', icon: Truck },
  { id: 'reverse', label: 'Logística Inversa', icon: RotateCcw },
  { id: 'kpis', label: 'Indicadores', icon: BarChart3 },
  { id: 'evidence', label: 'Evidencias', icon: Shield },
  { id: 'hypotheses', label: 'Hipótesis', icon: Lightbulb },
  { id: 'simulator', label: 'Simulador', icon: FlaskConical },
  { id: 'reports', label: 'Informes', icon: FileText },
  { id: 'audit', label: 'Auditoría', icon: ClipboardCheck },
  { id: 'admin', label: 'Administración', icon: Settings },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { state, dispatch } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const processCount = state.processes.length;
  const interfaceCount = state.interfaces.length;
  const evidenceCount = state.evidence.length;
  const hypothesisCount = state.hypotheses.length;

  const searchResults = searchQuery.length > 1 ? [
    ...state.processes.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())),
    ...state.interfaces.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase())),
  ].slice(0, 8) : [];

  return (
    <div className={`min-h-screen flex ${state.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-stone-50 text-gray-800'}`}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} border-r flex flex-col`}>
        <div className="p-4 border-b border-inherit">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-sm tracking-wide">ECI PROCESS INTELLIGENCE</h1>
              <p className="text-xs opacity-60">2027 · Mapa Maestro</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
              <X size={18} />
            </button>
          </div>
          <div className={`mt-3 px-2 py-1 rounded text-xs ${state.darkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
            <AlertTriangle size={12} className="inline mr-1" />
            Investigación independiente. Sin afiliación empresarial.
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { dispatch({ type: 'SET_VIEW', payload: item.id }); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                state.currentView === item.id
                  ? state.darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-50 text-blue-800 font-medium'
                  : state.darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-stone-100 text-gray-600'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className={`p-3 border-t ${state.darkMode ? 'border-gray-700' : 'border-stone-200'} text-xs opacity-70`}>
          <div>v1.0 · Nov 2026</div>
          <div>{processCount} procesos · {interfaceCount} interfaces</div>
          <div>{evidenceCount} evidencias · {hypothesisCount} hipótesis</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className={`sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b ${state.darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-stone-200'} backdrop-blur-sm`}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-stone-100">
            <Menu size={20} />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="text"
              placeholder="Buscar procesos, interfaces..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm border ${state.darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-stone-50 border-stone-200 placeholder-stone-400'} focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
            />
            {searchResults.length > 0 && (
              <div className={`absolute top-full mt-1 left-0 right-0 rounded-lg border shadow-lg z-50 ${state.darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-stone-200'}`}>
                {searchResults.map(r => (
                  <button key={r.id} onClick={() => { setSearchQuery(''); dispatch({ type: 'SET_VIEW', payload: 'id' in r && r.id.startsWith('I') ? 'interfaces' : 'processes' }); }}
                    className={`w-full text-left px-3 py-2 text-sm border-b last:border-0 ${state.darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-stone-100 hover:bg-stone-50'}`}>
                    <span className="font-mono text-xs opacity-60">{r.id}</span> — {r.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className={`p-2 rounded-lg ${state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-stone-100'}`}
          >
            {state.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
