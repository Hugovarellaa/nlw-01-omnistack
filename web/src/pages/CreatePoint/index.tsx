import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import { ChangeEvent, useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { api } from '../../libs/axios'
import './CreatePoint.css'

interface Items {
  id: number
  name: string
  image_url: string
}

interface IBGEUfResponse {
  sigla: string
}

interface IBGECitiesResponse {
  nome: string
}

export function CreatePoint() {
  const [items, setItems] = useState<Items[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [position, setPosition] = useState<[number, number]>([0, 0])

  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCities, setSelectedCities] = useState('0')

  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })

  // Items API
  async function loadItemsInApi() {
    const response = await api.get('/items')
    setItems(response.data)
  }

  // IBGE API
  async function getApiIBGEUfs() {
    const response = await axios.get<IBGEUfResponse[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados
      `,
    )
    const ufInitials = response.data.map((uf) => uf.sigla)
    setUfs(ufInitials)
  }

  // IBGE API
  async function getApiIBGECities() {
    const response = await axios.get<IBGECitiesResponse[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos`,
    )

    const citiesName = response.data.map((city) => city.nome)

    setCities(citiesName)
  }

  // IBGE API
  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUf(uf)
  }

  // IBGE API
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setSelectedCities(city)
  }

  // Mapa
  function handleMapClick(event: LeafletMouseEvent) {
    setPosition([event.latlng.lat, event.latlng.lng])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSelectedItem(id: number) {
    // Marca o item como Ativo, Caso ele ja esteja ativo ele desmarcar

    const alreadySelected = selectedItems.findIndex((item) => item === id)
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id)
      setSelectedItems(filteredItems)
    } else {
      setSelectedItems((oldItem) => [...oldItem, id])
    }
  }

  // mapa
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      setInitialPosition([latitude, longitude])
    })
  }, [])

  // IBGE API
  useEffect(() => {
    getApiIBGEUfs()
  }, [])

  // IBGE API
  useEffect(() => {
    getApiIBGECities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUf])

  // Items API
  useEffect(() => {
    loadItemsInApi()
  }, [])

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
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          {/* Maps */}
          {/* @ts-ignore erro na própria API - maneira sugerida na comunidade */}
          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} />
          </Map>

          {/* Formulário do estado e cidade */}
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                onChange={handleSelectedUf}
                value={selectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
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
                onChange={handleSelectedCity}
                value={selectedCities}
              >
                <option value="0">Selecione uma Cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectedItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
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
