export function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-b from-pink-100 to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-pink-600 text-center relative z-0">
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
                Sob a liderança de Angela Nascimento Laureth, especialista em Segurança de Alimentos e com diversos cursos de confeitaria, 
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
              <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                <svg className="w-32 h-32 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 right-4 bg-pink-500 text-white py-2 px-4 rounded-full shadow-lg">
              Especialista em Confeitaria
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
