import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [curentPost, setCurentPost] = useState("loading... please press again");
  const [translatedPost,setTranslatedPost] = useState();
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const [forwardDisabled, setForwardDisabled] = useState(false);
  const [backwardDisabled, setBackwardDisabled] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [page]);

  async function fetchPost(_limit = limit, _page = page) {
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
  function removePost(event) {
    console.log(posts, event.target.value);
    const afterFilter = posts.filter(
      (value) => value.id !== parseInt(event.target.value)
    );
    // value.id !== event.target.value

    setPosts(afterFilter);
  }
  function setForwardPage() {
    if (page >= 20) {
      setForwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page + 1);
    }
  }
  function setBackwardPage() {
    if (page <= 1) {
      setBackwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page - 1);
    }
  }
  async function showCurrenPost(event) {
    setCurentPost(event.target.innerText);
    translate();
  }

  
    async function translate() {
      const axios = require("axios");
      const options = {
        method: 'GET',
        url: 'https://just-translated.p.rapidapi.com/',
        params: {lang: 'en', text: String(curentPost)},
        headers: {
          'X-RapidAPI-Host': 'just-translated.p.rapidapi.com',
          'X-RapidAPI-Key': '1961caa73emshce7bd432426028bp14f970jsne28e0730d487'
        }
      };
      
     await axios.request(options).then(function (response) {
       const afterJson =  JSON.stringify(response.data.text)
        setTranslatedPost(response.data.text);
      }).catch(function (error) {
        console.error(error);
      });
    }
  

  return (
    <div className="App">
    <h3> Lorem Ipsum Posts</h3>
    <h1 className="map">&#x1F5FA;</h1>
     <h6> *press on Post for translation</h6>
      
      {[...posts].map((post) => (
        <div className="id" key={post.id}>
          <div className="bold"> {post.id}</div>
          <div className="title" onClick={(event) => showCurrenPost(event)}>
            {" "}
            {post.title}
          </div>
          <button
            className="buttonX"
            value={post.id}
            onClick={(event) => {
              removePost(event);
            }}
          >
            x
          </button>
        </div>
      ))}
      <div className="flex">
        <button
          disabled={backwardDisabled}
          className="backward"
          onClick={setBackwardPage}
        >
          &#x2190;
        </button>
        <div className="translate">{translatedPost}</div>
        <button
          disabled={forwardDisabled}
          className="forward"
          onClick={setForwardPage}
        >
          &#x2192;
        </button>
      </div>
    </div>
  );
}

export default App;
