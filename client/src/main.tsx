import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/global.scss';
import App from './App.tsx';
import { WeatherProvider } from './components/contexts/WeatherContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <WeatherProvider>
    <App />
  </WeatherProvider>
);
