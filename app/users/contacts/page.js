import ContactComponent from '@/src/components/contact/ContactComponent'
import LoadingComponent from '@/src/components/loading/LoadingComponent'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<LoadingComponent/>}>
      <ContactComponent />
    </Suspense>
  )
}

export default page