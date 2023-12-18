import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import WelcomePage from './pages/WelcomePage';
import MyMainPage from './pages/MyMainPage';

function Main() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<WelcomePage />} />
            <Route path="my" element={<MyMainPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default Main;
