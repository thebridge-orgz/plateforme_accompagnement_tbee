import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './styles/index.css'
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);