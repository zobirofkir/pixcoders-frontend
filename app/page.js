import AboutComponent from '@/src/components/about/AboutComponent'
import SliderComponent from '@/src/components/slider/SliderComponent'
import React from 'react'

const page = () => {
  return (
    <section>
      <div>
        <SliderComponent />
      </div>

      <div>
        <AboutComponent />
      </div>
    </section>
  )
}

export default page