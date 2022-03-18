import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { RequireAuth } from './context/RequireAuth';
import { Modal } from './Modal';
import { Home } from './pages/Home';

// Rotas acessar as funções da aplicação
export function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={
        // Verifica se há user salvo
        // Senão, acessa componente <Login />
        <RequireAuth>
          <Home />
        </RequireAuth>
      } />
      <Route path="*" element={<Modal />} />
    </Routes>
    </>
  )
}
