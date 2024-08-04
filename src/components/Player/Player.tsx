/* eslint-disable react-refresh/only-export-components */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react";
import styles from "./music-player.module.css";

const tracks = [
  {
    title: "Crockett's Theme",
    artist: "Jan Hammer",
    file: "Jan Hammer - Crockett's Theme.mp3",
  },
  {
    title: "Get Up Action",
    artist: "Digital Emotion",
    file: "Digital Emotion - Get Up Action.mp3",
  },
  {
    title: "The Heat Is On",
    artist: "Glenn Frey",
    file: "Glenn Frey - The Heat Is On.mp3",
  },
  {
    title: "Axel F",
    artist: "Harold Faltermeyer",
    file: "Harold Faltermeyer - Axel F.mp3",
  },
];

const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const playNext = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  }, []);

  const playPrev = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      setIsMuted(!isMuted);
      audioRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    },
    []
  );

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrack, isPlaying]);

  const currentTrackInfo = useMemo(() => tracks[currentTrack], [currentTrack]);

  return (
    <motion.div
      className={styles.playerContainer}
      animate={{
        width: isExpanded ? 300 : 100,
        height: isExpanded ? 400 : 100,
      }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.div
        className={styles.vinylRecord}
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="vinylGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff1493" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#vinylGradient)" />
          <circle cx="50" cy="50" r="20" fill="#c6c6c6" />
          <circle cx="50" cy="50" r="5" fill="#1a1a1a" />
          {[...Array(10)].map((_, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={40 - i * 3}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeDasharray="1,1"
            />
          ))}
        </svg>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.controls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className={styles.trackInfo}>
              <motion.div
                className={styles.trackTitle}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {currentTrackInfo.title}
              </motion.div>
              <motion.div
                className={styles.trackArtist}
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {currentTrackInfo.artist}
              </motion.div>
            </div>
            <div className={styles.buttons}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={playPrev}
              >
                <SkipBack size={20} />
              </motion.button>
              <motion.button
                className={styles.playPauseButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={playNext}
              >
                <SkipForward size={20} />
              </motion.button>
            </div>
            <div className={styles.volumeControl}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <audio
        ref={audioRef}
        src={`/music/${encodeURIComponent(currentTrackInfo.file)}`}
        onEnded={playNext}
        onError={(e) => console.error("Audio error:", e)}
      />
    </motion.div>
  );
};

export default React.memo(Player);
