import AboutComponent from '@/src/components/about/AboutComponent'
import ContactComponent from '@/src/components/contact/ContactComponent'
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

      <div>
        <ContactComponent />
      </div>
    </section>
  )
}

export default page