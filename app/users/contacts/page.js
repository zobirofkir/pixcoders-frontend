import LoadingComponent from '@/components/loading/LoadingComponent'
import ContactComponent from '@/components/users/contact/ContactComponent'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<LoadingComponent/>}>
      <ContactComponent />
    </Suspense>
  )
}

export default page