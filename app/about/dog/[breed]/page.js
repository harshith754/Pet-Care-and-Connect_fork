"use client"
import Navbar from '@/components/Navbar'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';






const page = ({params}) => {
  const {breed}=params

  const decodedBreed= decodeURIComponent(breed)

  const [info,setInfo]= useState({});
  const [videos,setVideos]= useState();

  useEffect(() => {
        
    const fetchBreedInfo = async (breed) =>{
      const options = {
        method: 'GET',
        url: 'https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs',
        params: {
          name: breed
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'dogs-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options)
        if (response.data.length===0) {
          throw new Error('Data not found')
        }
        toast.success("Successfully fetched breed Info!")

        console.log(response)
        setInfo(response.data[0]);

      } catch (error) {
        console.log(error);
        toast.error("Invalid Dog breed!!")
      }
      

    } 

    const fetchYoutubeInfo= async (breed)=>{
      const apiKey = process.env.YOUTUBE_API_KEY;
      const maxResults = 6;
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?maxResults=${maxResults}&q=adopt-${breed}&key=${apiKey}`;
    
      try{
        const response =await axios.get(apiUrl);
    
        const videos = response.data.items;
        const filteredVidoes = videos.filter((video)=>( video.id.kind==='youtube#video' ))
      // console.log('YouTube API Response:', filteredVidoes);


        setVideos(filteredVidoes)
        toast.success("Successfully fetched youtube recommendations!")

      
        } catch (e){
        console.log(e)
        toast.error("There was a problem fetching videos!!")
      }    

    }

    fetchBreedInfo(decodedBreed)
    console.log(info)


    fetchYoutubeInfo(decodedBreed)
     //setVideos([{"kind": "youtube#searchResult", "etag": "P27dBWGIeVCfQjxQzIGHhS9HqLc", "id": {"kind": "youtube#video", "videoId": "u3mKsRehzRc"}}, {"kind": "youtube#searchResult", "etag": "oDnHdzEmyFYjoplp2oX24DoSKwc", "id": {"kind": "youtube#video", "videoId": "RXPqXMf4VuQ"}}, {"kind": "youtube#searchResult", "etag": "x7EIpGS_sjUu6lYfvKxiBLdFSxg", "id": {"kind": "youtube#video", "videoId": "tSfRLTHFZLA"}}, {"kind": "youtube#searchResult", "etag": "hJUDJ178wh_yn4WoTG-9qZd6Umw", "id": {"kind": "youtube#video", "videoId": "3Huo6hdCUbk"}}, {"kind": "youtube#searchResult", "etag": "eongT6QP-0A6gSK3oW_CjnYrhkU", "id": {"kind": "youtube#video", "videoId": "CBMpMqKRd_8"}}, {"kind": "youtube#searchResult", "etag": "FIE09nxl4xGxL5jDwDFzdlFHQrc", "id": {"kind": "youtube#video", "videoId": "R_wS4dsoo8o"}}])

    


  }, [])
  
  
  
  

  return (
    <div className="relative bg-white w-full flex flex-col items-center justify-center text-center text-darkslategray font-radio-canada pb-8">
      <Navbar />
      <div className=" bg-aliceblue-100 flex flex-col items-center justify-center gap-2 pt-5 w-full">
          <div className=" relative leading-[48px] text-[40px] sm:text-[30px]">
            {
              info && (
                `${info.name} - Dog`
              )
            }
            
          </div>
        
        { 
          info && (
            <Image 
              width={400}
              height={280}
              crop="fill"
              src={info.image_link}
              alt="image"
              className="rounded-lg flex flex-col box-border items-center justify-end"
            />
          )
           
        }

        

        <div className=" bg-white w-full flex flex-col items-center justify-center ">
          <div className="relative bg-deepskyblue w-[35%] h-[3px] " />

          <div className=" flex flex-col pb-0 items-center ">
            
            
            <div className=" flex flex-wrap px-0 py-6 gap-3 items-center justify-center text-[18px] leading-[30px] w-[80%]">

              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Good with Children: ${info.good_with_children} / 5` : "Good with Children"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Good with Other Dogs: ${info.good_with_other_dogs} / 5` : "Good with Other Dogs"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Shedding: ${info.shedding} / 5` : "Shedding"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Grooming: ${info.grooming} / 5` : "Grooming"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Drooling: ${info.drooling} / 5` : "Drooling"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Coat Length: ${info.coat_length} / 5` : "Coat Length"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Good with Strangers: ${info.good_with_strangers} / 5` : "Good with Strangers"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Playfulness: ${info.playfulness} / 5` : "Playfulness"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Protectiveness: ${info.protectiveness} / 5` : "Protectiveness"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Trainability: ${info.trainability} / 5` : "Trainability"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Energy: ${info.energy} / 5` : "Energy"}
              </div>
              <div className="relative flex items-center justify-center  bg-deepskyblue text-white p-2 rounded-lg ">
                {info ? `Barking: ${info.barking} / 5` : "Barking"}
              </div>
            </div>

            <div className='bg-aliceblue-100 flex flex-col justify-center items-center pt-5'>
              <div className=" flex flex-row p-2.5 items-center text-[40px]  ">
              {
                (
                  "Youtube Recommendations"
                )
              }
              </div> 

              <div className=" relative bg-deepskyblue h-[1px] w-[40%]" />

              <div className='flex flex-wrap gap-4  w-[80%] pt-5 justify-center items-center'>


                  {
                    videos ? (videos.map( (video) => (
                      
                      <Link 
                        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                        key={video.id.videoId}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        
                        <Image 
                          src={`https://img.youtube.com/vi/${video.id.videoId}/mqdefault.jpg`}
                          width={320}
                          height={180}
                          crop='fill'
                          className='rounded-lg '
                          alt='image'
                        />

                        
                      </Link>
                    ))) : ("Loading...")
                  }
                  

              </div>
            </div>
          </div>
         

        </div>
      </div>
      
    </div>
  )
}

export default page
