import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Cadastro } from './pages/Cadastro'
import { Vitrine } from './pages/Vitrine'
import { MeuPerfil } from './pages/MeuPerfil'
import { PerfilPublico } from './pages/PerfilPublico'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/vitrine"
            element={
              <ProtectedRoute>
                <Vitrine />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meu-perfil"
            element={
              <ProtectedRoute>
                <MeuPerfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil/:id"
            element={
              <ProtectedRoute>
                <PerfilPublico />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
