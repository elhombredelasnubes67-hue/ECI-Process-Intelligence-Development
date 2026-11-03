import { StoreProvider, useStore } from './store/useStore';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProcessMap from './pages/ProcessMap';
import Processes from './pages/Processes';
import Interfaces from './pages/Interfaces';
import Sites from './pages/Sites';
import { InventoryPage, OmnichannelPage, TransportPage, ReverseLogisticsPage } from './pages/AxisViews';
import KPIs from './pages/KPIs';
import EvidencePage from './pages/Evidence';
import Hypotheses from './pages/Hypotheses';
import Simulator from './pages/Simulator';
import Reports from './pages/Reports';
import Audit from './pages/Audit';
import Admin from './pages/Admin';

function AppContent() {
  const { state } = useStore();

  const renderView = () => {
    switch (state.currentView) {
      case 'dashboard': return <Dashboard />;
      case 'map': return <ProcessMap />;
      case 'processes': return <Processes />;
      case 'interfaces': return <Interfaces />;
      case 'sites': return <Sites />;
      case 'inventory': return <InventoryPage />;
      case 'omnichannel': return <OmnichannelPage />;
      case 'transport': return <TransportPage />;
      case 'reverse': return <ReverseLogisticsPage />;
      case 'kpis': return <KPIs />;
      case 'evidence': return <EvidencePage />;
      case 'hypotheses': return <Hypotheses />;
      case 'simulator': return <Simulator />;
      case 'reports': return <Reports />;
      case 'audit': return <Audit />;
      case 'admin': return <Admin />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderView()}
    </Layout>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
