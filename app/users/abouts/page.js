import AboutComponent from '@/components/users/about/AboutComponent'
import LoadingComponent from '@/components/loading/LoadingComponent'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<LoadingComponent/>}>
      <AboutComponent />
    </Suspense>
  )
}

export default page