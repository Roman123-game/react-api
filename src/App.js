import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";

function App() {
  const [posts, setPosts] = useState([]);
  const [curentPost, setCurentPost] =useState();
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
    console.log( posts, event.target.value);
    const afterFilter = posts.filter( value =>value.id !== parseInt((event.target.value)));
    // value.id !== event.target.value
    
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
  function showCurrenPost(event){
    console.log( event.target.outerText);
   setCurentPost(event.target.outerText);
  }
  return (
    <div className="App">Lorem Ipsum Posts
      {[...posts].map((post) => (
          <div className="div"
            key={post.id}>
           <div className="bold" > {post.id}</div>
           <div className="title" onClick={(event)=>showCurrenPost(event)}> {post.title}</div> 
            <button
            className="buttonX"
              value={post.id}
              onClick={(event) => {removePost(event)}}>x</button>
        </div>))}
        <div className = "flex">
          <button disabled={backwardDisabled} className="backward" onClick={setBackwardPage}>&#x2190;</button>
          <div className="translate">{curentPost}</div>
          <button disabled={forwardDisabled} className="forward" onClick={setForwardPage}>&#x2192;</button>
          </div>
    </div>
  );
}

export default App;
