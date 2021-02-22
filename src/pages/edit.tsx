import React, { FormEvent, useEffect, useState } from "react";
import { render } from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import { Marker } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";
import { FiX, FiPlus } from "react-icons/fi";

import Map from "../components/map";
import MapIcon from "../components/mapIcon";
import Sidebar from "../components/sidebar";
import PrimaryButton from "../components/primaryButton";
import Loading from "../components/loading";
import api from "../services/api";
import '../css/pages/create-orphanage.css';

interface Orphanage {
  name: string;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
}

interface OrphanageParams {
  id: string;
}

export default function Edit() {
  const params = useParams<OrphanageParams>()
  const [orphanage, setOrphanage] = useState<Orphanage>()

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((res) => {
      setOrphanage(res.data);
    });
  }, [params.id]);
  

  const history = useHistory()
  

  document.title = 'Happy | Editar Orfanato'

  // const [position, setPosition] = useState({ lat: -30.2589999, lng: -50.520207 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState('')
  // const [images, setImages] = useState<File[]>([])
  // const [previewImages, setPreviewImages] = useState<string[]>([])
  // const [removeImgIndex, setRemoveImgIndex] = useState(100)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

  // if (images.length === 0) {
    //   return alert('Por favor, adicione ao menos uma imagem')
    // }

    // const { lat, lng } = position

    const data = new FormData()

    data.append('name', name)
    // data.append('lat', String(lat))
    // data.append('lng', String(lng))
    data.append('about', about)
    data.append('whatsapp', whatsapp)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    // images.forEach(image => {
    //   data.append('images', image)
    // })
    console.log(data)

    render(
      <span>Aguarde...</span>,
      document.getElementsByClassName('primary-button')[0]
    )

    await api.post(`/edit/${params.id}`, data)

    history.push('/success')
  }
  
  // function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {

  if (!orphanage) {
    return <Loading />;
  }
  
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
      
            {/* <Map style={{ width: '100%', height: 280 }} 
              // onClick={handleMapClick}
            >
              {position.lat !== 0 && <Marker interactive={false} icon={MapIcon} position={[position.lat, position.lng]} />}
            </Map> */}

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} placeholder={orphanage.name} required onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" value={about} placeholder={about} required onChange={event => setAbout(event.target.value)} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp para contato</label>
              <input id="whatsapp" value={whatsapp} placeholder={whatsapp} required onChange={event => setWhatsapp(event.target.value)} />
            </div>

            {/* <div className="input-block" id="images-container"></div> */}
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} placeholder={instructions} required onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Atendimento</label>
              <input id="opening_hours" value={opening_hours} placeholder={opening_hours} required onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends === 'true' ? 'active' : ''} onClick={() => setOpenOnWeekends('true')}>Sim</button>
                <button type="button" className={open_on_weekends === 'false' ? 'active' : ''} onClick={() => setOpenOnWeekends('false')}>Não</button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}
  //   if (!event.target.files) {
  //     return
  //   }

  //   let selectedImages = Array.from(event.target.files)

  //   selectedImages.forEach(image => {
  //     if (image.type.includes('image')) {
      
  //       setImages(selectedImages)

  //       const selectedImagesPreview = selectedImages.map(image =>{
  //         return URL.createObjectURL(image)
  //       })

  //       setPreviewImages(selectedImagesPreview)

  //       setRemoveImgIndex(101)

  //     } else {
  //       return alert('Por favor, adicione apenas arquivos de imagem')
  //     }
  //   })
  // }
  
  // useEffect(() => {
  //   images.splice(removeImgIndex, 1)
  //   previewImages.splice(removeImgIndex, 1)
  //   setRemoveImgIndex(100)

  //   render(
  //     <div>
  //       <label htmlFor="images">Fotos</label>

  //       <div className="images-container">
  //         <input multiple onChange={handleSelectedImages} type="file" id="image[]" />
          
  //         <label htmlFor="image[]" className="new-image">
  //           <FiPlus size={24} color="#15b6d6" />
  //         </label>

  //         {previewImages.map((image, index)=> {
  //           return (
  //             <div key={image} className="uploaded-image">
  //               <span 
  //                 onClick={() => {setRemoveImgIndex(index)}}
  //               >
  //                 <FiX size={24} color="red" />
  //               </span>

  //               <img src={image} alt={name}/>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </div>, 
  //     document.getElementById('images-container')
  //   )
  // }, [removeImgIndex]);
  
  // function handleMapClick(event: LeafletMouseEvent) {
  //   console.log(event.latlng)
  //   const { lat, lng } = event.latlng
    
  //   setPosition({
  //     lat: lat,
  //     lng: lng
  //   })
  // }