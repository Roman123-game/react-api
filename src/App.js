import axios from "axios";
import "./App.css";
import { useState, useMemo } from "react";
import React from "react";

function App() {
  const [posts, setPosts] = useState([]);
  useMemo(() => {
    return [...posts];
  }, [posts]);

  async function fetchPost() {
    setPosts([]);
    console.clear();
    const responce = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(responce.data);
  }
  function removePost(event) {
    const afterFilter = posts.filter( value => value.id != event.target.value );
    setPosts(afterFilter);
   
  }

  return (
    <div className="App">
      <button className="pressMe" onClick={fetchPost}>Press me</button>
      {posts.map((post) => (
        <div className="div"
          key={post.id}>
         <b className="bold"> {post.id}</b>
          {post.title} 
           {post.description}
          <button
          className="buttonX"
            value={post.id}
            onClick={(event) => {removePost(event)}}>
           x
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
