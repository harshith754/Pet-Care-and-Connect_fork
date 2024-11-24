import Navbar from "@/components/Navbar";
import PetDisplay from "@/components/PetDisplay";
import PetParams from "@/components/PetParams";
import Pet from "@/models/pet";
import { connectToDB } from "@/utils/database";
import User from '@/models/user';

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

const FindPet = async ({ searchParams }) => {

  const { age, breed, city, gender, petType, size } = searchParams;
  const allPets= await fetchPets();

  const filteredPets = allPets.filter((pet) => {
    return (
      (!city || pet.city === city) &&
      (!petType || pet.petType === petType) 
    );
    }).sort((petA, petB) => {
    const sanitizedBreed = breed ? breed.replace(/\s+/g, '') : ''; // Remove spaces if breed is defined
    const sanitizedPetBreedA = petA.breed.replace(/\s+/g, '')
    const sanitizedPetBreedB = petB.breed.replace(/\s+/g, '')
    const trueConditionCountA = [
      (!breed || new RegExp(sanitizedBreed.toLowerCase()).test(sanitizedPetBreedA.toLowerCase())),
      (!gender || petA.gender === gender),
      (!size || petA.size === size),
      (!age || petA.age === age)
    ].filter(condition => condition === true).length;
  
    const trueConditionCountB = [
      (!breed || new RegExp(sanitizedBreed.toLowerCase()).test(sanitizedPetBreedB.toLowerCase())),
      (!gender || petB.gender === gender),
      (!size || petB.size === size),
      (!age || petB.age === age)
    ].filter(condition => condition === true).length;
  
    // Sort pets based on the number of true conditions.
    return trueConditionCountB - trueConditionCountA;
  });
  


  return (
    <div>
      <Navbar />
      <PetParams searchParams={searchParams} />

      {
        filteredPets && (
          <PetDisplay sectionTitle="Pets For You :)" pets={filteredPets} />
        )
      }

    </div>
  );
};


export default FindPet
