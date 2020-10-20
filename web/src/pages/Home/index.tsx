import { FiLogIn } from 'react-icons/fi'
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

          <a href="#">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </a>
        </main>
      </div>
    </div>
  )
}
