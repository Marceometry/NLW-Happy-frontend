import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { render } from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import { Marker } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";
import { FiX, FiPlus } from "react-icons/fi";

import MapIcon from "../components/mapIcon";
import Sidebar from "../components/sidebar";
import PrimaryButton from "../components/primaryButton";
import Map from "../components/map";
import api from "../services/api";
import '../css/pages/create-orphanage.css';

interface Orphanage {
  lat: number;
  lng: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  whatsapp: string;
  open_on_weekends: string;
  images: {
    id: number;
    url: string;
  }[];
}

interface OrphanageParams {
  id: string;
}

export default function OrphanagesMap() {
  const params = useParams<OrphanageParams>()
  const [orphanage, setOrphanage] = useState<Orphanage>()

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((res) => {
      setOrphanage(res.data);
    });
  }, [params.id]);

  console.log(orphanage)
  
  document.title = 'Happy | Adicionar Orfanato'

  const history = useHistory()
  
  // const [position, setPosition] = useState({ lat: -30.2589999, lng: -50.520207 })

  const [name, setName] = useState(`${orphanage?.name}`)
  const [about, setAbout] = useState(`${orphanage?.about}`)
  const [instructions, setInstructions] = useState(`${orphanage?.instructions}`)
  const [opening_hours, setOpeningHours] = useState(`${orphanage?.opening_hours}`)
  const [whatsapp, setWhatsapp] = useState(`${orphanage?.whatsapp}`)
  const [open_on_weekends, setOpenOnWeekends] = useState(`${orphanage?.open_on_weekends}`)
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
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('whatsapp', whatsapp)
    data.append('open_on_weekends', String(open_on_weekends))
    // images.forEach(image => {
    //   data.append('images', image)
    // })

    render(
      <p>Aguarde...</p>,
      document.getElementsByClassName('primary-button')[0]
    )

    await api.post('admin/edit/:id', data)

    history.push('/success')
  }
  
  // function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
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
              <input id="name" placeholder={orphanage?.name} required onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" placeholder={orphanage?.about} required onChange={event => setAbout(event.target.value)} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp para contato</label>
              <input id="whatsapp" placeholder={orphanage?.whatsapp} required onChange={event => setWhatsapp(event.target.value)} />
            </div>

            {/* <div className="input-block" id="images-container"></div> */}
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" placeholder={orphanage?.instructions} required onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Atendimento</label>
              <input id="opening_hours" placeholder={orphanage?.opening_hours} required onChange={event => setOpeningHours(event.target.value)} />
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