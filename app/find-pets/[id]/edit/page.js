"use client"

import DropdownMenu from '@/components/DropdownMenu'
import Navbar from '@/components/Navbar'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CldImage, CldUploadButton } from 'next-cloudinary';

import { useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = ({params}) => {
  const { data: session }= useSession();

  const {id} =params;
  const router = useRouter();


  const getPet = async()=>{
    const res = await axios.get(
      `/api/pet/${id}`
    )
    console.log(res.data)
    const pet=res.data
    setName(pet.name);
    setCity(pet.city);
    setPetType(pet.petType);
    setBreed(pet.breed);
    setGender(pet.gender);
    setSize(pet.size);
    setAge(pet.age);
    setImageId(pet.imageId);
  }

  useEffect(()=>{
    getPet();
    if(session === null ){
    
      alert('You Must Login First!!')
      router.push('/api/auth/signin')
      
    }
  },[])

  const [name,setName] = useState("");
  const [city,setCity] = useState("");
  const [petType,setPetType] = useState("");
  const [breed,setBreed] = useState("");
  const [gender,setGender] = useState("");
  const [size,setSize] = useState("");
  const [age,setAge] = useState("");
  const [imageId,setImageId]= useState("");

  const [submitting,setSubmitting] =useState(false)

  const handleSelect = (value, identifier) => {
    if (identifier === "city") {
      setCity(value);
    } else if (identifier === "petType") {
      setPetType(value);
    } else if (identifier === "gender") {
      setGender(value)
    } else if (identifier === "size") {
      setSize(value)
    } else if (identifier === "age") {
      setAge(value)
    }
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();

    if(!session){
      alert("Sign In First!!")
      return
    }
    setSubmitting(true);

    try{

      const postData= JSON.stringify({
        id,
        name,
        city,
        petType,
        breed,
        age,
        gender,
        size,
        userId: session?.user.id || "none",
        imageId
      })

      const response = await axios.put(`/api/pet/${id}`, postData)

      console.log(response);
      alert("Updated Pet successfully!!")
    

      if(response.status === 201) {
        router.push('/');
      }

    } catch(error) {
      console.log(error)
    } finally {
      setSubmitting(false);
    }

  }

  const handleDelete=async (e)=>{
    e.preventDefault();

    if(!session){
      alert("Sign In First!!")
      return
    }
    setSubmitting(true);

    try{

      const response = await axios.delete(`/api/pet/${id}`)

      console.log(response);
      alert("Deleted Pet successfully!!")

      if(response.status === 201) {
        router.push('/');
      }

    } catch(error) {
      console.log(error)
    } finally {
      setSubmitting(false);
    }

  }

  
  return (
  <>
    <Navbar />
    
    <header className="w-full flex flex-col items-center justify-center  gap-8 bg-[url('/-body@3x.png')] bg-cover bg-[top] top-0 text-white pb-8">
    
      <div className="pt-[60px] flex flex-col items-center justify-start gap-[16px] font-radio-canada">
        <div className=" leading-[70px] font-semibold text-[50px] sm:leading-10 sm:text-[40px] text-center">
          Place Pet for adoption
        </div>
        <div className=" leading-[25px]  font-puritan text-[25px] sm:text-[22px] sm:hidden">
          Open new doors for your pet.
        </div>
      </div>

      <div className="bg-aliceblue-100 px-5 sm:px-0 py-4 pt-8 flex flex-col items-center justify-center gap-[2px] sm:gap-0 rounded-xl sm:w-[70%]">
        { 
          imageId ?
            (<CldImage
              width={250}
              height={280}
              crop="fill"
              src={imageId}
              alt="image"
              className="rounded-lg flex flex-col box-border items-center justify-end"
            />) :

            (
              <CldUploadButton
                onUpload={( result )=> {
                  setImageId(result.info.public_id)
                }}
                uploadPreset="artPage"
                className='w-[80%] sm:w-[65%] text-gray-500 bg-white py-2 px-4 rounded-lg text-left mb-2'
              >
                Upload an Image
              </CldUploadButton>
            )
          
        }


        
        <div className="flex flex-row justify-center items-center text-darkslategray px-2 py-2 rounded-lg text-[13px] w-[80%] sm:w-[65%] ">
          <input
            className="flex flex-row gap-3 justify-center items-center h-[30px] rounded-lg text-[13px] px-4 bg-white w-full text-gray-500 focus:outline-none focus:border-transparent "
            value={name}
            placeholder="Enter pet name"
            onChange={(e)=>{setName(e.target.value)}}
          >   
          </input>
        </div>
        <DropdownMenu               
          value={city}
          options={[
            { label: "Mumbai City"  ,value: "Mumbai City" },
            { label: "Mumbai Suburban"  ,value: "Mumbai Suburban" },
            { label: "Pune"  ,value: "Pune" },
            {label: "Others"  , value: "Others" },
          ]}
          placeholder={"Enter your city"}
          handleClick={(value) => handleSelect(value, "city")} 
          styles={"w-[80%] sm:w-[65%]"}
        />
        <DropdownMenu               
          value={petType}
          options={[
            { label:"Dog", value: "Dog" },
            { label:"Cat",  value: "Cat" },
            { label:"Bird", value: "Bird" },
            { label:"Others", value: "Others" },
          ]}
          placeholder={"Select pet type"}
          handleClick={(value) => handleSelect(value, "petType")} 
          styles={"w-[80%] sm:w-[65%]"}

        />
        <div className="flex flex-row justify-center items-center text-darkslategray px-2 py-2 rounded-lg text-[13px] w-[80%] sm:w-[65%] ">
          <input
            className="flex flex-row gap-3 justify-center items-center h-[30px] rounded-lg text-[13px] px-4 bg-white w-full text-gray-500 focus:outline-none focus:border-transparent "
            value={breed}
            placeholder="Enter pet breed"
            onChange={(e)=>{setBreed(e.target.value)}}
          >   
          </input>
        </div>
        <DropdownMenu               
          value={gender}
          options={[
            { label:"Male", value: "Male" },
            { label:"Female", value: "Female" },

          ]}
          placeholder={"Select pet gender"}
          handleClick={(value) => handleSelect(value, "gender")}  
          styles={"w-[80%] sm:w-[65%]"}
         
        />

        <DropdownMenu               
          value={size}
          options={[
            { label:"Small", value: "Small" },
            { label:"Medium", value: "Medium" },
            { label:"Large",  value: "Large" },

          ]}
          placeholder={"Select pet size"}
          handleClick={(value) => handleSelect(value, "size")}          
          styles={"w-[80%] sm:w-[65%]"}
 
        />

        <DropdownMenu               
          value={age}
          options={[
            { label:"Young", value: "Young" },
            { label:"Adult", value: "Adult" },
            { label:"Old", value: "Old" },
          ]}
          placeholder={"Select pet age"}
          handleClick={(value) => handleSelect(value, "age")}    
          styles={"w-[80%] sm:w-[65%]"}
       
        />
        
        <div className=" flex flex-col gap-3 items-center justify-center p-3 py-5 sm:flex-col sm:gap-4">
          <Button
            className="flex justify-center cursor-pointer items-center text-[20px] text-white font-jua rounded-xl px-12 sm:px-8 py-8 w-[80%] sm:text-[14px] "
            style={{ backgroundColor:"#00ACE5" }}
            type="primary"
            size="middle"
            shape="default"
            onClick={(e)=>handleSubmit(e)}
            disabled={submitting}
          >
            {submitting? 'Sending pet Information...':'Update Pet Adoption Listing!!'}
          </Button>

          <Button
            className="flex justify-center cursor-pointer items-center text-[20px] text-white font-jua rounded-xl px-12 sm:px-8 py-8 w-[80%] sm:text-[14px] "
            style={{ backgroundColor:"#00ACE5" }}
            type="primary"
            size="middle"
            shape="default"
            onClick={(e)=>handleDelete(e)}
            disabled={submitting}
          >
            {submitting? 'Sending pet Information...':'Delete Pet Adoption Listing!!'}
          </Button>
        </div>


      </div>


        

    </header>

  </>  
  )
}

export default page
