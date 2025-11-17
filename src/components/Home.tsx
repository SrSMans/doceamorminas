import React from 'react';
import './Home.css';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ClickSpark from './ClickSpark';

export function Home() {
  // Estado para controlar o efeito de partículas
  const [particles, setParticles] = React.useState([]);
  
  // Estado para controlar a palavra que muda na frase
  const [currentWord, setCurrentWord] = React.useState(0);
  const changingWords = ["doces memórias", "sabores inesquecíveis", "experiências mágicas", "alegrias deliciosas"];
  
  // Efeito para criar e animar as partículas
  React.useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * -1 - 0.5,
    });

    const initialParticles = Array.from({ length: 50 }, createParticle);
    setParticles(initialParticles);

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          ...(particle.y < -10 && {
            y: window.innerHeight + 10,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const animationInterval = setInterval(animateParticles, 50);
    return () => clearInterval(animationInterval);
  }, []);
  const featured = useQuery(api.products.listByCategory, { category: 'DESTAQUES' }) || [];
  const [itemsPerView, setItemsPerView] = React.useState(4);
  const [startIndex, setStartIndex] = React.useState(0);
  
  // Estados para controlar o swipe/arrasto
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isSnapping, setIsSnapping] = React.useState(false);
  const autoPlayIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [slideStep, setSlideStep] = React.useState(0);
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else setItemsPerView(4);
      
      // Atualiza a largura do container
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  // Função para resetar o timer automático (sem animação de chegada)
  const resetAutoPlay = React.useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    if (featured.length > 0) {
      autoPlayIntervalRef.current = setInterval(() => {
        if (!isDragging && !isSnapping) {
          setStartIndex((i) => (i + 1) % featured.length);
        }
      }, 5000);
    }
  }, [featured.length, isDragging, isSnapping]);

  React.useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [featured.length, resetAutoPlay]);

  // Mede o passo real do slide (inclui gap entre itens)
  React.useEffect(() => {
    const measure = () => {
      if (!innerRef.current) return;
      const el = innerRef.current;
      const children = el.children;
      if (children.length >= 2) {
        const a = (children[0] as HTMLElement).getBoundingClientRect();
        const b = (children[1] as HTMLElement).getBoundingClientRect();
        setSlideStep(Math.abs(b.left - a.left));
      } else if (children.length === 1) {
        setSlideStep((children[0] as HTMLElement).getBoundingClientRect().width);
      }
    };
    requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [itemsPerView, featured.length]);
  
  // Funções para detectar swipe com efeito visual
  const handleTouchStart = (e: React.TouchEvent) => {
    // Pausa o autoplay enquanto o usuário interage
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
    setIsSnapping(false);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    // Offset relativo ao início do toque
    const offset = currentTouch - touchStart;
    setDragOffset(offset);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    const delta = touchEnd - touchStart;
    const threshold = Math.max(40, slideStep * 0.25);

    if (slideStep && Math.abs(delta) >= threshold) {
      // Snap simples: completa a animação e troca
      setIsSnapping(true);
      const direction = delta < 0 ? -1 : 1;
      setDragOffset(direction * slideStep);
      const duration = 300;
      setTimeout(() => {
        setStartIndex((i) => (i + (direction < 0 ? 1 : -1) + featured.length) % featured.length);
        setDragOffset(0);
        setIsSnapping(false);
        resetAutoPlay();
      }, duration);
    } else {
      // Volta para posição inicial sem trocar
      setIsSnapping(true);
      setDragOffset(0);
      setTimeout(() => setIsSnapping(false), 200);
      resetAutoPlay();
    }
  };

  // Estado para controlar a imagem atual do carrossel
  const [currentImage, setCurrentImage] = React.useState(0);
  
  // Array com as URLs das imagens do carrossel
  const heroImages = [
    'https://static.itdg.com.br/images/auto-auto/0812d896211493fcb70c2a0454c138ba/macarons-1.jpg',
    'https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2016/11/13-receitas-de-brigadeiros-gourmet-faceis.webp',
    'https://cdn0.casamentos.com.br/article-real-wedding/855/3_2/960/jpg/1960095.jpeg',
    'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80'
  ];
  
  // Efeito para alternar as imagens automaticamente
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Troca a cada 8 segundos
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  // Efeito para alternar as palavras automaticamente
  React.useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % changingWords.length);
    }, 3000); // Troca a cada 3 segundos
    
    return () => clearInterval(wordInterval);
  }, [changingWords.length]);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          // Velocidade aumentada para tornar o efeito mais perceptível
          // Limitando o movimento máximo para evitar espaços vazios
          const movement = Math.min(scrolled * -0.15, 0); // Aumentado de -0.05 para -0.15
          element.style.transform = `translateY(${movement}px)`;
        }
      });
    };

    // Usando requestAnimationFrame para melhor performance e suavidade
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    
    // Inicializa para garantir que o efeito seja aplicado imediatamente
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);
  
  // Indicadores de navegação do carrossel
  const renderCarouselIndicators = () => {
    return (
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-pink-500 w-6' : 'bg-pink-300'}`}
            onClick={() => setCurrentImage(index)}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Depoimentos dos clientes vindos do Convex
  const testimonials = useQuery(api.testimonials.list, {}) || [];

  // Índice do primeiro depoimento sendo exibido
  const [testimonialStartIndex, setTestimonialStartIndex] = React.useState(0);

  // Rotação automática dos depoimentos a cada 7 segundos
  React.useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setTestimonialStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);
  
  return (
    <ClickSpark
      sparkColor='#dd7ffa'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
    <div className="relative">
      {/* Hero Section with Parallax Effect and Image Carousel */}
      <div className="relative h-[500px] sm:h-[600px] overflow-hidden">
        {/* Camada de fundo sólida para evitar que o fundo rosa apareça */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Carrossel de imagens com parallax e zoom */}
        {heroImages.map((imageUrl, index) => (
          <div 
            key={index}
            className={`parallax-bg absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentImage === index ? 'opacity-40' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${imageUrl}')`,
              transform: 'translateY(0)',
              transition: 'transform 0.1s linear, opacity 1.5s ease-in-out',
              willChange: 'transform, opacity',
              height: 'calc(100% + 200px)',
              top: '-100px',
            }}
          ></div>
        ))}

        {/* Efeito de partículas */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}

        {/* Gradiente animado */}
        <div className="absolute inset-0 animated-gradient z-1"></div>

        {/* Efeito de onda */}
        <div className="wave"></div>
        
        {/* Indicadores do carrossel */}
        {renderCarouselIndicators()}
        
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="relative z-1 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal text-pink-600 mb-6" style={{ fontFamily: 'Croissant One' }}>
              Doce Amor Minas
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Transformamos momentos especiais em<br />
              <span className="changing-word">{changingWords[currentWord]}</span>
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const event = new CustomEvent('setPage', { detail: 'CARDAPIO' });
                window.dispatchEvent(event);
              }}
              className="bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Conheça Nossos Doces
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">Feito com Amor</h3>
              <p className="text-lg text-gray-600">Cada doce é preparado artesanalmente com ingredientes selecionados e muito carinho</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">Sabor Único</h3>
              <p className="text-lg text-gray-600">Receitas exclusivas que combinam tradição mineira e inovação</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">Qualidade Premium</h3>
              <p className="text-lg text-gray-600">Utilizamos apenas ingredientes de alta qualidade em nossas criações</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 text-center mb-8 sm:mb-12">Nossos Destaques</h2>
          
          {/* Desktop: Grid tradicional com rotação */}
          <div className="hidden lg:block">
            {featured.length > 0 && (
              <div className="relative">
                <div className="grid grid-cols-4 gap-8">
                  {Array.from({ length: 4 }).map((_, k) => {
                    const item = featured[(startIndex + k) % featured.length];
                    return (
                      <div
                        key={`${startIndex}-${k}`}
                        className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          const event = new CustomEvent("setPage", { detail: "CARDAPIO" });
                          window.dispatchEvent(event);
                        }}
                      >
                        <div className="relative aspect-[4/5]">
                          <img
                            src={
                              item.imageUrl ||
                              "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&q=80"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Botões de navegação desktop */}
                <div className="absolute inset-y-0 -left-4 flex items-center">
                  <button
                    className="bg-white/80 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => {
                      if (featured.length > 0) {
                        setStartIndex((i) => (i - 1 + featured.length) % featured.length);
                        resetAutoPlay();
                      }
                    }}
                    aria-label="Anterior"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div className="absolute inset-y-0 -right-4 flex items-center">
                  <button
                    className="bg-white/80 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => {
                      if (featured.length > 0) {
                        setStartIndex((i) => (i + 1) % featured.length);
                        resetAutoPlay();
                      }
                    }}
                    aria-label="Próximo"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile/Tablet: Carrossel com swipe */}
          <div className="relative lg:hidden" ref={carouselRef}>
            {featured.length > 0 && (
              <div className="overflow-hidden">
                  <div
                    className="swipe-container"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'pan-y' }}
                  >
                  <div
                    className="flex gap-6 sm:gap-8"
                    ref={innerRef}
                    style={{ 
                      transform: `translateX(calc(-${slideStep}px + ${dragOffset}px))`,
                      transition: isSnapping ? 'transform 0.3s ease-out' : 'none'
                    }}
                  >
                    {/* Renderiza cards extras para o efeito de peek */}
                    {Array.from({ length: Math.min(itemsPerView, featured.length) + 2 }).map((_, k) => {
                      // Ajusta o índice para mostrar também o card anterior e próximo
                      const adjustedIndex = (startIndex - 1 + k + featured.length) % featured.length;
                      const item = featured[adjustedIndex];
                      const cardWidth = itemsPerView === 1 ? '100%' : itemsPerView === 2 ? 'calc(50% - 1rem)' : 'calc(33.333% - 1.333rem)';
                      
                      return (
                        <div
                          key={`${startIndex}-${k}`}
                          className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex-shrink-0"
                          style={{ width: cardWidth }}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            const event = new CustomEvent("setPage", { detail: "CARDAPIO" });
                            window.dispatchEvent(event);
                          }}
                        >
                          <div className="relative aspect-[4/5]">
                            <img
                              src={
                                item.imageUrl ||
                                "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&q=80"
                              }
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay escuro para destacar o texto (ainda mais suave) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
                            {/* Nome do produto em branco, sem legenda/descrição */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                              <h3 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md">
                                {item.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* Indicadores para ambos desktop e mobile */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {featured.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${startIndex % featured.length === i ? 'bg-pink-500 w-6' : 'bg-pink-300'}`}
                  onClick={() => {
                    setStartIndex(i);
                    resetAutoPlay();
                  }}
                  aria-label={`Ir para destaque ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Adoce seu evento com nossos doces artesanais
          </h2>
          <p className="text-2xl mb-8 opacity-90">
            Casamentos, aniversários, festas empresariais e muito mais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const message = encodeURIComponent("Olá! Gostaria de fazer um pedido.");
                window.open(`https://wa.me/5532988759023?text=${message}`, '_blank');
              }}
              className="bg-white text-pink-600 px-6 sm:px-8 py-3 rounded-full text-lg hover:bg-pink-50 transition-colors w-full sm:w-auto"
            >
              Faça seu Pedido
            </button>
            <button
              onClick={() => {
                // Dispara o evento para mudar para a página 'SOBRE NÓS'
                const event = new CustomEvent('setPage', { detail: 'SOBRE NÓS' });
                window.dispatchEvent(event);
                
                // Aguarda a mudança de página e então rola até a seção
                setTimeout(() => {
                  const section = document.querySelector('.text-3xl.font-bold.text-pink-600.text-center.mb-12');
                  if (section) {
                    const headerHeight = 120; // Aumentado o espaço para evitar corte do título
                    const sectionRect = section.getBoundingClientRect();
                    const absoluteTop = window.pageYOffset + sectionRect.top - headerHeight;
                    
                    window.scrollTo({
                      top: absoluteTop,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }}
              className="bg-pink-400 text-white px-6 sm:px-8 py-3 rounded-full text-lg hover:bg-pink-500 transition-colors w-full sm:w-auto"
            >
              Nossos Trabalhos
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const event = new CustomEvent('setPage', { detail: 'CARDAPIO' });
                window.dispatchEvent(event);
              }}
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full text-lg hover:bg-white hover:text-pink-600 transition-colors w-full sm:w-auto"
            >
              Ver Cardápio
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 text-center mb-8 sm:mb-12">
            O que nossos clientes dizem
          </h2>

          {testimonials && testimonials.length > 0 && (
            <div
              key={testimonialStartIndex}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 testimonials-wrapper"
            >
              {Array.from({ length: Math.min(3, testimonials.length) }).map((_, offset) => {
                const testimonial = testimonials[(testimonialStartIndex + offset) % testimonials.length];

                return (
                  <div
                    key={`${testimonialStartIndex}-${offset}`}
                    className="bg-pink-50 p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col min-h-[260px]"
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className="w-12 h-12 bg-pink-200 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${testimonial.photoUrl ?? ""}')` }}
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-pink-600">{testimonial.name}</h4>
                        <p className="text-base text-gray-600">{testimonial.event}</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 flex-1">
                      "{testimonial.description}"
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
    </ClickSpark>
  );
}
