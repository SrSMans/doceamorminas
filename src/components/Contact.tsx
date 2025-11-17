import React, { useState, useEffect } from 'react';
import { Percent, ShoppingBag } from 'lucide-react';
import './Contact.css';
import ClickSpark from './ClickSpark';

export function Contact() {
  const [hearts, setHearts] = useState([]);
  
  useEffect(() => {
    // Função para criar um novo coração
    const createHeart = () => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100, // posição horizontal aleatória (0-100%)
        size: Math.random() * 0.6 + 0.3, // tamanho aleatório (0.3-0.9)
        duration: Math.random() * 8 + 8, // duração aleatória (8-16s)
        delay: Math.random() * 3, // atraso aleatório (0-3s)
        opacity: Math.random() * 0.3 + 0.5 // opacidade aleatória (0.5-0.8)
      };
      
      setHearts(prevHearts => {
        // Limita o número máximo de corações para melhor performance
        if (prevHearts.length > 30) {
          return [...prevHearts.slice(1), newHeart];
        }
        return [...prevHearts, newHeart];
      });
      
      // Remove o coração após a animação terminar
      setTimeout(() => {
        setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    };
    
    // Cria corações em intervalos aleatórios
    const interval = setInterval(() => {
      createHeart();
    }, 700); // Cria um novo coração a cada 700ms
    
    // Cria alguns corações iniciais
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeart, i * 200);
    }
    
    return () => clearInterval(interval);
  }, []);
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de fazer um pedido ou tirar uma dúvida.");
    window.open(`https://wa.me/5532988759023?text=${message}`, '_blank');
  };

  return (
    <ClickSpark
      sparkColor='#dd7ffa'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
    <div className="bg-gradient-to-br from-pink-50 via-white to-pink-100 min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Croissant One, cursive' }}>
            Entre em Contato
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Adoraríamos ouvir de você! Seja para fazer um pedido, tirar dúvidas ou simplesmente dizer olá.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
          {/* Informações de Contato */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-pink-600 mb-8 border-b-2 border-pink-200 pb-4">Contatos</h2>
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">WhatsApp</h3>
                  <p className="text-gray-600">(32) 98875-9023</p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="mt-2 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors shadow hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Iniciar Conversa
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Instagram</h3>
                  <a href="https://www.instagram.com/doceamorminas/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition-colors underline">
                    @doceamorminas
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formas de Pagamento */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-pink-600 mb-8 border-b-2 border-pink-200 pb-4">Pagamento</h2>
            <div className="space-y-6">
              
              <ul className="space-y-4 list-inside list-disc text-gray-700">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0c-1.11 0-2.08-.402-2.599-1M12 16v1m0-8c-1.657 0-3 .895-3 2s1.343 2 3 2m0-4c1.11 0 2.08.402 2.599 1M12 8V7m0 1v4m0 0c1.657 0 3-.895 3-2s-1.343-2-3-2m0 8c1.11 0 2.08-.402 2.599-1M12 16v1M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  <span>PIX</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span>Dinheiro</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                 <p className="text-sm text-gray-500">Para pagamentos via PIX, utilize a chave: <strong className="text-gray-700">32 9 8875 9023</strong> (Celular)</p>
                 <p className="text-sm text-gray-500 mt-1">Titular: Maria Angela Nascimento Laureth</p>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
            <h2 className="text-3xl font-semibold text-pink-600 mb-8 border-b-2 border-pink-200 pb-4">Atenção</h2>
            <div className="space-y-6 text-gray-700">
              <p className="flex items-start gap-3">
                <Percent className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                <span>Trabalhamos com 50% de entrada no ato da encomenda e o restante na entrega da encomenda.</span>
              </p>
              <p className="flex items-start gap-3">
                <ShoppingBag className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                <span>O pedido mínimo é 12 unidades de cada sabor.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mapa (Opcional) - Pode ser adicionado se houver endereço físico */}
        {/* 
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-pink-600 text-center mb-8">Nossa Localização</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..." 
              width="100%" 
              height="450" 
              style={{ border:0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
        */}
      </div>
      
      {/* Corações flutuantes - apenas na metade inferior da página */}
      <div className="hearts-container">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              transform: `scale(${heart.size})`,
              opacity: heart.opacity,
              animation: `floatUp ${heart.duration}s ease-out ${heart.delay}s forwards`
            }}
          />
        ))}
      </div>
    </div>
    </ClickSpark>
  );
}
