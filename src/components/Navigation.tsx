import React, { useState } from "react";
interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const pageDisplayNames = ["INÍCIO", "CARDÁPIO", "SOBRE NÓS", "CONTATO"];
  const pageIds = ["INICIO", "CARDAPIO", "SOBRE NÓS", "CONTATO"];
  const [menuOpen, setMenuOpen] = useState(false);

  const getPageId = (displayName: string) => {
    const index = pageDisplayNames.indexOf(displayName);
    return index !== -1 ? pageIds[index] : displayName;
  };

  const getDisplayName = (pageId: string) => {
    const index = pageIds.indexOf(pageId);
    return index !== -1 ? pageDisplayNames[index] : pageId;
  };

  return (
    <div className="relative">
      {/* Menu tradicional para desktop */}
      <nav className="hidden md:flex gap-6 fixed top-6 right-8 z-40">
        {pageDisplayNames.map((displayName) => (
          <button
            key={displayName}
            onClick={() => setCurrentPage(getPageId(displayName))}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              getPageId(displayName) === currentPage
                ? "bg-pink-600 text-white shadow-md"
                : "text-gray-500 hover:text-pink-600 hover:bg-pink-50"
            }`}
          >
            {displayName}
          </button>
        ))}
      </nav>

      {/* Menu hamburguer para mobile */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          aria-label="Abrir menu"
          className="flex flex-col justify-center items-center w-12 h-12 bg-white rounded-full shadow-lg border border-pink-200 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`block w-7 h-1 bg-pink-600 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-1 bg-pink-600 rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-1 bg-pink-600 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
        {/* Menu suspenso */}
        {menuOpen && (
          <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-2xl border border-pink-100 flex flex-col items-end py-2 animate-fade-in z-50">
            {pageDisplayNames.map((displayName) => (
              <button
                key={displayName}
                onClick={() => {
                  setCurrentPage(getPageId(displayName));
                  setMenuOpen(false);
                }}
                className={`w-full text-right px-6 py-3 text-base font-medium transition-all duration-200 ${
                  getPageId(displayName) === currentPage
                    ? "bg-pink-600 text-white"
                    : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                {displayName}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
