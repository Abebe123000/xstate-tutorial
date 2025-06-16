import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

type CounterContext = {
  count: number;
}

export type CounterEvent = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

export const counterMachine = createMachine({
  types: {} as {
    context: CounterContext;
    events: CounterEvent;
  },
  id: 'counterMachine',
  context: { count: 0 },
  on: {
    INCREMENT: {
      actions: assign({ count: ({ context }) => context.count + 1 })
    },
    DECREMENT: {
      actions: assign({ count: ({ context }) => Math.max(0, context.count - 1) })
    },
    RESET: {
      actions: assign({ count: 0 })
    }
  }
});

function App() {
  // const [count, setCount] = useState(0)
  const [state, send] = useMachine(counterMachine);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => send({type:'INCREMENT'})}>
          count is {state.context.count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
