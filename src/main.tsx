import { BrowserRouter } from 'react-router-dom';
import App from './app/App'
import './styles/index.css'
import * as ReactDOM from 'react-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);