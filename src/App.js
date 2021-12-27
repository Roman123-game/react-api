import axios from "axios";
import "./App.css";
import { useState, useMemo } from "react";
import React from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [valueBut, setValueBut] = useState();
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
  function remove(event) {
    console.log("X button presed");
    const afterFiter = posts.filter( value => value.id != event.target.value );
    console.log(event.target.value);
    setValueBut(event.target.value);
    setPosts(afterFiter);
   
  }

  return (
    <div className="App">
      <button onClick={fetchPost}>Press me</button>
      {posts.map((post) => (
        <div className="div"
          key={post.id}
        >
         <i className="italic"> {post.id}</i>
          {post.title} 
           {post.description}
          <button
          className="buttonX"
            value={post.id}
            onClick={(event) => {remove(event);  }}>
           x
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
