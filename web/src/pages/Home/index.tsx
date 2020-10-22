import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import './Home.css'

export function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logoImg} alt="" />
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}
