export const updateSearchParams=(type,value)=>{
  const searchParams = new URLSearchParams(window.location.search); //currentPath
    
  searchParams.set(type,value)    

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`
  return newPathName;
}