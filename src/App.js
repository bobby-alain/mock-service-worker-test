import { useState } from 'react';
import { fetchUser } from './helper/fetchUser';
import './App.css';
import { setupWorker } from 'msw';

if (process.env.NODE_ENV === 'development') {
  const { handlers } = require('./handlers/handlers');
  const worker = setupWorker(...handlers);
  worker.start();
}

function App() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(false);

  const fetchName = async () => {
    setStatus(true);
    const response = await fetchUser();
    setName(response.name);
    setStatus(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing 🧪</h1>
        <h2>{status ? 'Loading...' : name}</h2>
        <button test-id="get-user-button" onClick={fetchName}>
          Get user ▶️
        </button>
      </header>
    </div>
  );
}

export default App;
