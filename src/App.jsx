import { useEffect, useRef, useState } from "react";
import "./App.css";
import Songs from "./datas";

function App() {
  const audioRef = useRef(null);
  const wrapperRef = useRef(null)
  const [songs, setSongs] = useState(Songs);
  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const [changeSong,setChangeSong] = useState(null)
  const [icon,setIcon] = useState(false)
  const [second,setSeconds] = useState(0)
  const [minute,setMinute] = useState(0)
  const [durationSec,setDurationSec] = useState(0)
  const [durationMinute,setDurationMinute] = useState(0)
  const [bgImage,setBmImage] = useState((''))
  // const [currentTime,setCurrentTime] = useState(0)


  // ===========timeline handler
  const handleLoadData = ()=> {
    if(audioRef.current){
      setDurationSec(Math.floor(audioRef.current.duration % 60))
      setDurationMinute(Math.floor(audioRef.current.duration / 60))
    }
  }

  // ============background handler
  useEffect(()=> {
       setBmImage(songs[index].cover)
  },[index])

  const wrapperStyle = {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition:'50%',
    backdropFilter: 'blur(5px)',

  }


  useEffect(()=> {
    let myInterVal 

    if(audioRef.current){
      
     myInterVal = setInterval(()=> {
        setSeconds(Math.floor(audioRef.current.currentTime))
        if(audioRef.current.currentTime === audioRef.current.duration){
          nextHandler()
        }
      },1000)
    }

    let hour = (Math.floor(audioRef.current.currentTime / 3600))
    
    let min = Math.floor((audioRef.current.currentTime - (hour * 3600)) / 60)

    
    if(second > 59){
      setSeconds(prevState => prevState - 60)
      setMinute(min)
    }
    
   
    
    return () => clearInterval(myInterVal)
  },[second])
  

   function timeHandler(target){
    let value = target
    audioRef.current.currentTime = value
   }

   


  //  ==========prev song handler
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
  
  // ==========next song handler
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
  
  // ==========play handler
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
  });

  useEffect(()=> {
    if(!changeSong || changeSong){
      audioRef.current.play()
    }
  },[changeSong])

  return (
    <div style={wrapperStyle} ref={wrapperRef}>
    <div className="app-wrapper">
    <div className="music-app">
      <div className="music-app__wrapper">
        <div className="music-app-img__wrapper">
          <img
            src={songs[index].cover}
            className="music-app__Img"
          />
        </div>
          <div></div>
        <div className="music-app__infos">
          <div className="music-app_song">
            <h1 className="music-app__name">{songs[index].name}</h1>
            <span className="music-app__singer">{songs[index].singer}</span>
          </div>
          <div className="timeline-wrapper">
            <div className="time-start">
            <span className="start">{minute < 10 ? `0${minute}`: minute}:{second < 10 ? `0${second}`: second}</span>
            </div>
            <input className="music-range__input" type='range' value={audioRef?.current?.currentTime} min={0} max={audioRef?.current?.duration} step={0.05}  onChange={(event)=> timeHandler(event.target.value)}/>
            <span className="end">{durationMinute < 10 ? `0${durationMinute}` : durationMinute}:{durationSec < 10 ? `0${durationSec}` : durationSec}</span>
          </div>
          <div className="music-app-infos__wrapper">
            <audio src={songs[index].path} ref={audioRef} onLoadedMetadata={()=> handleLoadData()}></audio>

            <div className="prev-btn" onClick={()=> prevHandler()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="#817070"
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
               fill="#817070"
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
                  fill="#817070"
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
                fill="#817070"
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
    </div>
    </div>
  );
}

export default App;
