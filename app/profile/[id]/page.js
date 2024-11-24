import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { connectToDB } from "@/utils/database";
import Pet from "@/models/pet";
import User from '@/models/user'
import PetDisplay from '@/components/PetDisplay';
import Adoption from '@/models/adoption';


import ProfileAdoptionDisplay from '@/components/ProfileAdoptionDisplay';
import ManageAdoptionRequests from '@/components/ManageAdoptionRequests';

const page =async ({params}) => {

  const userId=params.id

  const getUser= async ()=>{
    await connectToDB(); 
    const user = await User.findById(userId);
    return user;
  }

  const getPets = async () => {
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
    const filteredPets = petObjects.filter(pet => pet.creator?._id === userId);

    return filteredPets;
  }

  const getMyAdoptionRequests= async () => {
    await connectToDB();

    const myAdoptionRequests = await Adoption.find({user: userId}).populate('petCreator').populate('pet');

    return myAdoptionRequests;
  }

  const getUserAdoptionRequests= async () => {
    await connectToDB();

    const userAdoptionRequests = await Adoption.find({petCreator: userId}).populate('petCreator').populate('pet').populate('user');

    // console.log(userAdoptionRequests)
    
    const adoptionRequestObjects = userAdoptionRequests.map((request) => ({
      _id: request._id.toString(),
      user: {
        _id: request.user._id.toString(),
        email: request.user.email,
        username: request.user.username,
        image: request.user.image,
      },
      email: request.email,
      name: request.name,
      pet: {
        _id: request.pet._id.toString(),
        city: request.pet.breed,
        name: request.pet.name,
        breed: request.pet.breed,
        gender: request.pet.gender,
        size: request.pet.size,
        age: request.pet.age,
        imageId: request.pet.imageId,
        petType: request.pet.petType,
        creator: request.pet.creator.toString()
      },
      address: request.address,
      phoneNumber: request.phoneNumber,
      comments: request.comments,
      petCreator: {
        _id: request.petCreator._id.toString(),
        email: request.petCreator.email,
        username: request.petCreator.username,
        image: request.petCreator.image,
      },
      status: request.status || ""
    }));

    
    
  
    return adoptionRequestObjects;
  }
  

  const user =await getUser();

  const pets = await getPets();

  const myAdoptionRequests= await getMyAdoptionRequests();

  const userAdoptionRequests= await getUserAdoptionRequests();

  
  if(!user.name){

    if(myAdoptionRequests.length >0) {
      user.name = myAdoptionRequests[0].name;
      user.address = myAdoptionRequests[0].address;
      user.phoneNumber = myAdoptionRequests[0].phoneNumber;
      await user.save();
    }
  } 
  
  return (
    <div className='bg-aliceblue-100 flex flex-col justify-center items-center'>
      <Navbar />

      <Image 
      
        src={user.image}

        width={100}
        height={100}

        className="rounded-full mt-3"

        alt="profile"
      />
      <div className='text-[45px] text-center font-radio-canada text-darkslategray pt-2  '>
        Your Profile 
      </div>
      <div className="relative bg-deepskyblue w-[28%] min-w-[200px] h-[2px] mt-2 mb-2" />

        
      <div className='flex-col justify-center items-center font-radio-canada text-darkslategray pb-6 rounded-xl py-7 px-4'>

        <div className='flex flex-col justify-center items-start bg-white rounded-3xl p-6 px-5 gap-3'>

          {user.name && (
            <div className="relative flex items-center justify-center ">
              Name:   
              {`  ${user.name}`}
            </div>
          )}
          
          <div className="relative flex items-center justify-center ">
            Username:   <Image
              src={user.image}
              width={27}
              height={27}
              className="rounded-full ml-3 mr-[3px]"
              alt="profile"
            /> 
            {user.username}
          </div>

          {user.email && (
            <div className="relative flex items-center justify-center ">
              Email:   
              {`  ${user.email}`}
            </div>
          )}

          {user.address && (
            <div className="relative flex items-center justify-center ">
              Address:   
              {`  ${user.address}`}
            </div>
          )}

          {user.phoneNumber && (
            <div className="relative flex items-center justify-center ">
              Phone Number:   
              {`  ${user.phoneNumber}`}
            </div>
          )}
          
          
          
        
        </div>

      </div>


      {myAdoptionRequests && myAdoptionRequests.length>0 && (
        <>
          <div className='text-[38px] text-center font-radio-canada text-darkslategray pt-5 font-semibold'>
            My Adoption Requests:
          </div>
          <div className="relative bg-deepskyblue w-[28%] min-w-[200px] h-[2px] mt-2 mb-2" />

          <div className='flex flex-col justify-center py-8 gap-4 items-center w-[100%] font-radio-canada text-darkslategray '>
            {
              myAdoptionRequests && (
                myAdoptionRequests.map(adoptionRequest => (
                  <div className='flex flex-row justify-center items-center bg-white rounded-3xl p-6  gap-2' key={adoptionRequest._id.toString()}>
                    
                    {/* <div className='flex flex-row justify-center ' >Name :&nbsp; &nbsp; { adoptionRequest.name}</div>
                    <div className='flex flex-row justify-center'>Email : &nbsp; &nbsp; {adoptionRequest.email}</div>
                    <div className='flex flex-row justify-center'>Address :&nbsp; &nbsp; { adoptionRequest.address}</div>
                    <div className='flex flex-row justify-center'>Phone Number :&nbsp; &nbsp; { adoptionRequest.phoneNumber}</div> */}

                    <ProfileAdoptionDisplay imageId={adoptionRequest.pet.imageId} />             
                    <div className='flex flex-col justify-center items-start gap-2 pl-2'>
                      <div className='flex flex-row justify-center'>Pet Name :&nbsp; &nbsp; { adoptionRequest.pet.name}</div>
                      <div className='flex flex-row justify-center'>Pet Breed :&nbsp; &nbsp; { adoptionRequest.pet.breed}</div> 
                      <div className='flex flex-row justify-center max-w-[400px]'>Your Application :&nbsp; &nbsp; { adoptionRequest.comments}</div> 
                      <div className='flex flex-row justify-center items-center'>Sent To :&nbsp; &nbsp;
                        
                        <Image
                          src={adoptionRequest.petCreator.image}
                          width={27}
                          height={27}
                          className="rounded-full ml-3 mr-[3px]"
                          alt="profile"
                        /> 
                        { adoptionRequest.petCreator.email}
                        
                      </div>

                      <div className='bg-deepskyblue flex text-white py-5 px-3 rounded-xl'>
                          <div className='font-semibold max-w-[400px] '>
                            Adoption Status: &nbsp; &nbsp; {adoptionRequest.status? (adoptionRequest.status):("Request Sent. Reviewing your request.")}
                          </div>
                      </div>

                    </div>
                    
                  </div>
                ))

              )

            }
          </div>
        </>
      )}

      

      
        
        
        {
          pets && pets.length>0 && (
            <PetDisplay sectionTitle="Your Pets up for Adoption" pets={pets} />
          )
        }

        {
          userAdoptionRequests && userAdoptionRequests.length>0 && (
            <ManageAdoptionRequests adoptionRequests={userAdoptionRequests} />
          )
        }

        


    </div>
  )
}

export default page
