import { Route, Routes } from 'react-router-dom'
import { CreatePoint } from '../pages/CreatePoint'
import { Home } from '../pages/Home'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-point" element={<CreatePoint />} />
    </Routes>
  )
}
