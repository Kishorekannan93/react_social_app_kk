import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../Hooks/useAxiosFetch";
import useWindowSize from "../Hooks/useWindowSize";
import api from "../api/posts";
import { format } from 'date-fns';

const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [search,setsearch] = useState('');
    const [posts,setposts] = useState([])
   
    const [searchresults,setsearchresults] = useState([]);
    const [postTitle,setPostTitle] = useState('');
    const [postBody,setpostBody] = useState('')
    const [editTitle,setEditTitle] = useState('');
    const [editBody,setEditBody] = useState('')
    const navigat = useNavigate()
    const {width} = useWindowSize()
    const {data,fetcherror,isloading} = useAxiosFetch('http://localhost:3500/posts');
  
    useEffect(()=>{
     setposts(data)
    },[data])
  
     
          
    const handleEdit = async(id) =>{
      const datetime = format(new Date(),"MMMM dd,yyyy PP");
      const updatePost ={id,title:editTitle,datetime,body:editBody}
      try{
            const res = await api.put(`/posts/${id}`,updatePost)
            setposts(posts.map(post=>(post.id===id)?{...res.data}:post))
  
            setEditTitle('')
            setEditBody('')
            navigat('/')
      }catch(err){
        console.log(`error:${err.message}`)
      }
    }
     
    const handledelete = async(id) =>{
          try{
                await api.delete(`posts/${id}`)
                const deletepost = posts.filter(post=>(post.id!==id))
                setposts(deletepost)
                navigat("/")
          }catch(err){
                console.log(`error:${err.message}`)
          }
    }
  
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const id = posts.length ? posts[posts.length-1].id+1:1;
      const datetime = format(new Date(),"MMMM dd,yyyy PP");
      const newPost ={id,title: postTitle,datetime,body:postBody}
      try{
          const res = await api.post("/posts",newPost)
          const allpost = [...posts,res.data]
          setposts(allpost)
  
          setPostTitle('')
          setpostBody('')
          navigat('/')
      }catch(err){
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.satus)
          console.log(err.response.header)
        }else{
          console.log(`error:${err.message}`)
        }
  
      }}
   
  
    useEffect(()=>{
      const filterres = posts.filter(post =>
        post.body.toLowerCase().includes(search?.toLowerCase()) ||
        post.title.toLowerCase().includes(search?.toLowerCase())
      )
      setsearchresults(filterres.reverse())
    },[posts,search])
    
    return (
        <DataContext.Provider value={{
            width,search,setsearch,posts,searchresults,fetcherror,isloading,postTitle,setPostTitle,handleSubmit,postBody,setpostBody,handledelete,editTitle,setEditTitle,editBody,setEditBody,handleEdit

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
