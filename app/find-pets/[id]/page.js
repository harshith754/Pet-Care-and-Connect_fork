import AdoptPetButton from '@/components/AdoptPetButton'
import Navbar from '@/components/Navbar'
import PetImageDisplay from '@/components/PetImageDisplay'
import Pet from '@/models/pet'
import { connectToDB } from '@/utils/database'
import Image from 'next/image'
import User from '@/models/user';
import EditButton from '@/components/EditButton'
import PetBreed from '@/components/PetBreed'



const fetchPets = async (id) =>{
  await connectToDB(); 
     
  const pets = await Pet.find({}).populate('creator');

  
  const petObjects = pets.map((pet) => ({
    _id: pet._id.toString(), // convert ObjectId to string
    creator:  pet.creator && pet.creator._id ? {
      _id: pet.creator._id.toString(), // convert creator's _id to a string
      email: pet.creator.email,
      username: pet.creator.username,
      image: pet.creator.image,
      __v: pet.creator.__v
    } : null,
    city: pet.city,
    name: pet.name,
    breed: pet.breed,
    gender: pet.gender,
    size: pet.size,
    age: pet.age,
    imageId: pet.imageId,
    petType:pet.petType
    
  }));

  return petObjects.find(pet => pet._id === id);
} 

const page = async  ({params}) => {
  const {id}=params

  const pet= await fetchPets(id);
  
  

  return (
    <div className="relative bg-white w-full flex flex-col items-center justify-center text-center text-darkslategray font-radio-canada">
      <Navbar />
      <div className=" bg-aliceblue-100 flex flex-col items-center justify-center gap-2 pt-5 w-full">
          <div className=" relative leading-[48px] text-[40px] sm:text-[30px]">
            {
              pet? (
                `${pet.name} - ${pet.petType}`
              ):(
                "Name - Type"
              )
            }
            
          </div>
        
        { 
          pet? (
            <PetImageDisplay 
              imageId={pet.imageId}
            />
          ):(
            "Loading..."
          )
           
        }

        

        <div className=" bg-white w-full flex flex-col items-center justify-center ">
          <div className="relative bg-deepskyblue w-[35%] h-[3px] " />

          <div className=" flex flex-col pb-0 items-center ">
            <div className=" flex flex-row p-2.5 items-center text-[22px]  ">
            {
              pet? (
                <>
                  <PetBreed 
                    breed={pet.breed}
                  />
                  {` - ${pet.city}`}
                </>
                

              ):(
                "Breed - City"
              )
              
            }
            </div>
            <div className=" relative bg-deepskyblue h-[1px] w-[40%]" />
            
            <div className=" flex flex-col pt-2.5 px-0 pb-0 items-center justify-center text-[18px] leading-[30px] ">
              <div className="relative flex items-center justify-center ">
                
                {
                  pet? (
                    `Age: ${pet.age}`
                  ):(
                    "Age"
                  )
                }
              </div>
              <div className="relative flex items-center justify-center ">
                
                {
                  pet? (
                    `Gender: ${pet.gender} `
                  ):(
                    "Gender"
                  )
                }
              </div>
              <div className="relative flex items-center justify-center ">
                
                {
                  pet? (
                    `Size: ${pet.size}`
                  ):(
                    "Size"
                  )
                }
              </div>


     
              {
                pet.creator? (
                  <div className="relative flex items-center justify-center ">
                    Creator:   <Image
                      src={pet.creator.image}
                      width={27}
                      height={27}
                      className="rounded-full ml-3 mr-[3px]"
                      alt="profile"
                    /> {pet.creator.username}
                  </div>
                  
                ):(
                  "Creator"
                )
              }

              

            </div>
          </div>
          <div className=" flex flex-col w-full items-center justify-center py-5 gap-6 sm:gap-3 ">
            
            <AdoptPetButton 
             pet={pet}
            />
             
             <EditButton 
              creator={pet.creator}
              petId={id}
             />
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default page
