import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Menu() {
  const products = useQuery(api.products.list) || [];
  
  const categories = [
    "Doces Especiais",
    "Brigadeiros Especiais",
    "Bombons",
    "Trufas",
    "Sobremesas Finais"
  ];

  const productsByCategory = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category);
    return acc;
  }, {} as Record<string, typeof products>);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-b from-pink-100 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587248720327-8eb72564be1e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-center">
          <div className="text-center relative z-0">
            <h1 className="text-6xl font-bold text-pink-600 mb-6 relative z-0">
              Nosso Cardápio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra nossa seleção de doces artesanais, feitos com amor e os melhores ingredientes
            </p>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="sticky top-0 bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-wrap justify-center gap-6">
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
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {categories.map((category) => (
          <div key={category} id={category} className="mb-24 scroll-mt-32">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-pink-600">{category}</h2>
              <div className="flex-1 h-px bg-pink-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {productsByCategory[category]?.map((product) => (
                <div key={product._id} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-70"></div>
                    <img
                      src={product.imageUrl || "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-pink-200 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-white/90 text-lg leading-relaxed group-hover:text-white">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="bg-gradient-to-b from-white to-pink-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-pink-600">
              Experiência Única em Cada Doce
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                <p className="text-lg font-medium text-gray-800">Qualidade Premium</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-800">Sabor Único</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-800">Feito com Amor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
