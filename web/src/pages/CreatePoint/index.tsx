import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
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

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

export function CreatePoint() {
  const [items, setItems] = useState<Items[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedUF, setSelectedUF] = useState('0')
  const [selectedCities, setSelectedCities] = useState('0')

  async function getApiItems() {
    const response = await api.get('/items')
    setItems(response.data)
  }
  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUF(uf)
  }

  function handleSelectCities(event: ChangeEvent<HTMLSelectElement>) {
    const cities = event.target.value
    setSelectedCities(cities)
  }

  useEffect(() => {
    getApiItems()
  }, [])

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla)
        setUfs(ufInitials)
      })
  }, [])

  useEffect(() => {
    if (selectedUF === '0') {
      return
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`,
      )
      .then((response) => {
        const citiesName = response.data.map((city) => city.nome)
        setCities(citiesName)
      })
  }, [selectedUF])

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

              <select
                name="uf"
                id="uf"
                value={selectedUF}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option value={uf} key={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                onChange={handleSelectCities}
                value={selectedCities}
              >
                <option value="0">Selecione uma Cidade</option>
                {cities.map((city) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
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
