"use client"
import { CldImage } from 'next-cloudinary'
import React from 'react'

const PetImageDisplay = ({ imageId}) => {
  return (
    <CldImage
      width={250}
      height={280}
      crop="fill"
      src={imageId}
      alt="image"
      className="rounded-lg flex flex-col box-border items-center justify-end"
    />
  )
}

export default PetImageDisplay
