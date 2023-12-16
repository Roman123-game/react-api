import React from "react"
import axios from "axios";
import "./App.css";
import {memo, useState, useEffect, useCallback } from "react";

type EffectCallback = () => (void | any);


const App  : React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState("en")
  const [curentPost, setCurentPost] = useState("click on post for translation");
  const [translatedPost, setTranslatedPost] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [forwardDisabled, setForwardDisabled] = useState(false);
  const [backwardDisabled, setBackwardDisabled] = useState(false);
  const [togleTranslatedPost, setTogleTranslatedPost] = useState(false);

  useEffect((): ReturnType<EffectCallback> =>{
     fetchPost()
  },[page]);

  useEffect((): ReturnType<EffectCallback> =>{
     translate();
  }, [curentPost]);

  async function fetchPost(_limit = 10, _page = page) {
    const responce = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );
    setPosts(responce.data);
  }
  async function translate() {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "la");
    encodedParams.append("target_language", language);
    encodedParams.append("text", curentPost);
    
    const options : Object = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '666d07c64dmshbea3d6f634623e9p1851bfjsn7ee4693455d1',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams
    };
    
   await axios.request(options).then(function (response) {
    setTranslatedPost(response.data.data.translatedText);
    setTogleTranslatedPost(true);
    }).catch((error)=> {
      console.error(error);
    });
  }


 const removePost = useCallback((event: any) =>{
  
    console.log(posts, event?.target?.value);
    const afterFilter = posts.filter(
      (value: any) => value.id !== parseInt(event?.target?.value)
    );
    setPosts(afterFilter);
  },[posts])

  const setForwardPage = useCallback(()=> {
    if (page >= 20) {
      setForwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page + 1);
    }
  },[page])

  const  setBackwardPage = useCallback(() => {
    if (page <= 1) {
      setBackwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page - 1);
    }
  },[page])

  const setNewPost=(event:any)=>{
    setCurentPost(event.target.value)
  }
  const setNewLanguage=(event:any)=>{
    setLanguage(event.target.value)
  }

  return (
    <div className="App">
      <h3 className="lorem"> Lorem Ipsum Posts</h3>
      <h1 className="map">&#x1F5FA;</h1>
       <select 
       className="select" 
       onChange={(event:any)=>setNewLanguage(event)}>
        <option value="en">ENGLISH</option>
        <option value="he">HEBREW</option>
       </select>
      {[...posts].map((post:any) => (
        <div className="id" key={post.id}>
          <div className="bold"> {post.id}</div>
          <div
            className="title"
            onClick={(event:any) => setNewPost(event)}>
            {post.title}
          </div>
          <button
            className="buttonX"
            value={post.id}
            onClick={(event) => {removePost(event)}}>
            x
          </button>
        </div>
      ))}
      <div className="flex">
        <button
          disabled={backwardDisabled}
          className="backward"
          onClick={setBackwardPage}>
          &#x227C;
        </button>
        {togleTranslatedPost ? <div className="translate">{translatedPost}</div> : <div className="loader">&#x1F5FA;</div>}
        <button
          disabled={forwardDisabled}
          className="forward"
          onClick={setForwardPage}>
         &#x227D;
        </button>
      </div>
    </div>
  );
}

export default memo(App);
