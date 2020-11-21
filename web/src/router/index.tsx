import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app.routes'

export function Route() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
