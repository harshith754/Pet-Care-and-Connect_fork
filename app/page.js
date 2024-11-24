import HeroSection from "@/components/HeroSection";
import PetDisplay from "@/components/PetDisplay";
import PlansSection from "@/components/LPlans";
import CreateAdoptionSection from "@/components/LCreateAdoption";

import { connectToDB } from "@/utils/database";
import Pet from "@/models/pet";
import User from '@/models/user';

//export const dynamic = 'force-dynamic';

export const revalidate =10*60

const fetchPets = async () =>{
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

  return petObjects;
} 



const LandingPage = async () => {
  const petObjects = await fetchPets();

  return (
    <main className="bg-aliceblue-100 w-full flex flex-col items-center justify-center">
      <HeroSection />
      <div className="w-full relative bg-deepskyblue h-[5px]" />
      <PetDisplay
        sectionTitle="Pets Near You"
        pets={petObjects }
      />
      <div className="w-full relative bg-deepskyblue h-[5px]" />
      <PlansSection />
      <div className="w-full relative bg-deepskyblue h-[5px]" />
      <CreateAdoptionSection />
    </main>
  );
};

export default LandingPage;
