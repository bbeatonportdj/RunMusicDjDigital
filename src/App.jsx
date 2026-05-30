import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { Zap, Home, Headphones, Music, ShoppingCart, Gift, Package, Crown, Users, BookOpen, MessageSquare, ArrowRight, Search, LoaderCircle, Play, Disc3, Heart, Bookmark, LogIn, Sun, PanelLeft, Volume2, SkipBack, SkipForward, Repeat, Shuffle, LogOut, X, Clock, Trash2, Plus, Upload, CheckCircle2, Pause, RotateCcw } from 'lucide-react';

const VinylLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]`}>
    <circle cx="50" cy="50" r="48" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
    <circle cx="50" cy="50" r="36" fill="none" stroke="#1e293b" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4,2" />
    <circle cx="50" cy="50" r="24" fill="none" stroke="#1e293b" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="18" fill="url(#neonGradient)" opacity="0.8" />
    <circle cx="50" cy="50" r="12" fill="#090d16" />
    <path d="M 42,50 Q 46,42 50,50 T 58,50" fill="none" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
    <path d="M 44,50 Q 47,45 50,50 T 56,50" fill="none" stroke="#3b82f6" strokeWidth="0.75" strokeLinecap="round" />
    <circle cx="50" cy="50" r="3" fill="#020617" stroke="#22d3ee" strokeWidth="0.5" />
    <defs>
      <radialGradient id="neonGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const packs = [
  {
    id: 1,
    title: "The Funk The 80s Forgot",
    artist: "UGEEZY EDITS",
    genre: "Funk",
    tracks: 23,
    plays: 248,
    date: "8 months ago",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    tracksList: [
      { id: 1, title: "Funk It Up - UGEEZY Edit", duration: "3:45" },
      { id: 2, title: "Retro Vibes - 80s Remix", duration: "4:12" },
      { id: 3, title: "Groove Line - Extended Mix", duration: "5:20" }
    ]
  },
  {
    id: 2,
    title: "Dance Floor Hypes 6",
    artist: "Various Artist",
    genre: "Remix Mashups",
    tracks: 23,
    plays: 90,
    date: "8 months ago",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    tracksList: [
      { id: 1, title: "Hype Intro - DJ Tool", duration: "1:30" },
      { id: 2, title: "Club Banger - Mashup", duration: "3:55" }
    ]
  },
  {
    id: 3,
    title: "The Currents 2",
    artist: "UGEEZY EDITS",
    genre: "Top 40",
    tracks: 40,
    plays: 158,
    date: "3 months ago",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Keith Sweat VS Mary J Blige",
    artist: "UGEEZY EDITS",
    genre: "R And B",
    tracks: 18,
    plays: 69,
    date: "29 days ago",
    image: "https://images.unsplash.com/photo-1514525253361-bee8a48790c7?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "RMX' Re Edits 7",
    artist: "Various Artist",
    genre: "Remix Mashups",
    tracks: 40,
    plays: 214,
    date: "8 months ago",
    image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    price: "$8.00",
    oldPrice: "$10"
  },
  {
    id: 6,
    title: "Club Vibes 1",
    artist: "Various Artist",
    genre: "Top 40",
    tracks: 50,
    plays: 194,
    date: "6 months ago",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    id: 7,
    title: "RMX' Re Edits 5",
    artist: "Various Artist",
    genre: "Remix Mashups",
    tracks: 40,
    plays: 174,
    date: "8 months ago",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecbb4ec?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    price: "$8.00",
    oldPrice: "$10"
  },
  {
    id: 8,
    title: "Summer House Anthems",
    artist: "DJ SUNSHINE",
    genre: "House",
    tracks: 15,
    plays: 432,
    date: "2 months ago",
    image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    id: 9,
    title: "Hip Hop Classics Re-Imagined",
    artist: "BEAT MASTER",
    genre: "Hip Hop",
    tracks: 25,
    plays: 876,
    date: "5 months ago",
    image: "https://images.unsplash.com/photo-1546707012-c51841275c6f?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    id: 10,
    title: "Latin Heat Edits Vol. 1",
    artist: "RITMO DJ",
    genre: "Latin",
    tracks: 20,
    plays: 543,
    date: "1 month ago",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  }
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPack, setSelectedPack] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(packs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);
  const [session, setSession] = useState(null);
  const [dbPacks, setDbPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [view, setView] = useState('discover'); // 'discover' or 'profile'
  const [likedPacks, setLikedPacks] = useState(() => {
    const saved = localStorage.getItem('likedPacks');
    return saved ? JSON.parse(saved) : [];
  });
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'free', 'paid'
  const [newPack, setNewPack] = useState({
    title: '',
    artist: '',
    genre: 'Remix Mashups',
    price: '',
    image: '',
    tracks: 0
  });

  useEffect(() => {
    localStorage.setItem('likedPacks', JSON.stringify(likedPacks));
  }, [likedPacks]);

  const toggleLike = (packId) => {
    if (likedPacks.includes(packId)) {
      setLikedPacks(likedPacks.filter(id => id !== packId));
    } else {
      setLikedPacks([...likedPacks, packId]);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchPacks();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const fetchPacks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packs')
        .select('*');
      
      if (error) throw error;
      if (data && data.length > 0) {
        setDbPacks(data);
      } else {
        setDbPacks(packs); // Fallback to hardcoded packs
      }
    } catch (error) {
      console.error('Error fetching packs:', error.message);
      setDbPacks(packs); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (pack) => {
    if (!cart.find(item => item.id === pack.id)) {
      setCart([...cart, pack]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    // Simulate Stripe Checkout delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCheckoutLoading(false);
    setCheckoutSuccess(true);
    setCart([]); // Clear cart
    setIsCartOpen(false);
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price?.replace('$', '') || 0);
    return acc + price;
  }, 0);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formattedPrice = newPack.price.trim() ? newPack.price.trim() : null;
      const formattedTracks = parseInt(newPack.tracks) || 0;
      const { data, error } = await supabase
        .from('packs')
        .insert([
          { 
            ...newPack, 
            price: formattedPrice,
            tracks: formattedTracks,
            plays: 0, 
            date: 'Just now',
            tracksList: [] 
          }
        ]);
      
      if (error) throw error;
      
      setIsUploadOpen(false);
      fetchPacks(); 
      setNewPack({ title: '', artist: '', genre: 'Remix Mashups', price: '', image: '', tracks: 0 });
      alert('Pack uploaded successfully!');
    } catch (error) {
      alert('Error uploading pack: ' + error.message);
    }
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const playNextTrack = () => {
    const currentIndex = filteredPacks.findIndex(p => p.id === currentTrack.id);
    if (currentIndex !== -1 && currentIndex < filteredPacks.length - 1) {
      setCurrentTrack(filteredPacks[currentIndex + 1]);
      setIsPlaying(true);
    } else if (filteredPacks.length > 0) {
      setCurrentTrack(filteredPacks[0]); // loop back to first
      setIsPlaying(true);
    }
  };

  const playPrevTrack = () => {
    const currentIndex = filteredPacks.findIndex(p => p.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(filteredPacks[currentIndex - 1]);
      setIsPlaying(true);
    } else if (filteredPacks.length > 0) {
      setCurrentTrack(filteredPacks[filteredPacks.length - 1]); // loop to last
      setIsPlaying(true);
    }
  };

  const categories = ["All", "Remix Mashups", "Funk", "Top 40", "R And B", "House", "Hip Hop", "Latin", "Electronic"];

  const filteredPacks = dbPacks.filter(pack => {
    const matchesSearch = pack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pack.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pack.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || pack.genre === selectedCategory;
    
    const matchesPrice = priceFilter === 'all' || 
                         (priceFilter === 'free' && !pack.price) || 
                         (priceFilter === 'paid' && pack.price);

    const matchesView = view === 'discover' || (view === 'profile' && likedPacks.includes(pack.id));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesView;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 max-w-full overflow-x-hidden text-white flex pb-24 md:pb-0">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-blue-800/30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:flex flex-col h-screen`}>
        <div className="flex flex-col gap-2 border-b border-blue-800/30 p-6 bg-slate-950">
          <div className="flex items-center gap-3 h-12">
            <div className="relative">
              <VinylLogo className="w-8 h-8 relative z-10 animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center z-20">
                <Zap className="w-2 h-2 text-yellow-900" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white leading-tight" style={{ background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(226, 232, 240) 50%, rgb(203, 213, 225) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                RunMusicDjDigital
              </h1>
              <p className="text-xs text-cyan-300 font-medium tracking-wide">DJ Edit Marketplace</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 flex flex-col gap-2">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider px-2 mb-3">Navigation</div>
          <ul className="flex flex-col gap-1 space-y-2">
            <li>
              <button 
                onClick={() => setView('discover')}
                className={`w-full flex items-center gap-3 px-4 py-3 h-8 text-sm transition-all duration-300 rounded-xl border ${view === 'discover' ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-cyan-200 border-cyan-500/30' : 'text-slate-300 border-transparent hover:bg-blue-800/30 hover:text-cyan-200'}`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Discover</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setView('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 h-8 text-sm transition-all duration-300 rounded-xl border ${view === 'profile' ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-200 border-purple-500/30' : 'text-slate-300 border-transparent hover:bg-blue-800/30 hover:text-cyan-200'}`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">My Profile</span>
              </button>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 h-8 text-sm hover:bg-blue-800/30 hover:text-cyan-200 transition-all duration-300 rounded-xl text-slate-300">
                <Headphones className="w-5 h-5" />
                <span className="font-medium">Browse Packs</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 h-8 text-sm hover:bg-blue-800/30 hover:text-cyan-200 transition-all duration-300 rounded-xl text-slate-300">
                <Music className="w-5 h-5" />
                <span className="font-medium">Individual Tracks</span>
              </a>
            </li>
            <li>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-full flex items-center justify-between px-4 py-3 h-8 text-sm hover:bg-blue-800/30 hover:text-cyan-200 transition-all duration-300 rounded-xl text-slate-300"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Cart</span>
                </div>
                {cart.length > 0 && (
                  <span className="bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cart.length}</span>
                )}
              </button>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 h-8 text-sm hover:bg-blue-800/30 hover:text-cyan-200 transition-all duration-300 rounded-xl text-slate-300">
                <Gift className="w-5 h-5" />
                <span className="font-medium">Free Packs</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 h-8 text-sm hover:bg-blue-800/30 hover:text-cyan-200 transition-all duration-300 rounded-xl text-slate-300">
                <Package className="w-5 h-5" />
                <span className="font-medium">Bundle Builder</span>
              </a>
            </li>
            <li className="mt-4 px-2">
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" /> Upload New Pack
              </button>
            </li>
          </ul>
        </div>
        
        <div className="p-6 border-t border-blue-800/30 bg-slate-950 text-center space-y-3">
          {session ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3 w-full">
                {session.user.user_metadata.avatar_url ? (
                  <img src={session.user.user_metadata.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full border border-cyan-500/30 object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center bg-slate-900 text-cyan-400">
                    <VinylLogo className="w-6 h-6 animate-spin-slow" />
                  </div>
                )}
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <span className="text-sm font-bold text-white truncate">{session.user.user_metadata.full_name || session.user.email}</span>
                  <span className="text-[10px] text-cyan-300 truncate">{session.user.email}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-red-500/50 bg-red-500/10 h-9 px-4 py-2 text-red-400 hover:bg-red-500/20 transition-colors">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-300">Optional: Log in to save favorites and purchase history.</p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-cyan-500/50 bg-transparent h-9 px-4 py-2 text-cyan-300 hover:bg-blue-800/30 transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" /> Login with Google
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-md text-slate-300 hover:text-white hover:bg-purple-800/30 transition-all">
                  <Sun className="w-5 h-5 text-yellow-400" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="md:hidden bg-slate-950/95 backdrop-blur-sm border-b border-blue-800/30 px-4 py-3 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            {isSearchOpen ? (
              <div className="flex-1 flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                <input 
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 text-sm" 
                  placeholder="Search packs..." 
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-xs text-slate-400 font-bold uppercase tracking-wider">Cancel</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <button className="p-2 text-white hover:bg-purple-800/30 rounded-lg transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <PanelLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <VinylLogo className="w-6 h-6 animate-spin-slow" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold leading-none">RunMusicDjDigital</span>
                      <span className="text-[10px] text-cyan-300">DJ Edit Marketplace</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-blue-800/30"
                >
                  <Search className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-auto pb-8">
          <div className="w-full bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-700 text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3 text-center">
              <Package className="w-5 h-5 text-cyan-300 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base">Pick any <strong>3 packs</strong> & save <strong>20%</strong> — Build Your Bundle</span>
              <button className="flex items-center gap-1 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full px-3 py-1 text-sm font-semibold transition-colors">
                Build Your Bundle <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Hero */}
              <div className="relative mb-16 rounded-3xl overflow-hidden">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="https://media.base44.com/videos/public/685dd1da79b32593ac509ba2/4bcbf0e19_generated_video.mp4"></video>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-950/70 to-cyan-950/80"></div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgb(6, 182, 212) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgb(59, 130, 246) 0%, transparent 40%)' }}></div>
                
                <div className="relative z-10 px-8 py-16 text-center">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full px-4 py-1.5 mb-6">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-cyan-300 text-sm font-semibold tracking-wide">Premium DJ Edits & Edit Packs</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4 leading-none">
                    RunMusic<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> DjDigital</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-8">Thousands of exclusive DJ edits — browse, preview, and download instantly.</p>
                  
                  <div className="relative max-w-lg mx-auto mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                    <input 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" 
                      placeholder="Search tracks, artists, genres..." 
                    />
                  </div>

                  {!session && (
                    <button 
                      onClick={() => setIsAuthModalOpen(true)}
                      className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-black font-black text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all active:scale-[0.98] animate-bounce-subtle"
                    >
                      <Crown className="w-6 h-6" /> Join for Free
                    </button>
                  )}
                  
                  <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-400">
                    <span>🎵 1000+ Edit Packs</span>
                    <span>⚡ Instant Download</span>
                    <span>🎧 All Genres</span>
                  </div>
                </div>
              </div>

              {/* Flash Sale */}
              <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-black rounded-xl overflow-hidden mb-16">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-black" />
                    <div>
                      <span className="font-extrabold text-xl">⚡ Weekend Flash Sale — 20% OFF</span>
                      <span className="ml-2 text-sm font-medium opacity-80">Everything in the store!</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold opacity-80">Ends in:</span>
                    <div className="flex items-center gap-1 font-mono font-extrabold text-xl">
                      <div className="bg-black/20 rounded-md px-2 py-1">09</div>:
                      <div className="bg-black/20 rounded-md px-2 py-1">17</div>:
                      <div className="bg-black/20 rounded-md px-2 py-1">06</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all border ${selectedCategory === cat ? 'bg-cyan-500 border-cyan-400 text-black shadow-lg shadow-cyan-500/20' : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Filter Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{view === 'profile' ? '👤' : '🔥'}</span>
                  <h2 className="text-3xl font-bold text-white">
                    {view === 'profile' ? 'My Liked Packs' : "What's Hot"}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
                    <button 
                      onClick={() => setPriceFilter('all')}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${priceFilter === 'all' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setPriceFilter('free')}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${priceFilter === 'free' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                      Free
                    </button>
                    <button 
                      onClick={() => setPriceFilter('paid')}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${priceFilter === 'paid' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                      Premium
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-slate-800/50 animate-pulse border border-slate-700"></div>
                  ))
                ) : filteredPacks.length > 0 ? filteredPacks.map((pack) => (
                  <div key={pack.id} className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="relative aspect-square w-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center overflow-hidden">
                      <img src={pack.image} alt={pack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                          onClick={() => {
                            if (currentTrack.id === pack.id) {
                              togglePlay();
                            } else {
                              setCurrentTrack(pack);
                              setIsPlaying(true);
                            }
                          }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-600 hover:border-cyan-500 shadow-lg flex items-center justify-center transition-all hover:scale-110"
                        >
                          {isPlaying && currentTrack.id === pack.id ? (
                            <Pause className="w-6 h-6 text-white fill-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white ml-1 fill-white" />
                          )}
                        </button>
                      </div>
                      {pack.price ? null : (
                        <div className="absolute top-2 left-2 z-20">
                          <div className="inline-flex items-center rounded-md bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2.5 py-1">🎁 FREE</div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white truncate mb-1">{pack.title}</h3>
                      <p className="text-sm text-slate-400 truncate mb-3">{pack.artist}</p>
                      
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center rounded-md border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] uppercase font-semibold px-2 py-0.5">{pack.genre}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Disc3 className="w-3 h-3" /> {pack.tracks} tracks</span>
                      </div>

                      <div className="space-y-2 mt-4">
                        {pack.price ? (
                          <button 
                            onClick={() => addToCart(pack)}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-9 px-4 py-2"
                          >
                            🛒 Add to Cart — <span className="line-through opacity-60">{pack.oldPrice}</span> <span className="text-yellow-300">{pack.price}</span>
                          </button>
                        ) : (
                          <button 
                            onClick={() => addToCart(pack)}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white h-9 px-4 py-2"
                          >
                            🎁 FREE Download
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedPack(pack)}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-md text-xs font-medium border border-cyan-500/50 bg-transparent text-slate-300 hover:bg-slate-800 h-8 px-2 py-1"
                        >
                          View Pack
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4 text-xs">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-slate-400">
                            <Zap className="w-3 h-3 text-purple-400" />
                            <span className="font-medium text-purple-300">{pack.plays} plays</span>
                          </div>
                          <span className="text-slate-500">{pack.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleLike(pack.id)}
                            className={`transition-colors p-1 ${likedPacks.includes(pack.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                          >
                            <Heart className={`w-4 h-4 ${likedPacks.includes(pack.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button className="text-slate-400 hover:text-purple-500 transition-colors p-1"><Bookmark className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center">
                    <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No packs found</h3>
                    <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
                    <button onClick={() => setSearchTerm('')} className="mt-6 text-cyan-400 hover:text-cyan-300 font-semibold underline">Clear search</button>
                  </div>
                )}
              </div>

              {/* Community Section */}
              <div className="mt-20 relative rounded-3xl overflow-hidden bg-slate-900 border border-blue-800/30 p-8 md:p-12 text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Join our DJ Community</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto mb-8">Get exclusive early access to new packs, free weekly edits, and connect with other professional DJs around the world.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                    <input className="w-full px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white" placeholder="Enter your email..." />
                    <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 whitespace-nowrap">
                      Join Now
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-10">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400">
                          DJ
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-slate-400"><strong className="text-white">2,400+</strong> DJs already joined</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Global Player Bar */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-blue-800/30 px-4 py-3 z-50">
          <audio 
            ref={audioRef}
            src={currentTrack.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={playNextTrack}
          />
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 w-1/3 min-w-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{currentTrack.title}</h4>
                <p className="text-xs text-slate-400 truncate">{currentTrack.artist}</p>
              </div>
              <button className="text-slate-400 hover:text-red-500 transition-colors ml-2 hidden sm:block">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
              <div className="flex items-center gap-6">
                <button className="text-slate-400 hover:text-white transition-colors hidden sm:block">
                  <Shuffle className="w-4 h-4" />
                </button>
                <button 
                  onClick={playPrevTrack}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Previous Track"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <button 
                  onClick={playNextTrack}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Next Track"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
                <button 
                  onClick={() => {
                    if (audioRef.current) audioRef.current.currentTime = 0;
                  }}
                  className="text-slate-400 hover:text-white transition-colors hidden sm:block"
                  title="Restart Track"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button className="text-slate-400 hover:text-white transition-colors hidden sm:block">
                  <Repeat className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full flex items-center gap-3">
                <span className="text-[10px] text-slate-500 font-mono">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full relative group cursor-pointer">
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={duration ? (currentTime / duration) * 100 : 0}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume & Misc */}
            <div className="flex items-center justify-end gap-4 w-1/3 hidden md:flex">
              <div className="flex items-center gap-2 w-32">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <div className="flex-1 h-1 bg-slate-800 rounded-full relative">
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      if (audioRef.current) audioRef.current.volume = v;
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="h-full bg-slate-400 rounded-full"
                    style={{ width: `${volume * 100}%` }}
                  ></div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Disc3 className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Pack Detail Modal */}
        {selectedPack && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-4xl max-h-full overflow-hidden bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
              <button 
                onClick={() => setSelectedPack(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Left Side: Art */}
              <div className="w-full md:w-2/5 aspect-square md:aspect-auto">
                <img src={selectedPack.image} alt={selectedPack.title} className="w-full h-full object-cover" />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-3/5 p-8 overflow-y-auto flex flex-col">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">{selectedPack.genre}</span>
                  <h2 className="text-3xl font-black text-white mb-1">{selectedPack.title}</h2>
                  <p className="text-slate-400 font-medium">by {selectedPack.artist}</p>
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Music className="w-4 h-4" /> Tracklist ({selectedPack.tracksList?.length || 0} tracks)
                  </h3>
                  
                  <div className="space-y-1">
                    {selectedPack.tracksList?.map((track, idx) => (
                      <div key={track.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-slate-500 w-4">{idx + 1}</span>
                          <button className="p-1.5 rounded-full bg-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                            <Play className="w-3 h-3 fill-current" />
                          </button>
                          <span className="text-sm font-medium text-white">{track.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-slate-500">{track.duration}</span>
                          <button className="text-slate-500 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )) || (
                      <p className="text-slate-500 text-sm italic">Tracklist unavailable for this preview pack.</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Price</span>
                    <span className="text-2xl font-black text-white">{selectedPack.price || "FREE"}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(selectedPack)}
                    className="flex-1 py-4 rounded-xl bg-cyan-500 text-black font-black text-lg hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                  >
                    {selectedPack.price ? `Add to Cart — ${selectedPack.price}` : "Download Pack (Free)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        <div className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-96 bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-cyan-400" /> Your Cart
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 group">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.artist}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-cyan-400">{item.price || "FREE"}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-sm text-slate-400 max-w-[200px]">Add some fire packs to your collection today!</p>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                {cart.length >= 3 && (
                  <div className="flex items-center justify-between text-sm text-green-400">
                    <span>Bundle Discount (20%)</span>
                    <span>-${(cartTotal * 0.2).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-lg font-black pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-cyan-400">
                    ${(cart.length >= 3 ? cartTotal * 0.8 : cartTotal).toFixed(2)}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCheckoutLoading ? (
                  <>
                    <LoaderCircle className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  'Checkout Now'
                )}
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-4 uppercase tracking-widest font-bold">Secure Stripe Checkout</p>
            </div>
          )}
        </div>

        {/* Auth Modal */}
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-sm bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 text-center">
              <div className="absolute top-4 right-4">
                <button onClick={() => setIsAuthModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 pt-12">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20 rotate-3">
                  <VinylLogo className="w-12 h-12 text-black animate-spin-slow" />
                </div>
                
                <h2 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">Join the Community</h2>
                <p className="text-slate-400 text-sm mb-8">Sign up or log in to save your favorite packs and manage your collection.</p>
                
                <button 
                  onClick={() => {
                    handleLogin();
                    setIsAuthModalOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-white text-black font-black py-4 rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98] mb-4"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>
                
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
                  By continuing, you agree to our <br />
                  <span className="text-slate-400 font-bold">Terms of Service</span> & <span className="text-slate-400 font-bold">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {isUploadOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 bg-black/90 backdrop-blur-xl">
            <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-400" /> Upload New Pack
                </h2>
                <button onClick={() => setIsUploadOpen(false)} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpload} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Pack Title</label>
                  <input 
                    required
                    value={newPack.title}
                    onChange={(e) => setNewPack({...newPack, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                    placeholder="e.g. Summer House Anthems"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Artist / Creator</label>
                  <input 
                    required
                    value={newPack.artist}
                    onChange={(e) => setNewPack({...newPack, artist: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                    placeholder="e.g. UGEEZY EDITS"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Genre</label>
                    <select 
                      value={newPack.genre}
                      onChange={(e) => setNewPack({...newPack, genre: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white appearance-none"
                    >
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Price (e.g. $8.00)</label>
                    <input 
                      value={newPack.price}
                      onChange={(e) => setNewPack({...newPack, price: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                      placeholder="Leave empty for FREE"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Image URL</label>
                  <input 
                    required
                    value={newPack.image}
                    onChange={(e) => setNewPack({...newPack, image: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Number of Tracks</label>
                  <input 
                    type="number"
                    value={newPack.tracks}
                    onChange={(e) => setNewPack({...newPack, tracks: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                  />
                </div>

                <button type="submit" className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all active:scale-[0.98]">
                  Publish Pack
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {checkoutSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl">
            <div className="relative w-full max-w-sm bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Payment Successful!</h2>
              <p className="text-slate-400 mb-8">Thank you for your purchase. Your fire new edits are ready for download in your profile.</p>
              <button 
                onClick={() => setCheckoutSuccess(false)}
                className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
