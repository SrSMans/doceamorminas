import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";

export function Menu() {
  const products = useQuery(api.products.list) || [];
  const announcement = useQuery(api.announcements.getActive) || null;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const dismissAnnouncement = () => {
    setClosing(true);
    setTimeout(() => {
      setShowAnnouncement(false);
      setClosing(false);
    }, 250);
    try {
      if (announcement?._id) {
        localStorage.setItem(`announcementDismissed_${announcement._id}`, "true");
      }
    } catch {}
  };
  const now = Date.now();
  const startAt = (announcement as any)?.startAt ?? (announcement as any)?._creationTime ?? 0;
  const durationDays = (announcement as any)?.durationDays ?? 7;
  const isActiveNow = Boolean(announcement && announcement.active && now >= startAt && now <= startAt + durationDays * 86400000);
  useEffect(() => {
    if (announcement?._id) {
      try {
        const dismissed = localStorage.getItem(`announcementDismissed_${announcement._id}`) === "true";
        setShowAnnouncement(!dismissed);
      } catch {
        setShowAnnouncement(true);
      }
      setEntered(true);
    }
  }, [announcement?._id]);
  useEffect(() => {
    if (isActiveNow && showAnnouncement) {
      setCountdown(20);
      const interval = setInterval(() => {
        setCountdown((c) => {
          const next = c - 1;
          if (next <= 0) {
            dismissAnnouncement();
            clearInterval(interval);
            return 0;
          }
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActiveNow, showAnnouncement]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const categories = [
    "Doces Especiais",
    "Brigadeiros Especiais",
    "Bombons",
    "Trufas",
    "Sobremesas Finas"
  ];

  const productsByCategory = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category);
    return acc;
  }, {} as Record<string, typeof products>);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      const yOffset = -225; // ajuste negativo para garantir que o título não fique escondido
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {isActiveNow && showAnnouncement && (
        <div
          className="fixed bottom-4 left-4 right-4 md:right-6 md:left-auto md:bottom-6 z-30"
          aria-live="polite"
        >
          <div className={`relative mx-auto md:ml-auto md:mr-0 max-w-sm bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-pink-100 transition-all duration-300 ease-out ${entered && !closing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${closing ? 'opacity-0 translate-y-3' : ''}`}>
            <button
              onClick={dismissAnnouncement}
              className="absolute top-3 right-3 text-pink-500 hover:text-pink-600"
              aria-label="Fechar anúncio"
            >
              ✕
            </button>
            <div className="p-3 md:p-5 flex items-center gap-3 md:gap-4">
              {announcement?.imageUrl && (
                <div className="w-12 h-16 md:w-20 md:h-28 overflow-hidden rounded-lg flex-shrink-0">
                  <img src={announcement.imageUrl} alt={announcement.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-base md:text-xl font-semibold text-pink-600 line-clamp-2">{announcement?.title}</h3>
                <p className="text-gray-700 mt-1 md:mt-2 text-xs md:text-base line-clamp-2 md:line-clamp-3">{announcement?.message}</p>
                {announcement?.linkUrl ? (
                  <a href={announcement.linkUrl} target="_blank" rel="noopener noreferrer" className="mt-2 md:mt-3 inline-block text-xs md:text-base px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600">
                    Saiba mais
                  </a>
                ) : (
                  announcement && (announcement as any).category ? (
                    <button
                      onClick={() => {
                        const cat = (announcement as any).category as string;
                        dismissAnnouncement();
                        setTimeout(() => {
                          const element = document.getElementById(cat);
                          if (element) {
                            const yOffset = -225;
                            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }, 250);
                      }}
                      className="mt-2 md:mt-3 inline-block text-xs md:text-base px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600"
                    >
                      Ver categoria
                    </button>
                  ) : null
                )}
                <div className="mt-2 text-[11px] md:text-sm text-gray-500">Fecha em {countdown}s</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div className="relative h-[400px] bg-pink-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/8024f8_0a8fc3fb5403423a8239b4122c8adfcb~mv2.png/v1/fill/w_568,h_368,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8024f8_0a8fc3fb5403423a8239b4122c8adfcb~mv2.png')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-center">
          <div className="text-center relative z-0">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-4 sm:mb-6 relative z-0">
              <span className="block sm:inline">Nosso</span>{" "}
              <span className="block sm:inline">Cardápio</span>
            </h1>
            <p className="text-lg sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra nossa seleção de doces artesanais, feitos com amor e os melhores ingredientes
              <span className="block mt-4 sm:mt-6 text-base sm:text-base md:text-lg text-gray-600 md:hidden">
                Toque nas fotos dos doces para ver a descrição
              </span>
            </p>

          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="sticky top-[84px] bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-wrap justify-center gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className="px-8 py-3 rounded-full text-pink-600 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 text-lg font-medium border border-pink-200 hover:border-pink-400"
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Mobile Dropdown */}
          <div className="md:hidden relative">
            <select 
              onChange={(e) => scrollToCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-pink-600 bg-white border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 appearance-none"
              defaultValue=""
            >
              <option value="" disabled>Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {categories.map((category) => (
          <div key={category} id={category} className="mb-24 scroll-mt-44">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">{category}</h2>
              <div className="flex-1 h-px bg-pink-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {productsByCategory[category]?.map((product) => (
                <div 
                  key={product._id} 
                  className="group cursor-pointer"
                  onClick={() => setActiveProduct(activeProduct === product._id ? null : product._id)}
                  onMouseEnter={() => {
                    // Detecta se é um dispositivo touch
                    if (!('ontouchstart' in window)) {
                      setActiveProduct(product._id);
                    }
                  }}
                  onMouseLeave={() => {
                    // Detecta se é um dispositivo touch
                    if (!('ontouchstart' in window)) {
                      setActiveProduct(null);
                    }
                  }}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    {/* Main Image */}
                    <img
                      src={product.imageUrl || "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&q=80"}
                      alt={product.name}
className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Content container with enhanced animations */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col">
                      {/* Description - ALWAYS visible on mobile, disappears with zoom in on click */}
                      <div className={`overflow-hidden transition-all duration-500 ease-out order-2 ${
                        activeProduct === product._id 
                          ? 'md:max-h-40 md:opacity-100 md:transform md:translate-y-0 max-h-40 opacity-0 scale-110' 
                          : 'md:max-h-0 md:opacity-0 md:transform md:translate-y-4 max-h-40 opacity-100 scale-100'
                      }`}>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-2 sm:p-3">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Title - above description when visible, moves down when hidden on mobile */}
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3 transition-all duration-500 order-1 ${
                        activeProduct === product._id 
                          ? 'transform translate-y-0 text-shadow-lg' 
                          : 'md:transform md:translate-y-2 transform translate-y-4'
                      }`} style={{
                        textShadow: activeProduct === product._id 
                          ? '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(236, 72, 153, 0.6)' 
                          : '2px 2px 4px rgba(0, 0, 0, 0.8)'
                      }}>
                        {product.name}
                      </h3>
                      
                      {/* Decorative line animation */}
                      <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-pink-400 transition-all duration-700 ${
                        activeProduct === product._id ? 'md:opacity-100 md:scale-x-100 opacity-0' : 'md:opacity-0 md:scale-x-0 opacity-100'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="bg-pink-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
              Experiência Única em Cada Doce
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nossos doces são preparados artesanalmente, combinando técnicas tradicionais
              com toques contemporâneos para criar sabores únicos e memoráveis.
            </p>
            <div className="flex justify-center gap-16 pt-12">
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-800">Qualidade Premium</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-800">Sabor Único</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-800">Feito com Amor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Voltar ao Topo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 right-6 w-12 h-12 bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-pink-700 focus:outline-none ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Voltar ao topo"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
