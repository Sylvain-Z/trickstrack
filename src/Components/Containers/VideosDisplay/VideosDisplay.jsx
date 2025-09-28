import { useRef, useState } from "react";
import { timeElapsed } from "../../../Assets/Variables/functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFaceSmile,
  faPlay,
  faPause,
  faRedo,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

import AddComment from "../../Pages/Comments/AddComment"

function VideosDisplay({ videos, addReaction, msg }) {

  return (
    <>

      <div className="galery">
        {!videos ? (
          <>
            <p>Contenu en chargement, patientez</p>
          </>
        ) : (
          videos.map((video) => { return <VideoItem key={video.video_id} video={video} addReaction={addReaction} msg={msg} /> })
        )}

        <p className="galery_end">Fin de la liste</p>
        <p className="galery_end">
          Continue à progresser et montre nous tes tricks en video !
        </p>
      </div>
    </>
  );
}

function VideoItem({ video, addReaction, msg }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, time: "00:00", pos: 0 });
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);

      // masque le bouton après 2s quand ça joue
      setShowControls(true);
      clearTimeout(window.playPauseTimeout);
      window.playPauseTimeout = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);

      // en pause : bouton toujours visible
      setShowControls(true);
      clearTimeout(window.playPauseTimeout);
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      // Vidéo en lecture : toggle d’affichage temporaire
      setShowControls(true);
      clearTimeout(window.playPauseTimeout);
      window.playPauseTimeout = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    } else {
      // Vidéo en pause : contrôles toujours visibles
      setShowControls(true);
      clearTimeout(window.playPauseTimeout);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleProgressChange = (e) => {
    if (!videoRef.current) return;
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);

    if (newTime < videoRef.current.duration) {
      // On est revenu avant la fin → plus en mode "fini"
      setIsEnded(false);
    } else {
      setIsEnded(true);
    }

    // On ne lance pas la lecture automatiquement → reste en pause
    videoRef.current.pause();
    setIsPlaying(false);
    setShowControls(true); // bouton bien visible
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setShowControls(true); // affiche le bouton restart
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setIsEnded(false);

    // cache le bouton après 2s
    setShowControls(true);
    clearTimeout(window.playPauseTimeout);
    window.playPauseTimeout = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMouseDown = (e) => {
    if (!videoRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = (clickX / rect.width) * 100;
    const newTime = (percent / 100) * videoRef.current.duration;

    setTooltip({
      visible: true,
      time: formatTime(newTime),
      pos: percent,
    });
  };

  const handleMouseMove = (e) => {
    if (!videoRef.current || !tooltip.visible) return;

    const rect = e.target.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const percent = Math.min(Math.max((moveX / rect.width) * 100, 0), 100);
    const newTime = (percent / 100) * videoRef.current.duration;

    setTooltip({
      visible: true,
      time: formatTime(newTime),
      pos: percent,
    });
  };

  const handleMouseUp = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const elapsed = timeElapsed(video.publication_date);

  return (
    <div className="video-display">
      <figure>
        <div className="video-controls">
          <button onClick={toggleFullScreen} className="fullscreen-btn">
            <FontAwesomeIcon icon={faExpand} size="lg" />
          </button>
          <video
            ref={videoRef}
            className="galery-video"
            src={"/Videos/" + video.title}
            type="video/mp4"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onClick={handleVideoClick} 
          />
          {isEnded ? (
            <button
              onClick={handleRestart}
              className={`play-pause-btn visible`} // toujours visible quand fini
            >
              <FontAwesomeIcon icon={faRedo} size="2xl" />
            </button>
          ) : (
            <button
              onClick={togglePlay}
              className={`play-pause-btn ${isPlaying ? (showControls ? "visible" : "hidden") : "visible"}`}
            >
              {isPlaying ? <FontAwesomeIcon icon={faPause} size="2xl" /> : <FontAwesomeIcon icon={faPlay} size="2xl" />}
            </button>
          )}
          <div className="progress-wrapper">
            <input
              className={`progress-bar ${isPlaying ? (showControls ? "visible" : "hidden") : "visible"}`}
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
            {tooltip.visible && (
              <div
                className={"tooltip " + (tooltip.visible ? "visible" : "")}
                style={{ left: `${tooltip.pos}%` }}
              >
                {tooltip.time}
              </div>
            )}
          </div>
        </div>
        <figcaption>
          {msg && <p className="msg red">{msg}</p>}
          <p>
            <FontAwesomeIcon icon={faFaceSmile} size="xs" />{" "}
            <strong>{video.pseudo}</strong>{" "}
            <FontAwesomeIcon icon={faRecordVinyl} size="xs" />{" "}
            {video.trick_name}
          </p>
          {elapsed && <p>{elapsed.times}</p>}
          <AddComment video={video} addReaction={addReaction} />
        </figcaption>
      </figure>
    </div>
  );
}

export default VideosDisplay;
