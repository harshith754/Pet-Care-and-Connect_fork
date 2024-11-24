"use client"

import Image from "next/image"
import AdoptionRequest from "./AdoptionRequest"
import ProfileAdoptionDisplay from "./ProfileAdoptionDisplay"

const ManageAdoptionRequests = ({adoptionRequests}) => {

  console.log(adoptionRequests)

  return (
    <div className="flex flex-col justify-center items-center w-full">

      <div className='text-[45px] text-center font-radio-canada text-darkslategray pt-5  '>
        Adoption Requests from Users 
      </div>
      <div className="relative bg-deepskyblue w-[28%] min-w-[200px] h-[2px] mt-2 mb-2" />
      
      <div className='flex flex-col justify-center py-8 gap-4 items-center w-[100%] font-radio-canada text-darkslategray '>
        {
          adoptionRequests.map(adoptionRequest =>(

           <AdoptionRequest adoptionRequest={adoptionRequest} key={adoptionRequest._id}/>
          ))  
          
        }
      </div>
    </div>
  )
}

export default ManageAdoptionRequests
