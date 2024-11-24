"use client"
import { Button } from 'antd'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const EditButton = ({creator,petId}) => {

  const { data: session } = useSession();

  // console.log(session?.user)
  // console.log(creator)
  const router=useRouter();

  const handleClick=()=>{
    router.push(`/find-pets/${petId}/edit`)
  }

  return (
    <>
    { session?.user.id===creator?._id && (
      <Button
        className="flex justify-center cursor-pointer items-center text-[20px] text-white font-jua rounded-xl px-12 sm:px-8 py-8 sm:text-[14px] bg-deepskyblue"
        type="primary"
        size="middle"
        shape="default"
        onClick={handleClick}
      >
        Edit or Delete Pet!!
      </Button>
      
    )}
    </>
    
  )


    
      
    
    
}

export default EditButton
