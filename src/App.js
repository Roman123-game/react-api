import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [curentPost, setCurentPost] = useState();
  const [translatedPost,setTranslatedPost] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
      console.log("forwarddisabled");
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page + 1);
      console.log(page);
    }
  }
  function setBackwardPage() {
    if (page <= 1) {
      setBackwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page - 1);
      console.log(page);
    }
  }
  async function showCurrenPost(event) {
    setCurentPost(event.target.innerText);
    translate();
    console.log(event.target.innerText);
  }
    async function translate() {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", curentPost);
      encodedParams.append("target", "en");
      encodedParams.append("source", "la");
      
      const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
          'X-RapidAPI-Key': '1961caa73emshce7bd432426028bp14f970jsne28e0730d487'
        },
        data: encodedParams
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data.data.translations[0].translatedText);
        
      }).catch(function (error) {
        console.error(error);
      });

    }
  

  return (
    <div className="App">
      Lorem Ipsum Posts
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
        <div className="translate">{curentPost}</div>
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
