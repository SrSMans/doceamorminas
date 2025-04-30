import React, { useState } from "react";
interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const pages = ["INICIO", "CARDAPIO", "SOBRE NÓS", "CONTATO"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Menu tradicional para desktop */}
      <nav className="hidden md:flex gap-6 fixed top-6 right-8 z-40">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              currentPage === page
                ? "bg-pink-600 text-white shadow-md"
                : "text-gray-500 hover:text-pink-600 hover:bg-pink-50"
            }`}
          >
            {page}
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
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMenuOpen(false);
                }}
                className={`w-full text-right px-6 py-3 text-base font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-pink-600 text-white"
                    : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
