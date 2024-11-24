"use client"
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import ProfileAdoptionDisplay from './ProfileAdoptionDisplay'

const AdoptionRequest = ({adoptionRequest}) => {

  const [status,setStatus]=useState("");

  const [submitting,setSubmitting] =useState(false);

  const [displayedStatus,setDisplayedStatus]=useState(adoptionRequest.status);

  const [isRejectButton,setIsRejectButton]= useState(false);

  // console.log(adoptionRequest)


  const submitStatus= async()=>{
    setSubmitting(true);

    try {

      const putData= JSON.stringify({
        status
      })
      const res= await axios.put(`/api/adoption/${adoptionRequest._id}`,  putData );

      console.log(res);

      setDisplayedStatus(status);


      setStatus("");

    } catch (error){
      console.log(error)
      toast.error("There was some error updating status!")


    }
    setSubmitting(false);
  }

  const rejectAdoption= async()=>{

    setIsRejectButton(true);

    try {
      const putData= JSON.stringify({
        status:"Rejected request."
      })
      const res= await axios.put(`/api/adoption/${adoptionRequest._id}`,  putData );

      console.log(res);
      setDisplayedStatus("Rejected Request.");


    } catch (error){
      console.log(error)

      toast.error("There was some error rejecting request!")


    }
    setIsRejectButton(false);
  }


  return (
    <div className='flex flex-row justify-center items-center bg-white rounded-3xl p-6  gap-2'>                  

      <ProfileAdoptionDisplay imageId={adoptionRequest.pet.imageId} />             
      <div className='flex flex-col justify-center items-start gap-2 pl-2'>
        <div className='flex flex-row justify-center'>Pet Name :&nbsp; &nbsp; { adoptionRequest.pet.name}</div>
        <div className='flex flex-row justify-center'>Pet Breed :&nbsp; &nbsp; { adoptionRequest.pet.breed}</div>     

        <div className='flex flex-row max-w-[450px]'>Comment: &nbsp; &nbsp;

          <span className="text-[14px] leading-[20px] pl-3 ">{ adoptionRequest.comments}</span>
          
        </div> 

        <div className='flex flex-row justify-center'>Sent By:</div> 

        <div className="flex flex-col justify-center items-start bg-aliceblue-200 rounded-3xl p-4 ml-4 gap-2">

          <div className='flex flex-row justify-center'>Name :&nbsp; &nbsp; { adoptionRequest.name}</div> 
          
          <div className='flex flex-row justify-center '>Address :&nbsp; &nbsp; { adoptionRequest.address}</div> 
          <div className='flex flex-row justify-center'>Phone Number :&nbsp; &nbsp; { adoptionRequest.phoneNumber}</div> 

          <div className='flex flex-row justify-center items-center'>Email:&nbsp; &nbsp;
            <Image
              src={adoptionRequest.user.image}
              width={27}
              height={27}
              className="rounded-full ml-3 mr-[3px]"
              alt="profile"
            /> 
            { adoptionRequest.user.email} 
          </div>

        </div>

        

        

        <div className='bg-deepskyblue flex flex-col  text-white py-5 rounded-xl ml-4 mt-2 justify-self-center gap-2 px-10'>
          <div className='font-semibold  max-w-[300px]'>
            Adoption Status: &nbsp; &nbsp; {displayedStatus? (displayedStatus):("Unchecked")}
          </div>

          <div
            className="flex flex-row gap-3"
          >
            <input
              className="flex flex-row gap-3 justify-center items-center h-[30px] rounded-lg text-[13px] px-4 bg-white text-gray-500 focus:outline-none focus:border-transparent "
              placeholder="Update Status Here."
              value={status}
              onChange={(e)=>{setStatus(e.target.value)}}
            >   
            </input>

            <button
              className="rounded-lg p-2 px-3 bg-blue-700 text-white font-semibold hover:scale-105 hover:cursor-pointer"
              onClick={submitStatus}
              disabled={submitting}
            >
              Update
            </button>

            <button
              className="rounded-lg p-2 px-3 bg-red-600 text-white font-semibold hover:scale-105 hover:cursor-pointer"
              onClick={rejectAdoption}
              disabled={isRejectButton}
            >
              Reject 
            </button>

          </div>

          


        </div>

      </div>
      
    </div>
  )
}

export default AdoptionRequest
