import { useEffect, useRef, useState } from "react";
import "./App.css";
import Songs from "./datas";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(Songs);
  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const [changeSong,setChangeSong] = useState(null)
  const [icon,setIcon] = useState(false)
  // const [currentTime,setCurrentTime] = useState(0)

  console.log(audioRef.current.currentTime)

  function prevHandler(){
    if(index > 0){
      setIndex(prevIndex => prevIndex - 1)
    }else{
      setIndex(songs.length - 2)
    }
    setIcon(true)
    setPlay(true)
    setChangeSong(!changeSong)
  }

  function nextHandler(){
    if(index < songs.length - 1){
      setIndex(prevIndex => prevIndex + 1)
    }else{
      setIndex(0)
    }
    setIcon(true)
    setPlay(true)
    setChangeSong(!changeSong)
  }

  function playSong (){
    if (play) {
      audioRef.current.play();
    }
     else {
      audioRef.current.pause()
    }
  }

  useEffect(() => {
   playSong()
  }, [play]);

  // useEffect(()=> {
  //   setPlay(false)
  // },[])

  useEffect(()=> {
    if(!changeSong || changeSong){
      audioRef.current.play()
    }
  },[changeSong])

  return (
    <div className="music-app">
      <div className="music-app__wrapper">
        <div className="music-app-img__wrapper">
          <img
            src={songs[index].cover}
            className="music-app__Img"
          />
        </div>

        <div className="music-app__infos">
          <div className="music-app-infos__wrapper">
            <input type='range' min={0} />
            <audio src={songs[index].path} ref={audioRef}></audio>

            <div className="prev-btn" onClick={()=> prevHandler()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="currentColor"
                className="bi bi-chevron-double-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
                <path
                  fillRule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </div>

            {!play && !icon ? (
             <div className="play-btn" onClick={() => {
                setPlay(true)
                setIcon(true)
             }}>
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="100%"
               height="100%"
               fill="currentColor"
               className="bi bi-play-circle-fill"
               viewBox="0 0 16 16"
             >
               <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
             </svg>
           </div>
            ) : ( 
              <div className="pause-btn" onClick={() => {
                setPlay(false)
                setIcon(false)
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="currentColor"
                  className="bi bi-pause-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                </svg>
              </div>
            )}

            <div className="next-btn" onClick={()=> nextHandler()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="currentColor"
                className="bi bi-chevron-double-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;