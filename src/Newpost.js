import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const Newpost = () => {
  const {postTitle,setPostTitle,handleSubmit,postBody,setPostBody} = useContext(DataContext)
  return (
    <main className="NewPost">
        <h2>New Post</h2>
        <form  className="newPostForm" onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title:</label>
          <input
           type="text"
           required
           id='postTitle'
           value={postTitle}
           onChange={(e)=>setPostTitle(e.target.value)}
           

          />
          <label htmlFor="postBody">Post:</label>
          <textarea name="postBody" id="postBody"
            required
            value={postBody}
            onChange={(e)=>setPostBody(e.target.value)}
          ></textarea>
          <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default Newpost