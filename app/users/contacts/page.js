import ContactComponent from '@/src/components/users/contact/ContactComponent'
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