import { Signup } from '@/components/SignUp'
import React from 'react'

const page = () => {
  return (
    <Signup path='/artist/create' push='/profile'/>
  )
}

export default page