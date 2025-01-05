import { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowsize,setWindowSize] = useState({
        width:undefined,
        height:undefined
    });
    useEffect(()=>{
        const handleresize = ()=>{
          setWindowSize({
            width:window.innerWidth,
            height:window.innerHeight
        })

        }
        handleresize()
        window.addEventListener("resize",handleresize)
        return()=>window.removeEventListener("resize",handleresize)
    },[])
  return windowsize
}

export default useWindowSize