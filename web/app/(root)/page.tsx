import CitiesCombobox from '@/components/au/CitiesCombobox'
import Mapbox from '@/components/Mapbox'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className='flex flex-col gap-5'>
      <div className="flex justify-between">
        <h1 className="text-20 font-bold text-white-1">Explore your area</h1>        
        <CitiesCombobox />
      </div> 
      <Mapbox />
      </section>
    </div>
  )
}

export default Home