import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Onboarding from './pages/Onboarding';
import TeamAssembly from './pages/TeamAssembly';
import CommandCenter from './pages/CommandCenter';
import AgentPerformance from './pages/AgentPerformance';
import ApprovalQueue from './pages/ApprovalQueue';
import TruthReport from './pages/TruthReport';
import WarRoom from './pages/WarRoom';
import AgentChat from './pages/AgentChat';
import AssetLibrary from './pages/AssetLibrary';
import Settings from './pages/Settings';
import AuthCallback from './pages/AuthCallback';
import NotFound from './pages/NotFound';
import './mobile.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Unauthenticated / Onboarding Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/team-assembly" element={<TeamAssembly />} />
          <Route path="/truth-report" element={<TruthReport />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Authenticated Workspace Routes */}
          <Route element={<AppLayout />}>
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/war-room" element={<WarRoom />} />
            <Route path="/team" element={<AgentPerformance />} />
            <Route path="/assets" element={<AssetLibrary />} />
            <Route path="/approvals" element={<ApprovalQueue />} />
            <Route path="/agents/:agentId" element={<AgentChat />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
