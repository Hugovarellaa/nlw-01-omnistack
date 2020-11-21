import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import './CreatePoint.css'

export function CreatePoint() {
  return (
    <div id="page-create-point">
      <header>
        <Header />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do
          <br /> ponto de coleta
        </h1>
      </form>
    </div>
  )
}
