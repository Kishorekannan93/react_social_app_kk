import { useContext } from "react"
import Feed from "./Feed"
import DataContext from "./context/DataContext"

const Home = () => {
  const {searchresults,fetcherror,isloading}  = useContext(DataContext)
  return (
    <main className="Home">
      {isloading && <p className="statusMsg">loading Post....</p>}
      {!isloading && fetcherror && <p className="statusMsg" style={{color:"red"}}>{fetcherror}</p>}
      {!isloading && !fetcherror && (searchresults.length ?  (
      <Feed posts={searchresults} />):
      (<p style={{marginTop:"2rem"}}>No post to display</p>
      ))
    }
    </main>
   
  )
}

export default Home