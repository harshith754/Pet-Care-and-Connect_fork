"use client"
import { Button } from 'antd'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const AdoptPetButton = ({pet}) => {
  
  const creator=pet.creator;
  const { data: session } = useSession();
  const router = useRouter();


  const [clicked,setClicked]= useState(false)

  const [address,setAddress] = useState("");

  const [phoneNumber,setPhoneNumber] = useState("");

  const [comments,setComments] = useState("");

  const [submitting,setSubmitting] = useState(false);

  // console.log(session && session.user)

  const adoptNow=()=>{
    if(creator){
      // toast.success(`Sent Adoption request(demo) to ${creator.username} !!`)
      if(session && session.user) {
        setClicked(true);
      } else {
        alert('You need to login first!!')
        router.push('/api/auth/signin')
      }
      
    }
    else {
      toast.error('Creator currently unavailable... Try again later!!')
    }
  }

  const sendAdoptionRequest=async (e)=>{
    e.preventDefault();

    if(!(session && session.user)) {
      alert('You need to login first!!')
      router.push('/api/auth/signin')
      return 
    }

    if(address===""){
      toast.error("Address cannot be empty");
      return;
    }
    if(phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)){
      toast.error("Phone Number must be a 10 digit number.");
      return;
    }

    if(comments===""){
      toast.error("Please add some comments.");
      return;
    }

    setSubmitting(true);

    console.log(session.user)
    console.log(pet.creator._id)


    const postData= JSON.stringify({
      name:session.user.name,
      email:session.user.email,
      address,
      phoneNumber,
      user: session?.user.id || "none",
      pet: pet._id,
      petCreator: pet.creator._id,
      comments
    })


    const res = await axios.post("/api/adoption/new" ,postData)
    console.log(console.log(res))

    if(res.status=200) toast.success("Adoption request sent successfully!!");
    
    else toast.error("There was some error :(. Please try again later!")

    setSubmitting(false)

  }

  return (

    < div className='flex flex-col justify-center items-center w-full'>
      {!clicked && session?.user.id != creator?._id && <Button
        className="flex justify-center cursor-pointer items-center text-[20px] text-white font-jua rounded-xl px-12 sm:px-8 py-8 sm:text-[14px] bg-deepskyblue"
        type="primary"
        size="middle"
        shape="default"
        onClick={adoptNow}
      >
        Adopt Now!!
      </Button>}

      {clicked && 
        <div className='flex flex-col justify-center items-center bg-aliceblue-200 rounded-3xl p-10 w-[25%] sm:w-[60%]'>
          <div className='font-bold text-[20px] '>
            Adoption Form
          </div>
          <div className='flex flex-col py-8 gap-4 items-start w-[100%]'>
            <div className='flex flex-row' >Name :&nbsp; &nbsp; { session.user.name}</div>
            <div className='flex flex-row'>Email : &nbsp; &nbsp; {session.user.email}</div>
            <div className='flex flex-row justify-between w-full sm:flex-col '>Address : 


              <textarea
                className="flex flex-row gap-3 justify-center items-center h-[30px] rounded-lg text-[13px] p-2 px-4 bg-white w-[60%] text-gray-500 focus:outline-none focus:border-transparent sm:w-[90%]"
                value={address}
                placeholder="Enter your address"
                onChange={(e)=>{setAddress(e.target.value)}}
              >   
              </textarea>
            </div>

            <div className='flex flex-row justify-between w-full sm:flex-col '>Phone No : 


              <input
                className="flex flex-row gap-3 justify-center items-center h-[30px] rounded-lg text-[13px] px-4 bg-white w-[60%] text-gray-500 focus:outline-none focus:border-transparent sm:w-[90%] "
                value={phoneNumber}
                placeholder="Enter your phone number"
                onChange={(e)=>{setPhoneNumber(e.target.value)}}
              >   
              </input>
            </div>

            <div className='flex flex-row justify-between w-full sm:flex-col'>Comments : 


              <textarea
                className="flex flex-row gap-3 justify-center items-center h-[40px] rounded-lg text-[13px] px-4 bg-white w-[60%] text-gray-500 focus:outline-none focus:border-transparent p-3 sm:w-[90%]"
                value={comments}
                placeholder="A line about yourself and the reason you want to adopt the pet."
                onChange={(e)=>{setComments(e.target.value)}}
              >   
              </textarea>
            </div>
          </div>

          <Button
            className="flex justify-center cursor-pointer items-center text-[20px] text-white font-jua rounded-xl px-12 sm:px-8 py-8 sm:text-[14px] bg-deepskyblue"
            type="primary"
            size="middle"
            shape="default"
            onClick={sendAdoptionRequest}
            disabled={submitting}
          >
            {submitting? ("Sending Adoption Request!!"):
            ("Send Adoption Request!!")}
            
          </Button>
        </div>
      
      }
    </div>
    
  )
}

export default AdoptPetButton
