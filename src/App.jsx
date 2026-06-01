import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Pricing from './pages/Pricing';
import Onboarding from './pages/Onboarding';
import AppLayout from './components/AppLayout';
import CommandCenter from './pages/CommandCenter';
import AgentPerformance from './pages/AgentPerformance';
import ApprovalQueue from './pages/ApprovalQueue';
import TruthReport from './pages/TruthReport';
import WarRoom from './pages/WarRoom';
import AgentChat from './pages/AgentChat';
import AssetLibrary from './pages/AssetLibrary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated / Onboarding Routes */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/truth-report" element={<TruthReport />} />
        <Route path="/agents/:agentId" element={<AgentChat />} />

        {/* Authenticated Workspace Routes */}
        <Route element={<AppLayout />}>
          <Route path="/command-center" element={<CommandCenter />} />
          <Route path="/war-room" element={<WarRoom />} />
          <Route path="/team" element={<AgentPerformance />} />
          <Route path="/assets" element={<AssetLibrary />} />
          <Route path="/approvals" element={<ApprovalQueue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
