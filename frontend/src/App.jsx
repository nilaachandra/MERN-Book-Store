import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<Homepage />} />
      </Route>
    </Routes>
  );
};

export default App;
