import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../Hooks/useWindowSize";
import { format } from "date-fns";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || []);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();

  // Edit post handler
  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    const updatedPosts = posts.map((post) =>
      post.id === id ? updatedPost : post
    );
    setPosts(updatedPosts);
    navigate("/");
  };

  // Delete post handler
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    navigate("/");
  };

  // Add new post handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const updatedPosts = [...posts,newPost];
    setPosts(updatedPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  // Search functionality
  useEffect(() => {
    const filterres = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search?.toLowerCase()) ||
        post.title.toLowerCase().includes(search?.toLowerCase())
    );
  
    setSearchResults(filterres.reverse()); // Ensure it updates as an array
  }, [posts, search]);
  
  
  // Synchronize localStorage with posts
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        posts,
        searchResults,
        postTitle,
        setPostTitle,
        handleSubmit,
        postBody,
        setPostBody,
        handleDelete,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
        handleEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
