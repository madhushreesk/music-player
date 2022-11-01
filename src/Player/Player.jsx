import React from 'react'
import { useRef } from 'react';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';
import './player.scss';
const Player = ({ songs, setSongs, isPlaying, setIsPlaying, audioElem, currentSong,setCurrentSong }) => {
    
    const clickRef = useRef();
    const PlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * currentSong.length;
    }

    const skipBack = () => {
        const index = songs.findIndex((x) => x.title == currentSong.title)
        if (index === 0) {
            setCurrentSong(songs[songs.length - 1]);
        } else {
            setCurrentSong(songs[index - 1]);
        }

        audioElem.current.currentTime = 0;
    }

    const skiptoNext = () => {
        const index = songs.findIndex((x) => x.title == currentSong.title)
        if (index === songs.length-1) {
            setCurrentSong(songs[0]);
        } else {
            setCurrentSong(songs[index + 1]);
        }

        audioElem.current.currentTime = 0;
    }
  return (
      <div className="player_container"style={{
    boxShadow: '2px 4px 20px #87CEFA'
  }}>
          <div className="title">
              <p>{currentSong.title }</p>
          </div>
          <div className="navigation">
              <div className="navigation_wrapper" onClick={checkWidth} ref = {clickRef}>
                  <div className="seek_bar" style={{width:`${currentSong.progress+"%"}`}}></div>
              </div>
          </div>
          <div>
              <div className="controls">
                <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack}/>
                  {isPlaying ? <BsFillPauseCircleFill className='btn_action pp' onMouseLeave={PlayPause} style={{body:"#fff"}} /> :
                      <BsFillPlayCircleFill className='btn_action pp' onMouseEnter={PlayPause} />}
        <BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext}/>    
              </div>
          </div>
    </div>
  )
}

export default Player