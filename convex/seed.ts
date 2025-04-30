import { mutation } from "./_generated/server";

export const addExampleProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const products = [
      {
        name: "Brigadeiro Gourmet",
        description: "Brigadeiro tradicional feito com chocolate belga 70% cacau, coberto com granulado especial",
        category: "Brigadeiros Especiais",
        imageUrl: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&q=80"
      },
      {
        name: "Casadinho",
        description: "Doce tradicional mineiro feito com chocolate branco e preto, decorado com açúcar de confeiteiro",
        category: "Doces Especiais",
        imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80"
      },
      {
        name: "Bombom de Morango",
        description: "Bombom recheado com ganache de morango e coberto com chocolate ao leite",
        category: "Bombons",
        imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80"
      },
      {
        name: "Trufa de Maracujá",
        description: "Trufa de chocolate branco com recheio cremoso de maracujá",
        category: "Trufas",
        imageUrl: "https://images.unsplash.com/photo-1548907040-4d2be3c89e19?auto=format&fit=crop&q=80"
      },
      {
        name: "Pavlova de Frutas Vermelhas",
        description: "Sobremesa delicada feita com merengue, chantilly e mix de frutas vermelhas frescas",
        category: "Sobremesas Finais",
        imageUrl: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&q=80"
      },
      {
        name: "Brigadeiro de Pistache",
        description: "Brigadeiro gourmet feito com pistache verdadeiro, finalizado com pistache moído",
        category: "Brigadeiros Especiais",
        imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80"
      },
      {
        name: "Bem Casado",
        description: "Doce tradicional de casamento, feito com massa amanteigada e recheio de doce de leite",
        category: "Doces Especiais",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80"
      },
      {
        name: "Bombom de Caramelo Salgado",
        description: "Bombom de chocolate amargo recheado com caramelo salgado",
        category: "Bombons",
        imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80"
      },
      {
        name: "Trufa de Café",
        description: "Trufa de chocolate meio amargo com ganache de café premium",
        category: "Trufas",
        imageUrl: "https://images.unsplash.com/photo-1553452118-621e1f860f43?auto=format&fit=crop&q=80"
      },
      {
        name: "Petit Gateau",
        description: "Bolinho de chocolate quente com centro derretido, servido com sorvete de creme",
        category: "Sobremesas Finais",
        imageUrl: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80"
      }
    ];

    for (const product of products) {
      await ctx.db.insert("products", product);
    }
  },
});
