import React from 'react'
import AboutUsCard from './AboutUsCard'

const AboutUs = () => {
  return (
    <div className='grid grid-rows-2 grid-flow-col auto-rows-auto bg-white m-3 rounded-box shadow-md overflow-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-100'>
      <AboutUsCard 
    //   imgURL={}
    //   name={}
    //   profileURL={}/
    />
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