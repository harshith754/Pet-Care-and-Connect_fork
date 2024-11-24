"use client"

import { CldImage } from "next-cloudinary"

const ProfileAdoptionDisplay = ( {imageId} ) => {

  return (
    <div className="flex flex-row justify-center">

      <CldImage
        width={250}
        height={280}
        crop="fill"
        src={imageId}
        alt="image"
        className="rounded-xl flex flex-col box-border items-center justify-end"
      />

    </div>
    
  )
}

export default ProfileAdoptionDisplay
