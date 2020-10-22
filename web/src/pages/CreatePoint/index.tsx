import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import './CreatePoint.css'

export function CreatePoint() {
  return (
    <div id="page-create-point">
      <header>
        <img src={logoImg} alt="" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para a Home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do
          <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="field">
              <label htmlFor="whatspp">WhatsApp</label>
              <input type="text" name="whatspp" id="whatspp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma Cidade</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img
                src="http://localhost:3333/uploads/lampadas.svg"
                alt="test"
              />
              <span>Lampada</span>
            </li>
            <li className="selected">
              <img
                src="http://localhost:3333/uploads/lampadas.svg"
                alt="test"
              />
              <span>Lampada</span>
            </li>

            <li>
              <img
                src="http://localhost:3333/uploads/lampadas.svg"
                alt="test"
              />
              <span>Lampada</span>
            </li>

            <li>
              <img
                src="http://localhost:3333/uploads/lampadas.svg"
                alt="test"
              />
              <span>Lampada</span>
            </li>

            <li>
              <img
                src="http://localhost:3333/uploads/lampadas.svg"
                alt="test"
              />
              <span>Lampada</span>
            </li>

            <li>
              <img
                src="http://localhost:3333/uploads/lampadas.svg"
                alt="test"
              />
              <span>Lampada</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}
