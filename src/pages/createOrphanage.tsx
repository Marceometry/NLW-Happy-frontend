import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Marker, MapContainer, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";
import { FiX, FiPlus } from "react-icons/fi";

import MapIcon from "../components/mapIcon";
import Sidebar from "../components/sidebar";
import api from "../services/api";
import '../css/pages/create-orphanage.css';


export default function OrphanagesMap() {
  const history = useHistory()
  
  const [position, setPosition] = useState({ lat: -30.2606082, lng: -50.516207 })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { lat, lng } = position

    const data = new FormData()

    data.append('name', name)
    data.append('lat', String(lat))
    data.append('lng', String(lng))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    alert('Cadastro realizado com sucesso!')

    history.push('/orphanages')
  }
  
  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)
    console.log(selectedImages)

    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  // function removeImage() {

  //   images.splice(0, 1)
  //   previewImages.splice(0, 1)
    
  //   console.log(previewImages)
  //   console.log(images)
  // }
  
  // useEffect(() => {}, );
  
  // function handleMapClick(event: LeafletMouseEvent) {
  //   console.log(event.latlng)
  //   const { lat, lng } = event.latlng
  //   setPosition({
  //     lat: lat,
  //     lng: lng
  //   })
  // }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer zoom={16} 
                center={[-30.2606082, -50.516207]} 
                style={{ width: '100%', height: 280 }}
                // onClick={handleMapClick}
            >
              <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

              {position.lat !== 0 && <Marker interactive={false} icon={MapIcon} position={[position.lat, position.lng]} />}
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" value={about} onChange={event => setAbout(event.target.value)} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <div key={image} className="uploaded-image">
                      <span 
                        // onClick={removeImage}
                      >
                        <FiX size={24} color="red" />
                      </span>

                      <img src={image} alt={name}/>
                    </div>
                  )})}
                
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectedImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Atendimento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button type="submit">Confirmar</button>
        </form>
      </main>
    </div>
  );
}