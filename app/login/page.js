import React from 'react'
import dynamic from 'next/dynamic'
const Number = dynamic(() => import('./number/page'), { ssr: false })

function page() {
  return (
    <div><Number /></div>
  )
}

export default page