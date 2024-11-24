"use client"

import Link from "next/link"

const PetBreed = ({breed}) => {
  return (
    <Link
      href={`/about/dog/${breed}`}
      className="hover:cursor-pointer"
    >
      {`${breed}` }
    </Link>
  )
}

export default PetBreed
