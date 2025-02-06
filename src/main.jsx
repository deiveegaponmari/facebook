import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import DataTokenProvider from './context/data';

createRoot(document.getElementById('root')).render(
 <DataTokenProvider>
 <BrowserRouter>
      <App />
    </BrowserRouter>
 </DataTokenProvider>
   
)
