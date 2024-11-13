import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import BedManagementPage from './pages/BedManagementPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PharmacyPage from './pages/PharmacyPage';
import RegisterOPDPage from './pages/RegisterOPDPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/beds" element={<BedManagementPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
          <Route path="/register-opd" element={<RegisterOPDPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;