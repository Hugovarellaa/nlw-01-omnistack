import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/AppRoutes'
import './styles/App.css'

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
