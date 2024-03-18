import ReactDOM from 'react-dom/client';
import './index.css';
import Welcome from './welcome';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Welcome />
);

