import { CldImage } from 'next-cloudinary';
import { useInView } from 'react-intersection-observer';
import {useRouter} from 'next/navigation'
const DogCard = ({pet}) => {

  const router=useRouter()
  
  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when entering view
    threshold: 0.95,   // How much of the element needs to be visible
  });

  const redirect =()=>{
    router.push(`/find-pets/${pet._id}`) 
  }
  
  return (
    <div
      className={`rounded-xl w-[250px] h-[280px] flex flex-col items-end justify-end relative transition-transform duration-300 transform scale-100 hover:scale-105 sm:hover:scale-110 ${inView ? 'sm:scale-110':''} sm:my-2`}
      ref={ref}
      onClick={redirect}
    >

      <CldImage
        width={250}
        height={280}
        crop="fill"
        src={pet.imageId}
        alt="image"
        className="absolute rounded-xl flex flex-col box-border items-center justify-end"
      />
      <div className=" flex flex-col justify-center items-center gap-7 rounded-t-none rounded-b-xl h-[70px] w-full z-10 py-1  bg-deepskyblue">
        <div className="w-full flex flex-col items-center justify-center ">
          <b className="relative tracking-[0.05em]  text-[20px] text-white">
            {pet.name}
          </b>
          <div className="relative text-[14px] font-jua text-white">
              {pet.breed}
            </div>
          <div className='flex flex-row justify-center items-center text-normal font-istok-web leading-3 '>
             
            <div className="flex justify-center items-center text-center font-istok-web text-[11px] text-white w-12">
              {pet.gender}
            </div>
            <div className='bg-white w-[1px] h-4' />

            <div className="flex justify-center items-center text-center  font-istok-web text-[11px] text-white w-12">
              {pet.size}
            </div>
            <div className='bg-white w-[1px] h-4' />
            <div className="flex justify-center items-center text-center  font-istok-web text-[11px] text-white w-12">
              {pet.age}
            </div>
            <div className='bg-white w-[1px] h-4' />
            <div className="flex justify-center items-start text-center font-istok-web text-[10px] text-white w-12">
              {pet.city}
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  )
}

export default DogCard
