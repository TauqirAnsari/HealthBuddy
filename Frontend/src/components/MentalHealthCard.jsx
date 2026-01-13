import { useState, useRef, useEffect } from "react"

export default function MentalHealthCard() {
  // YouTube video IDs for sounds
  const soundVideos = {
    rain: "lE6RYpe9IT0",
    forest: "OdIJ2x3nxzQ",
    ocean: "bn9F19Hi1Lk",
    whiteNoise: "nMfPqeZjc2c",
  }

  const [selectedSound, setSelectedSound] = useState("rain")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)

  const iframeRef = useRef(null)
  const intervalRef = useRef(null)

  const videoId = soundVideos[selectedSound]

  // ▶️ Start timer + video
  const startSession = () => {
    if (isRunning) return

    setIsRunning(true)

    // Play video
    iframeRef.current?.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
        args: [],
      }),
      "*"
    )

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          stopVideo()
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // ⏹ Stop everything
  const resetSession = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setTimeLeft(600)

    stopVideo()
  }

  // ⏹ Stop video only
  const stopVideo = () => {
    iframeRef.current?.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "stopVideo",
        args: [],
      }),
      "*"
    )
  }

  // Format time as MM:SS
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[520px] flex flex-col">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🧘‍♂️</span>
        <h3 className="text-xl font-semibold text-slate-700">
          Mental Health
        </h3>
      </div>

      {/* Timer */}
      <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
        <p className="text-5xl font-bold mb-5">
          {minutes}:{seconds}
        </p>
        <div className="flex justify-center gap-5">
          <button
            onClick={startSession}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
            disabled={isRunning}
          >
            Start
          </button>
          <button
            onClick={resetSession}
            className="border px-6 py-3 rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 🎥 Video (BETWEEN timer and selector) */}
      <div className="mb-6 rounded-2xl overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          title="Relaxing sound"
          allow="autoplay; encrypted-media"
          className="w-full h-[200px] rounded-2xl"
        />
      </div>

      {/* Sound selector */}
      <select
        value={selectedSound}
        onChange={(e) => setSelectedSound(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 text-base mt-auto"
      >
        <option value="rain">Rain</option>
        <option value="forest">Forest</option>
        <option value="ocean">Ocean Waves</option>
        <option value="whiteNoise">White Noise</option>
      </select>

      <p className="text-sm text-center text-slate-500 mt-4">
        Take a mindful break.
      </p>
    </div>
  )
}
