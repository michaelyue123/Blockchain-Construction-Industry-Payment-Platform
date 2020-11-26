import React from 'react';
import { useRoutes, Routes, Route } from 'react-router-dom';
import NavBar from './landing-page/NavBar';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from './landing-page/LandingPage';
import Register from './landing-page/auth/registration/Register';
import RegOwner from './landing-page/auth/registration/RegOwner';
import RegContractor from './landing-page/auth/registration/RegContractor';
import Login from "./landing-page/auth/Login";
import AboutUs from "./landing-page/about-us/AboutUs";
import Blogs from "./landing-page/tools/Blogs";
import Resources from "./landing-page/tools/Resources";
import CaseStudies from "./landing-page/tools/CaseStudies";
import OwnerHome from '../components/content-page/owner/OwnerHome';
import LeadHome from '../components/content-page/lead/LeadHome';
import ContractorHome from '../components/content-page/contractor/ContractorHome';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import AppRoutes from './AppRoutes';


const App = () => {

  const routing = useRoutes(AppRoutes);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/CaseStudies" element={<CaseStudies />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/RegOwner" element={<RegOwner />} />
          <Route path="/RegContractor" element={<RegContractor />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          
          <ProtectedRoute path="/owner" element={<OwnerHome />} />
          <ProtectedRoute path="/lead" element={<LeadHome />} />
          <ProtectedRoute path="/contractor" element={<ContractorHome />} />
        </Routes>
        {routing}
      </div>
    </ThemeProvider>
  );
}

export default App;
