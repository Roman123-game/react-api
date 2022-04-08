import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [page,setPage] = useState(1);
  const [limit,setLimit] =useState(10);
  const [forwardDisabled,setForwardDisabled] = useState(false);
  const [backwardDisabled,setBackwardDisabled] = useState(false);



useEffect(() => {
  
    fetchPost();

}, [page])

  async function fetchPost(_limit =limit, _page =page) {
    const responce = await axios.get(
      'https://jsonplaceholder.typicode.com/todos', {
        params: {
          _limit:limit,
          _page:page

        
        }
      }
    )
       setPosts(responce.data);

     }
  function removePost(event) {
    const afterFilter = posts.filter( value => value.id !== event.target.value );
    setPosts(afterFilter);

  }
   function setForwardPage(){
    if(page >=20 ){
      setForwardDisabled(true);
      console.log("forwarddisabled");
    }
    else{
    setForwardDisabled(false);
    setBackwardDisabled(false);
   setPage(page +1);
   console.log(page)
    }
   }
   function setBackwardPage(){
     if(page <= 1){
     setBackwardDisabled(true);
   }
   else{
    setForwardDisabled(false);
    setBackwardDisabled(false);
    setPage(page -1);
    console.log(page)
    
   }
  }
  return (
    <div className="App">Lorem Ipsum Posts
      {[...posts].map((post) => (
          <div className="div"
            key={post.id}>
           <b className="bold"> {post.id}</b>
            {post.title}
            <button
            className="buttonX"
              value={post.id}
              onClick={(event) => {removePost(event)}}>x</button>
        </div>))}
          <button disabled={backwardDisabled} className="backward" onClick={setBackwardPage}>&#x2190;</button>
          <button disabled={forwardDisabled} className="forward" onClick={setForwardPage}>&#x2192;</button>
    </div>
  );
}

export default App;


