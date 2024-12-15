import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  url: string;
  onVideoEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, onVideoEnd }) => {
  const playerRef = useRef<any>(null);
  const playerContainerId = `youtube-player-${Date.now()}`; // Unique ID for each instance

  useEffect(() => {
    let isMounted = true;

    // Load YouTube API if not already loaded
    if (!(window as any).YT) {
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://www.youtube.com/iframe_api";
      scriptTag.async = true;
      document.body.appendChild(scriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        if (isMounted) loadPlayer();
      };
    } else {
      loadPlayer();
    }

    // Cleanup function to destroy player safely
    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [url]); // Reload when URL changes

  const loadPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new (window as any).YT.Player(playerContainerId, {
      videoId: extractVideoId(url),
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const extractVideoId = (videoUrl: string): string => {
    const match = videoUrl.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === (window as any).YT.PlayerState.ENDED) {
      onVideoEnd(); // Notify parent component when video ends
    }
  };

  return (
    <div>
      {/* Use dynamic ID for YouTube player */}
      <div id={playerContainerId} style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default VideoPlayer;
