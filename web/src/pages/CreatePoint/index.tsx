import { FiArrowLeft } from 'react-icons/fi'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import './CreatePoint.css'

export function CreatePoint() {
  const position = [-15.4568511, -47.6065576]

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

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" id="name" name="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" id="whatsapp" name="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          {/* Maps */}
          <MapContainer center={position} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}></Marker>
          </MapContainer>

          {/* Formulário do estado e cidade */}
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

        {/* Itens de coleta */}
        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="" />
              <span>Lampadas</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="" />
              <span>Lampadas</span>
            </li>

            <li className="selected">
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="" />
              <span>Lampadas</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="" />
              <span>Lampadas</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="" />
              <span>Lampadas</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="" />
              <span>Lampadas</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}
