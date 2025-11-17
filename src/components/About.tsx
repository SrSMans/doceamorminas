import { useState, useEffect } from "react";

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const eventImages = [
    "https://i.imgur.com/LzJ4X5u.png",
    "https://i.imgur.com/YprgS0m.png",
    "https://i.imgur.com/xgMSAIC.png",
    "https://i.imgur.com/f8wJIT1.png",
    "https://i.imgur.com/DFzp0K4.png",
    "https://i.imgur.com/5FaIx2k.png",
    "https://i.imgur.com/mwD73ID.jpeg",
    "https://i.imgur.com/Atoka40.png",
    "https://i.imgur.com/Fjw6LSt.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1); // Estado para controlar a opacidade
  const imagesToShow = 3;
  const transitionDurationMs = 700; // Duração em ms para fade-in e fade-out
  const cycleIntervalMs = 5000; // Intervalo total do ciclo de mudança de imagem

  useEffect(() => {
    let changeImageTimerId: ReturnType<typeof setTimeout>;

    // Calcula o tempo que as imagens ficam totalmente visíveis
    const displayFullyVisibleMs = cycleIntervalMs - transitionDurationMs;

    // Timer para iniciar o processo de fade-out
    const overallTimerId = setTimeout(() => {
      setOpacity(0); // Inicia o fade-out

      // Timer para mudar as imagens após o fade-out completar e então iniciar o fade-in
      changeImageTimerId = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex + imagesToShow;
          return nextIndex >= eventImages.length ? 0 : nextIndex;
        });
        setOpacity(1); // Inicia o fade-in para as novas imagens
      }, transitionDurationMs);

    }, displayFullyVisibleMs > 0 ? displayFullyVisibleMs : 0); // Garante que o tempo não seja negativo

    return () => {
      clearTimeout(overallTimerId);
      clearTimeout(changeImageTimerId); // Limpa o timer interno também
    };
  }, [currentImageIndex, eventImages.length, imagesToShow, cycleIntervalMs, transitionDurationMs]);

  const visibleImages = eventImages.slice(currentImageIndex, currentImageIndex + imagesToShow);
  // Se chegou ao fim e não completou 'imagesToShow', pega do início para completar
  if (visibleImages.length < imagesToShow && eventImages.length > imagesToShow) {
    const remaining = imagesToShow - visibleImages.length;
    visibleImages.push(...eventImages.slice(0, remaining));
  }
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-b from-pink-100 to-white">
        <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2023/12/18/11/05/chocolate-8455786_1280.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-pink-50/50"></div>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-center relative z-10">
          <h1 className="text-5xl font-bold text-pink-600 text-center drop-shadow-lg">
            Sobre Nós
          </h1>
        </div>
      </div>

      {/* Sobre a Criadora */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-pink-600">Nossa História</h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                A Doce Amor Minas nasceu da paixão pela confeitaria e do desejo de transformar momentos especiais em doces memórias.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sob a liderança de Maria Angela Nascimento Laureth, especialista em Segurança de Alimentos e com diversos cursos de confeitaria, 
                nossa confeitaria se dedica a criar experiências únicas através de doces artesanais de alta qualidade.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cada criação é feita com amor, técnica e os melhores ingredientes, garantindo não apenas sabor excepcional, 
                mas também a segurança alimentar que nossos clientes merecem.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden shadow-xl">
              <img 
                src="https://i.imgur.com/XjnxZcg.png" 
                alt="Maria Angela Nascimento Laureth"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 right-4 bg-pink-500 text-white py-2 px-4 rounded-full shadow-lg">
              Especialista em Confeitaria
            </div>
          </div>
        </div>
      </div>

      {/* Eventos Section */}
      <div className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-pink-600 text-center mb-12">
            Momentos Adoçados por Nós
          </h2>
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex flex-col sm:flex-row" // Removido transition-transform, opacidade controlada por style
              style={{
                opacity: opacity,
                transition: `opacity ${transitionDurationMs}ms ease-in-out`,
              }}
            >
              {visibleImages.map((src, index) => (
                <div key={index} className="w-full sm:w-1/3 flex-shrink-0 px-2 mb-4 sm:mb-0">
                  <img 
                    src={src} 
                    alt={`Evento ${currentImageIndex + index + 1}`} 
                    className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nossos Valores */}
      <div className="bg-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-pink-600 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Qualidade Artesanal */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-600 text-center mb-4">
                Qualidade Artesanal
              </h3>
              <p className="text-gray-600 text-center">
                Cada doce é preparado à mão, com atenção aos mínimos detalhes.
              </p>
            </div>

            {/* Ingredientes Selecionados */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-600 text-center mb-4">
                Ingredientes Selecionados
              </h3>
              <p className="text-gray-600 text-center">
                Utilizamos apenas ingredientes frescos e de alta qualidade.
              </p>
            </div>

            {/* Criatividade */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-600 text-center mb-4">
                Criatividade
              </h3>
              <p className="text-gray-600 text-center">
                Buscamos constantemente inovar e criar novas experiências de sabor.
              </p>
            </div>

            {/* Compromisso */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-600 text-center mb-4">
                Compromisso
              </h3>
              <p className="text-gray-600 text-center">
                Comprometidos em proporcionar momentos doces e memoráveis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificações e Expertise */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-gradient-to-r from-pink-50 to-white p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
            Expertise e Qualidade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Segurança de Alimentos</h3>
                  <p className="text-gray-600">Especialização em manipulação segura e higiene alimentar</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Técnicas Avançadas</h3>
                  <p className="text-gray-600">Formação contínua em técnicas modernas de confeitaria</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Controle de Qualidade</h3>
                  <p className="text-gray-600">Processos rigorosos de controle e padronização</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Personalização</h3>
                  <p className="text-gray-600">Atendimento personalizado para cada ocasião</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
