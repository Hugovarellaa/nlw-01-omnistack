import { Route, Routes } from 'react-router-dom'
import { CreatePoint } from '../pages/CreatePoint'
import { Home } from '../pages/Home'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/create-point" Component={CreatePoint} />
    </Routes>
  )
}
