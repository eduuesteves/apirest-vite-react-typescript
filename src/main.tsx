import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { AuthProvider } from './context/AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    {/** Passando contexto para os componentes  */}
    <AuthProvider>
      {/** Passando rotas para os componentes  */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
