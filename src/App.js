import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Controls from './components/controls';
import AddControls from './components/add-Controls';
import RegulatoryRisk from './components/regulatory-risk';
import AddRegulatoryrisk from './components/add-regulatoryRisk';
import RiskCriteria from './components/riskCriteria';
import AddRiskCriteria from './components/add-riskCriteria';
import AddSummaryRisk from './components/add-summaryRisk';
import SummaryRisk from './components/summary-risk';
import Onboarding from './components/onboarding';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Onboarding/>}/>
        <Route path="/contorls" element={<Controls />} />
        <Route path="/regulatory-risk" element={<RegulatoryRisk />} />
        <Route path="/riskCriteria" element={<RiskCriteria />} />
        <Route path="/add-riskCriteria" element={<AddRiskCriteria />} />
        <Route path='/add-regulatoryRisk' element={<AddRegulatoryrisk/>}/>
        <Route path="/add-controls" element={<AddControls />} />
        <Route path="/add-summaryRisk" element={<AddSummaryRisk />} />
        <Route path="/summary-risk" element={<SummaryRisk />} />
      </Routes>
    </Router>
  );
};

export default App;
