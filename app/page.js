import AboutComponent from '@/components/users/about/AboutComponent'
import ContactComponent from '@/components/users/contact/ContactComponent'
import LoadingComponent from '@/components/loading/LoadingComponent'
import SliderComponent from '@/components/slider/SliderComponent'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>

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

    </Suspense>
  )
}

export default page