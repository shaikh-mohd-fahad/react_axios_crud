import React, { useState } from "react";
import axios from "axios";
import { getData } from "../api/PostApi";
import { useEffect } from "react";
function Posts() {
  const [postData, setPostData] = useState([]);
  const getData2 = async () => {
    try {
      const res = await getData();
      setPostData(res.data);
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    getData2();
  }, []);
  //Delete Post
  const deletePost = async (id) => {
    try {
      const deleted = await axios.delete(
        "https://jsonplaceholder.typicode.com/posts/" + id
      );
      // console.log(deleted)
      if (deleted.status == 200) {
        const newUpdatePosts = postData.filter((post) => {
          return post.id != id;
        });
        setPostData(newUpdatePosts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // form data
  const [input,setInput]=useState({
    title:'',
    body:'',
})
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setInput({
        ...input,
        [name]:value,
    })

  }
  const handleFrom=async (e)=>{
    e.preventDefault();
    try {
        
        const addPost= await axios.post("https://jsonplaceholder.typicode.com/posts/",input)
        console.log("post added successfully")
        setPostData([...postData,addPost.data]);
        
    } catch (error) {
        console.log("post not added")
        console.log(error)
    }
    
  }

  return (
    <>
      <h1>post page</h1>
      <div className="container flex justify-center align-middle">
        <form action="" onSubmit={handleFrom}>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            onChange={handleChange}
            value={input.title}
            className="outline p-2 rounded-md w-100 m-1"
          /><br/>
          <input
            type="text"
            name="body"
            placeholder="Enter body"
            onChange={handleChange}
            value={input.body}
            className="outline p-2 rounded-md w-100 m-1"
          /><br/>
          <button type="submit" className="btn bg-blue-300 p-2 rounded-md">Submit</button>
        </form>
      </div>
      {postData.map((data) => {
        return (
          <>
            <div key={data.id} className="shadow-md p-3 m-5">
              <h1 className="">{data.id}</h1>
              <h1 className="text-3xl">{data.title}</h1>
              <p>{data.body}</p>
              <button className="btn bg-slate-200 p-2 m-2 rounded-md">
                Edit
              </button>
              <button
                className="btn bg-sky-200 p-2 rounded-md"
                onClick={() => {
                  deletePost(data.id);
                }}
              >
                Delete
              </button>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Posts;
