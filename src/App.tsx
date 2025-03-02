import './App.css'
import { useCounterStore } from './data/store';
import Dashboard from './pages/Dashboard';

function App() {
  const { count, increase } = useCounterStore() 

  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
