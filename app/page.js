import React from 'react';
import dynamic from 'next/dynamic'
const LoginLayout = dynamic(() => import('./login/layout'), { ssr: false })

export default function Home() {
 
  return (
    <>
      <LoginLayout />
    </>
  )
}
