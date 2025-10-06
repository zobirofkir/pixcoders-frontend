import AboutComponent from '@/src/components/about/AboutComponent'
import LoadingComponent from '@/src/components/loading/LoadingComponent'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<LoadingComponent/>}>
      <AboutComponent />
    </Suspense>
  )
}

export default page