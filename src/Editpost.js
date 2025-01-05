import React, { useContext, useEffect } from 'react'
import { useParams,Link} from 'react-router-dom'
import DataContext from './context/DataContext';

const Editpost = () => {
    const {posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit}  = useContext(DataContext)
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString()===id)
    useEffect(()=>{
        if(post){
            console.log(post)
            setEditTitle(post.title)
            setEditBody(post.body)
           
           
           
        }
    },[post,setEditBody,setEditTitle])
    console.log(editTitle)
   
  return (
    <main className="NewPost">
        {editTitle &&
         <>
          <h2>Edit post</h2>
          <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="editTitle">Title:</label>
          <input
           type="text"
           required
           id='editTitle'
           value={editTitle}
           onChange={(e)=>setEditTitle(e.target.value)}
           

          />
          <label htmlFor="editBody">Post:</label>
          <textarea name="editBody" id="editBody"
            required
            value={editBody}
            onChange={(e)=>setEditBody(e.target.value)}
          ></textarea>
          <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
          </form>
         </>
        }
        {!editTitle &&
       
                <main className="Missing">
                    <h2>Page Note Found</h2>
                    <p>well,that's disoppointing</p>
                    <Link to='/'><p>visit our home Page</p> </Link> 
                    
                </main>
            
                
        }
    </main>
    
  )
}

export default Editpost