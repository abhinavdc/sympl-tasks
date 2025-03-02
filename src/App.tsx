import './App.css'
import { useCounterStore } from './data/store';

function App() {
  const { count, increase } = useCounterStore() 

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => { increase(1) }} type="button">
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
