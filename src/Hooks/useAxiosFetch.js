import  { useEffect, useState } from 'react'
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data,setData] = useState([]);
    const [fetcherror,setFetcherror] = useState(null)
    const [isloading,setIsloading] = useState(false)

    useEffect(()=>{
        let isMounted = true;
        let source = axios.CancelToken.source();
        const fetchapi = async(url)=>{
           setIsloading(true);
           try{
            const response = await axios.get(url,{
                cancelToken: source.token
            });
            if(isMounted){
                setData(response.data)
                setFetcherror(null)
            }
           }catch(err){
            if(isMounted){
                setFetcherror(err.message)
                setData([])
           } }finally{
             isMounted && setTimeout(()=>setIsloading(false),2000)

           }

        }
        
        fetchapi(dataUrl)

        const cleanup = ()=>{
            isMounted=false;
            source.cancel();
        }
        return cleanup
    },[dataUrl])
  return {data,fetcherror,isloading}
}

export default useAxiosFetch
