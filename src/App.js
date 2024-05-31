import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Layout from './Layout'
import NoPage from './pages/NoPage'
import User from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/user/:username" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
