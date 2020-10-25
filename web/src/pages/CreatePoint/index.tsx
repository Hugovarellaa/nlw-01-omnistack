import { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { api } from '../../services/api'
import './CreatePoint.css'

interface Items {
  id: string
  name: string
  image_url: string
}

export function CreatePoint() {
  const [items, setItems] = useState<Items[]>([])

  async function getApiItems() {
    const response = await api.get('/items')
    setItems(response.data)
  }

  useEffect(() => {
    getApiItems()
  }, [])

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

          <MapContainer center={[-15.461349, -47.6148904]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-15.461349, -47.6148904]}>
              <Popup>Map</Popup>
            </Marker>
          </MapContainer>

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
            {items.map((item) => (
              <li className="" key={item.id}>
                <img src={item.image_url} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}
