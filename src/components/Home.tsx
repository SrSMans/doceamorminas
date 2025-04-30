import React from 'react';
import './Home.css';

export function Home() {
  // Estado para controlar o efeito de partículas
  const [particles, setParticles] = React.useState([]);
  
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
  // Estado para controlar a imagem atual do carrossel
  const [currentImage, setCurrentImage] = React.useState(0);
  
  // Array com as URLs das imagens do carrossel
  const heroImages = [
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80'
  ];
  
  // Efeito para alternar as imagens automaticamente
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Troca a cada 8 segundos
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
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
  
  return (
    <div className="relative">
      {/* Hero Section with Parallax Effect and Image Carousel */}
      <div className="relative h-[600px] overflow-hidden">
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
            <h1 className="text-7xl font-normal text-pink-600 mb-6" style={{ fontFamily: 'Croissant One' }}>
              Doce Amor Minas
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Transformamos momentos especiais em doces memórias
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const event = new CustomEvent('setPage', { detail: 'CARDAPIO' });
                window.dispatchEvent(event);
              }}
              className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Conheça Nossos Doces
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

      {/* Featured Products */}
      <div className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-pink-600 text-center mb-12">
            Nossos Destaques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all">
              <img
                src="https://i.imgur.com/gDfGznA.png"
                alt="Brigadeiro"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-pink-600">Churros Explosivos</h3>
                <p className="text-base text-gray-600">Massa sabor canela, no seu interior esfera de chocolate com recheio de doce de leite e pitanga de doce de leite</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all">
              <img
                src="https://i.imgur.com/PNMNjqz.png"
                alt="Caramelado de Coco"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-pink-600">Caramelado de Coco</h3>
                <p className="text-base text-gray-600">Brigadeiro de coco, coberto com calda de caramelo e passado no coco queimado em flocos</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all">
              <img
                src="https://i.imgur.com/WLYQlva.png"
                alt="Bombom Trufado Supremo"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-pink-600">Bombom Trufado Supremo</h3>
                <p className="text-base text-gray-600">Recheio Ganache aerada de chocolate ao leite e meio amargo, um recheio leve que derrete na boca</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all">
              <img
                src="https://i.imgur.com/MInxPCA.png"
                alt="Bombom"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-pink-600">Trouxinha de Chocolate</h3>
                <p className="text-base text-gray-600">Massa sabor chocolate com recheio de cocadinha cremosa</p>
              </div>
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
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                const message = encodeURIComponent("Olá! Gostaria de fazer um pedido.");
                window.open(`https://wa.me/5532988759023?text=${message}`, '_blank');
              }}
              className="bg-white text-pink-600 px-8 py-3 rounded-full text-lg hover:bg-pink-50 transition-colors"
            >
              Faça seu Pedido
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const event = new CustomEvent('setPage', { detail: 'CARDAPIO' });
                window.dispatchEvent(event);
              }}
              className="border-2 border-white text-white px-8 py-3 rounded-full text-lg hover:bg-white hover:text-pink-600 transition-colors"
            >
              Ver Cardápio
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-pink-600 text-center mb-12">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full" style={{backgroundImage: "url('https://i.imgur.com/bB5aeBh.jpeg')", backgroundSize: 'cover'}}></div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-pink-600">Natália P.</h4>
                  <p className="text-base text-gray-600">Casamento</p>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                "Os doces fizeram o maior sucesso no meu casamento! Todos os convidados elogiaram muito!"
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full" style={{backgroundImage: "url('https://i.imgur.com/ukc5aXK.jpeg')", backgroundSize: 'cover'}}></div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-pink-600">Carlos S.</h4>
                  <p className="text-base text-gray-600">Aniversário</p>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                "Brigadeiros deliciosos e apresentação impecável. Superou todas as expectativas!"
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full" style={{backgroundImage: "url('https://i.imgur.com/hSlEErO.jpeg')", backgroundSize: 'cover'}}></div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-pink-600">Sandra M.</h4>
                  <p className="text-base text-gray-600">Evento Empresarial</p>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                "Profissionalismo e qualidade excepcionais. Já é nossa fornecedora oficial!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
