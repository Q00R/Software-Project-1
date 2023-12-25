import React from 'react'
import AboutUsCard from './AboutUsCard'
import {ali, mina, mostafa, jana, mariam, mariamA, chilli, omar} from '..assets/profilePhotos'

const AboutUs = () => {
  return (
    <div className='grid grid-rows-2 grid-flow-col auto-rows-auto bg-white m-3 rounded-box shadow-md overflow-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-100'>
      <AboutUsCard 
      imgURL={ali}
      name="Ali Zein"
      profileURL={mina}/>
      <AboutUsCard />
      <AboutUsCard />
      <AboutUsCard />
      <AboutUsCard />
      <AboutUsCard />
      <AboutUsCard />
      <AboutUsCard />
    </div>
  )
}

export default AboutUs