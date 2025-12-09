import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, SparkleIcon, Music, Gift, Camera, Volume2, VolumeX, Sparkles, Moon, Sun } from 'lucide-react';
import before from "./assets/before.mp3"
import after from "./assets/after.mp3"

const TypeWriter = ({ messages, speed = 50 }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      setCurrentMessageIndex(0); // Loop back to start
      return;
    }

    const currentMessage = messages[currentMessageIndex];
    
    if (currentText.length < currentMessage.length) {
      // Still typing current message
      const timeout = setTimeout(() => {
        setCurrentText(currentMessage.substring(0, currentText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Message complete, wait then move to next
      const nextMessageTimeout = setTimeout(() => {
        setCurrentText('');
        setCurrentMessageIndex((prev) => prev + 1);
      }, 2000); // Wait 2 seconds before next message
      return () => clearTimeout(nextMessageTimeout);
    }
  }, [currentText, currentMessageIndex, messages, speed]);

  return (
    <div className="h-20 flex items-center justify-center">
      <p className="text-lg text-rose-600 font-medium">
        {currentText}
        <span className="animate-pulse ml-0.5">|</span>
      </p>
    </div>
  );
};

const FloatingHearts = ({ count }) => {
  return [...Array(count)].map((_, i) => (
    <div
      key={i}
      className="absolute animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.3}s`,
        transform: `scale(${0.5 + Math.random()})`,
      }}
    >
      <Heart 
        className="text-rose-400 opacity-40" 
        size={24} 
        fill={Math.random() > 0.5 ? "#fb7185" : "#fda4af"}
      />
    </div>
  ));
};

const Polaroid = ({ image, caption }) => (
  <div className="bg-white p-2 rotate-3 shadow-xl hover:rotate-0 transition-all duration-300">
    <img src={image} alt={caption} className="w-64 h-64 object-cover" />
    <p className="text-center mt-2 font-handwriting text-gray-600">{caption}</p>
  </div>
);

const MusicPlayer = ({ isMuted, onToggle, currentSong }) => (
  <div className="fixed top-4 right-4 flex items-center gap-2 bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-lg z-50">
    <button
      onClick={onToggle}
      className="p-2 hover:bg-rose-100 rounded-full transition-colors"
    >
      {isMuted ? (
        <VolumeX className="text-rose-600" size={24} />
      ) : (
        <Volume2 className="text-rose-600" size={24} />
      )}
    </button>
    {!isMuted && (
      <div className="flex items-center gap-2 pr-2">
        <Music className="text-rose-600 animate-pulse" size={16} />
        <span className="text-rose-600 text-sm font-medium whitespace-nowrap">
          {currentSong}
        </span>
      </div>
    )}
  </div>
);

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [isNight, setIsNight] = useState(false);
  const beforeYesAudioRef = useRef(null);
  const afterYesAudioRef = useRef(null);
  const yesButtonSize = noCount * 20 + 16;
  const [showMusicModal, setShowMusicModal] = useState(true);
  const loveMessages = [
    "They say that Love is patience. With you in my life i realised indeed love is patience.",
    "Till now i have been patience with you, and i never had gut to tell you about my feelings but i think its time i let my feelings out to you.",
    "You are the missing piece to my puzzle.",
    "With you i can complete my puzzle and can complete every milestone together.",
    "Let's build a future filled with smiles.",
    "I will promise to make you smile and laugh.",
    "During your bad days i will be there for you and during your good days i will celebrate with you.",
    "You make my world brighter and after you have come to my life i have finally began to enjoy it.",
    "You coloured the life of lifeless person and made it colourful.",
    "I am forever thankful for you."
  ];
  const songs = {
    before: {
      title: "Sailor Song X Yellow",
      url: before
    },
    after: {
      title: "Perfect - Ed Sheeran",
      url: after
    }
  };

  const images = {
    before: "https://i.pinimg.com/originals/fd/6a/6f/fd6a6f6cefd19859b90b3c5fce2244ec.gif",
    after: "https://i.pinimg.com/originals/b0/7a/84/b07a8437e208a1173bd91ce565aa9409.gif",
    memories: [
      "https://s3-us-west-1.amazonaws.com/wp.uploads.wamu.org/uploads/sites/3/2012/10/09182012_pandas.jpg",
    "https://media.istockphoto.com/id/163842643/photo/two-giant-pandas-in-chengdu-sichuan-province-china-forest.jpg?s=612x612&w=0&k=20&c=0iZ4gR8m_i4OWORqEmSzsZTP8BeJC4robm8RDz6N7DY=",
      "https://news.cgtn.com/news/2023-07-28/The-lovey-dovey-giant-panda-couple-Mei-Xiang-and-Tian-Tian-1lMro7p5xLi/img/a64e63594b2f4f368d097d317fcc5d41/a64e63594b2f4f368d097d317fcc5d41.jpeg"
    ]
  };

useEffect(() => {
  const hour = new Date().getHours();
  setIsNight(hour >= 18 || hour < 6);

  beforeYesAudioRef.current = new Audio(songs.before.url);
  afterYesAudioRef.current = new Audio(songs.after.url);

  beforeYesAudioRef.current.loop = true;
  afterYesAudioRef.current.loop = true;

  return () => {
    beforeYesAudioRef.current?.pause();
    afterYesAudioRef.current?.pause();
  };
}, []);

  useEffect(() => {
    if (!isMuted) {
      if (yesPressed) {
        beforeYesAudioRef.current?.pause();
        afterYesAudioRef.current?.play();
        setCurrentSong(songs.after.title);
      } else {
        beforeYesAudioRef.current?.play();
        afterYesAudioRef.current?.pause();
        setCurrentSong(songs.before.title);
      }
    } else {
      beforeYesAudioRef.current?.pause();
      afterYesAudioRef.current?.pause();
      setCurrentSong("");
    }
  }, [yesPressed, isMuted]);
const handlePlayMusic = () => {
  beforeYesAudioRef.current?.play();
  setCurrentSong(songs.before.title);
  setShowMusicModal(false);
};

  const messages = {
    initial: "Arya... Will You Be Mine? 💝",
    success: "You've Made Me The Happiest Person Ever! 💑",
    subMessage: "Every moment with you is like a beautiful dream ✨",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const getNoButtonText = () => {
    const phrases = [
      "No 💔"
    
    
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const getMessageText = () => {
   const phrases = [ 
  "Really??? Don't say no, please! 🥺",
  "Please consider once again... I'm sure about us! 🙏",
  "No, please don't break my heart! 💔",
  "Love is patient, love is kind... so be kind and say yes! 🌹",
  "Every heartbeat whispers your name; don't let it stop! 💓",
  "You're the missing piece to my puzzle; don't leave it incomplete! 🧩",
  "Together, we could write the greatest love story; say yes! 📖",
  "My heart does somersaults when I think of you; don't make it stop! 🎪",
  "Life is better with you in it; don't say no! 🌈",
  "You're the sweetness in my daily coffee; don't make it bitter! ☕",
  "Let's build a future filled with smiles; don't turn away now! 😊",
  "I promise to always make you laugh; give me the chance! 😄",
  "You're my favorite notification; don't put me on silent! 📱",
  "Let's create memories together; don't walk away! 📸",
  "You make my world brighter; don't dim the light! ✨",
  "Every love song is about us; don't end the music! 🎵",
  "You're my favorite what if... don't leave it unanswered! 💭",
  "Let's turn this what if into reality; don't hold back! 🌟"
];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    const messageElement = document.getElementById('pleading-message');
    messageElement?.classList.add('shake');
    setTimeout(() => {
      messageElement?.classList.remove('shake');
    }, 500);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setShowConfetti(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      isNight 
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-pink-100 via-rose-200 to-purple-100'
    } flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
      {showMusicModal && (
  <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 max-w-sm text-center shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-rose-600">🎵 Music Permission</h2>
      <p className="text-rose-600 mb-6">
        Music will play on this page. Please turn your volume up and hit "Play" to enjoy it! 🎶
      </p>
      <button
        onClick={handlePlayMusic}
        className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
      >
        Play Music
      </button>
    </div>
  </div>
)}
{/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingHearts count={20} />
        {[...Array(15)].map((_, i) => (
          <Stars
            key={i}
            className="absolute text-yellow-300 opacity-40 animate-twinkle"
            size={Math.random() * 8 + 2}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Music Player */}
      <MusicPlayer 
        isMuted={isMuted}
        onToggle={() => setIsMuted(!isMuted)}
        currentSong={currentSong}
      />

      {/* Day/Night Toggle */}
      <button
        onClick={() => setIsNight(!isNight)}
        className="fixed top-4 left-4 bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {isNight ? (
          <Moon className="text-yellow-300" size={24} />
        ) : (
          <Sun className="text-yellow-500" size={24} />
        )}
      </button>

      {/* Main Content */}
      <div className="max-w-4xl w-full text-center relative z-10">
        {yesPressed ? (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative inline-block">
              <img
                src={images.after}
                alt="Celebration"
                className="rounded-2xl shadow-2xl mx-auto animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent rounded-2xl" />
              
              {/* Success Message */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-rose-600">
                  Our Story Begins {messages.date} 💑
                </h2>
              </div>

              {/* Floating Elements */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-confetti"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    >
                      {i % 2 === 0 ? (
                        <Heart className="text-rose-500" size={16} fill="#ec4899" />
                      ) : (
                        <Stars className="text-yellow-400" size={16} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Memory Gallery */}
            <div className="flex justify-center gap-4 flex-wrap">
              {images.memories.map((img, index) => (
                <Polaroid
                  key={index}
                  image={img}
                  caption={`Memory #${index + 1}`}
                />
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-rose-600 animate-bounce">
              {messages.success}
            </h1>
            <p className="text-xl text-rose-500 font-medium">{messages.subMessage}</p>

            {/* Celebration Icons */}
            <div className="flex justify-center gap-8">
              <Camera className="animate-bounce text-rose-500" size={32} />
              <Music className="animate-pulse text-rose-500" size={32} />
              <Gift className="animate-bounce text-rose-500" size={32} />
              <Sparkles className="animate-spin text-rose-500" size={32} />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="relative group">
              <img
                src={images.before}
                alt="Love"
                className="rounded-2xl shadow-2xl mx-auto transform transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent rounded-2xl" />
              <SparkleIcon 
                className="absolute top-4 right-4 text-yellow-400 animate-spin"
                size={28}
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
              {messages.initial}
            </h1>
            <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-xl">
            <TypeWriter messages={loveMessages} speed={40} />
          </div>
            <div 
              id="pleading-message"
              className="text-xl md:text-2xl text-rose-600 font-medium min-h-[4rem] transition-all duration-300"
            >
              {noCount > 0 && getMessageText()}
            </div>

            <div className="flex flex-wrap justify-center gap-6 items-center">
              <button
                className={`
                  bg-gradient-to-r from-green-400 to-emerald-600 
                  hover:from-green-500 hover:to-emerald-700 
                  text-white font-bold py-4 px-8 
                  rounded-full transform hover:scale-110 
                  transition-all shadow-lg hover:shadow-2xl
                  active:scale-95
                `}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes! 💖
              </button>
              <button
                onClick={handleNoClick}
                className="
                  bg-gradient-to-r from-rose-400 to-rose-600 
                  hover:from-rose-500 hover:to-rose-700 
                  text-white font-bold py-4 px-8 
                  rounded-full transform hover:scale-105 
                  transition-all shadow-lg hover:shadow-2xl
                  active:scale-95
                "
              >
                {getNoButtonText()}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="fixed bottom-4 right-4 text-rose-600 font-medium bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-lg">
  <a 
    href="https://krishendra.com.np" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:underline"
  >
    Made with 💝 for Arya
  </a>
</footer>


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 0.5; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes confetti {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }

        .animate-confetti {
          animation: confetti 5s ease-out forwards;
        }

        .shake {
          animation: shake 0.5s ease-in-out;
        }

        @font-face {
          font-family: 'Handwriting';
          src: url('your-handwriting-font.woff2') format('woff2');
        }

        .font-handwriting {
          font-family: 'Handwriting', cursive;
        }
      `}</style>
    </div>
  );
};

export default ValentineProposal;
