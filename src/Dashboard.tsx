import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

type TabKey = "ANUNCIOS" | "MENU" | "DEPOIMENTOS";

export function Jujuba() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("ANUNCIOS");

  // Só permite acesso se for admin marcado no login candy
  useEffect(() => {
    const isAdmin = localStorage.getItem("candyAdmin");
    if (isAdmin !== "sim") {
      navigate("/candy");
    }
  }, [navigate]);

  const announcement = useQuery(api.announcements.getActive, {});
  const updateAnnouncement = useMutation(api.announcements.upsert);
  const deleteAnnouncement = useMutation(api.announcements.deleteActive);

  const products = useQuery(api.products.list, {});
  const addProduct = useMutation(api.products.add);
  const updateProduct = useMutation(api.products.update);
  const reorderProducts = useMutation(api.products.reorder);

  const testimonials = useQuery(api.testimonials.list, {});
  const addTestimonial = useMutation(api.testimonials.add);
  const updateTestimonial = useMutation(api.testimonials.update);

  // categorias existentes (criadas a partir dos produtos já cadastrados)
  const categories = Array.from(
    new Set((products ?? []).map((p) => p.category)),
  );

  // produtos ordenados pela posição (sortOrder)
  const orderedProducts = (products ?? []).slice().sort(
    (a, b) => (a.sortOrder ?? 1e12) - (b.sortOrder ?? 1e12),
  );

  // formulário de anúncio (Anúncios)
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annImageUrl, setAnnImageUrl] = useState("");
  const [annLinkUrl, setAnnLinkUrl] = useState("");
  const [annDurationDays, setAnnDurationDays] = useState<string>("");
  const [annCategory, setAnnCategory] = useState<string>("");
  const [annActive, setAnnActive] = useState<boolean>(false);

  // formulário de novo produto
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  // filtro da lista de produtos
  const [filterCategory, setFilterCategory] = useState<string>("TODOS");

  const visibleProducts = orderedProducts.filter((p) =>
    filterCategory === "TODOS" ? true : p.category === filterCategory,
  );

  // formulário de novo depoimento
  const [newDepName, setNewDepName] = useState("");
  const [newDepEvent, setNewDepEvent] = useState("");
  const [newDepDescription, setNewDepDescription] = useState("");
  const [newDepPhotoUrl, setNewDepPhotoUrl] = useState("");

  useEffect(() => {
    if (announcement) {
      setAnnTitle(announcement.title ?? "");
      setAnnMessage(announcement.message ?? "");
      setAnnImageUrl(announcement.imageUrl ?? "");
      setAnnLinkUrl(announcement.linkUrl ?? "");
      setAnnDurationDays(
        announcement.durationDays != null ? String(announcement.durationDays) : "",
      );
      setAnnCategory(announcement.category ?? "");
      setAnnActive(announcement.active ?? false);
    } else {
      setAnnTitle("");
      setAnnMessage("");
      setAnnImageUrl("");
      setAnnLinkUrl("");
      setAnnDurationDays("");
      setAnnCategory("");
      setAnnActive(false);
    }
  }, [announcement]);

  const handleSaveAnnouncement = (event: FormEvent) => {
    event.preventDefault();
    updateAnnouncement({
      active: annActive,
      title: annTitle,
      message: annMessage,
      imageUrl: annImageUrl || undefined,
      linkUrl: annLinkUrl || undefined,
      startAt: announcement?.startAt ?? Date.now(),
      durationDays:
        annDurationDays !== "" ? Number(annDurationDays) || undefined : undefined,
      category: annCategory || undefined,
    });
  };

  const handleToggleAnnouncement = () => {
    const newActive = !annActive;
    setAnnActive(newActive);
    updateAnnouncement({
      active: newActive,
      title: annTitle,
      message: annMessage,
      imageUrl: annImageUrl || undefined,
      linkUrl: annLinkUrl || undefined,
      startAt: announcement?.startAt ?? Date.now(),
      durationDays:
        annDurationDays !== "" ? Number(annDurationDays) || undefined : undefined,
      category: annCategory || undefined,
    });
  };

  const handleDeleteAnnouncement = () => {
    deleteAnnouncement({});
  };

  const handleAddProduct = (event: FormEvent) => {
    event.preventDefault();
    if (!newName || !newDescription || !newCategory) return;

    addProduct({
      name: newName,
      description: newDescription,
      category: newCategory,
      imageUrl: newImageUrl || undefined,
    });

    setNewName("");
    setNewDescription("");
    setNewCategory("");
    setNewImageUrl("");
  };

  const handleAddTestimonial = (event: FormEvent) => {
    event.preventDefault();
    if (!newDepName || !newDepEvent || !newDepDescription) return;

    addTestimonial({
      name: newDepName,
      event: newDepEvent,
      description: newDepDescription,
      photoUrl: newDepPhotoUrl || undefined,
    });

    setNewDepName("");
    setNewDepEvent("");
    setNewDepDescription("");
    setNewDepPhotoUrl("");
  };

  const handleUpdateProduct = (
    id: string,
    name: string,
    description: string,
    category: string,
    imageUrl?: string,
  ) => {
    updateProduct({
      id: id as any,
      name,
      description,
      category,
      imageUrl,
    });
  };

  const handleMoveProduct = (indexFrom: number, indexTo: number) => {
    if (!visibleProducts.length) return;
    if (indexTo < 0 || indexTo >= visibleProducts.length) return;

    const reordered = [...visibleProducts];
    const [item] = reordered.splice(indexFrom, 1);
    reordered.splice(indexTo, 0, item);

    const orderedIds = reordered.map((p) => p._id);
    reorderProducts({ orderedIds });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <header className="bg-white/80 backdrop-blur shadow-sm border-b border-pink-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-baseline gap-3">
          <h1
            className="text-2xl font-semibold text-pink-600"
            style={{ fontFamily: "Pacifico" }}
          >
            Candy Jujuba
          </h1>
          <span className="text-xs uppercase tracking-wide text-pink-400 bg-pink-50 border border-pink-100 px-2 py-1 rounded-full">
            Área administrativa
          </span>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("candyAdmin");
            navigate("/");
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 border border-gray-200"
        >
          Sair
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 space-y-6">
        {/* Abas */}
        <div className="bg-white/80 backdrop-blur border border-pink-100 rounded-2xl p-2 flex gap-2 text-sm overflow-x-auto">
          {([
            { key: "ANUNCIOS", label: "Anúncios" },
            { key: "MENU", label: "Menu (Doces)" },
            { key: "DEPOIMENTOS", label: "Depoimentos" },
          ] as { key: TabKey; label: string }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2 rounded-xl border text-center transition-colors ${
                activeTab === tab.key
                  ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                  : "bg-white text-pink-500 border-pink-100 hover:border-pink-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "ANUNCIOS" && (
          <section className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-pink-600">Anúncio em destaque</h2>
                <p className="text-sm text-gray-500">
                  Crie, edite e ative/desative o banner principal exibido na página inicial.
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-pink-50 text-pink-500 border border-pink-100">
                {annActive ? "Ativo" : "Inativo"}
              </span>
            </div>

            {/* Formulário de anúncio */}
            <form
              onSubmit={handleSaveAnnouncement}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-pink-50/50 border border-pink-100 rounded-xl p-4"
            >
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Título do anúncio</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="Ex: Novidade no cardápio"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Mensagem</label>
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  rows={3}
                  placeholder="Texto que aparecerá no banner"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">URL da imagem (opcional)</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={annImageUrl}
                  onChange={(e) => setAnnImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">URL de destino (opcional)</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={annLinkUrl}
                  onChange={(e) => setAnnLinkUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Duração em dias</label>
                <input
                  type="number"
                  min={1}
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={annDurationDays}
                  onChange={(e) => setAnnDurationDays(e.target.value)}
                  placeholder="Ex: 7"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Categoria (opcional)</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm bg-white"
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {categories
                    .filter((c) => c !== "DESTAQUES")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="ann-active"
                  type="checkbox"
                  checked={annActive}
                  onChange={(e) => setAnnActive(e.target.checked)}
                  className="h-4 w-4 text-pink-500 border-pink-300 rounded"
                />
                <label htmlFor="ann-active" className="text-xs text-gray-600">
                  Anúncio ativo
                </label>
              </div>
              <div className="md:col-span-2 flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={handleDeleteAnnouncement}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50"
                >
                  Apagar anúncio
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleToggleAnnouncement}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-pink-600 border border-pink-300 bg-white hover:bg-pink-50"
                  >
                    {annActive ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-pink-500 hover:bg-pink-600"
                  >
                    Salvar anúncio
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        {activeTab === "MENU" && (
          <section className="space-y-6">
            {/* Bloco 1: cadastro de novos doces */}
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-pink-600">Menu de doces – cadastro</h2>
                <p className="text-sm text-gray-500">
                  Cadastre novos produtos para aparecerem no cardápio do site.
                </p>
              </div>

              {/* Formulário de cadastro de novo produto */}
              <form
                onSubmit={handleAddProduct}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-pink-50/50 border border-pink-100 rounded-lg p-4"
              >
            <div>
              <label className="block text-xs font-medium mb-1">Nome do doce</label>
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Categoria</label>
              <select
                className="w-full border rounded px-2 py-1 text-sm bg-white"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">Descrição</label>
              <textarea
                className="w-full border rounded px-2 py-1 text-sm"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={2}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">URL da foto do doce</label>
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-pink-500 hover:bg-pink-600"
              >
                Cadastrar novo produto
              </button>
            </div>
          </form>
        </div>

        {/* Bloco 2: doces já cadastrados */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-pink-600">Menu de doces – cadastrados</h2>
              <p className="text-sm text-gray-500">
                Veja e edite os doces já cadastrados no sistema.
              </p>
            </div>
            {categories.length > 0 && (
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Filtros
                </span>
                <div className="flex flex-wrap gap-2 justify-end">
                  {[
                    "TODOS",
                    ...categories,
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFilterCategory(c)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors shadow-sm ${
                        filterCategory === c
                          ? "bg-pink-500 text-white border-pink-500"
                          : "bg-pink-50 text-pink-500 border-pink-100 hover:bg-pink-100"
                      }`}
                    >
                      {c === "TODOS" ? "Todos" : c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lista editável de produtos */}
          <ul className="space-y-3 text-sm">
            {visibleProducts.map((p, index) => (
              <li
                key={p._id}
                className="flex gap-3 border border-gray-100 rounded-lg p-3"
              >
                {/* controles de posição */}
                <div className="flex flex-col items-center justify-center gap-1 mr-2">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveProduct(index, index - 1)}
                    className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold ${
                      index === 0
                        ? "border-gray-200 text-gray-300"
                        : "border-pink-200 text-pink-500 hover:bg-pink-50"
                    }`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={index === visibleProducts.length - 1}
                    onClick={() => handleMoveProduct(index, index + 1)}
                    className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold ${
                      index === visibleProducts.length - 1
                        ? "border-gray-200 text-gray-300"
                        : "border-pink-200 text-pink-500 hover:bg-pink-50"
                    }`}
                  >
                    ↓
                  </button>
                </div>

                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 space-y-1">
                  <input
                    className="w-full border rounded px-2 py-1 text-sm font-medium"
                    defaultValue={p.name}
                    onBlur={(e) =>
                      handleUpdateProduct(
                        p._id,
                        e.target.value,
                        p.description,
                        p.category,
                        p.imageUrl,
                      )
                    }
                  />
                  <textarea
                    className="w-full border rounded px-2 py-1 text-xs text-gray-700"
                    defaultValue={p.description}
                    rows={2}
                    onBlur={(e) =>
                      handleUpdateProduct(
                        p._id,
                        p.name,
                        e.target.value,
                        p.category,
                        p.imageUrl,
                      )
                    }
                  />
                  <div className="flex gap-2 items-center">
                    <select
                      className="border rounded px-2 py-1 text-xs bg-white"
                      defaultValue={p.category}
                      onChange={(e) =>
                        handleUpdateProduct(
                          p._id,
                          p.name,
                          p.description,
                          e.target.value,
                          p.imageUrl,
                        )
                      }
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <input
                      className="flex-1 border rounded px-2 py-1 text-xs"
                      placeholder="URL da foto"
                      defaultValue={p.imageUrl ?? ""}
                      onBlur={(e) =>
                        handleUpdateProduct(
                          p._id,
                          p.name,
                          p.description,
                          p.category,
                          e.target.value || undefined,
                        )
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
            {!products?.length && (
              <li className="text-gray-400 text-sm">
                Nenhum produto cadastrado ainda.
              </li>
            )}
          </ul>
        </div>
      </section>
        )}

        {activeTab === "DEPOIMENTOS" && (
          <section className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-pink-600">Depoimentos</h2>
                <p className="text-sm text-gray-500">
                  Gerencie os depoimentos que aparecem na página inicial.
                </p>
              </div>
            </div>

            {/* Formulário de novo depoimento */}
            <form
              onSubmit={handleAddTestimonial}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-pink-50/50 border border-pink-100 rounded-lg p-4"
            >
              <div>
                <label className="block text-xs font-medium mb-1">Nome</label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={newDepName}
                  onChange={(e) => setNewDepName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Evento / Ocasião</label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={newDepEvent}
                  onChange={(e) => setNewDepEvent(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Depoimento</label>
                <textarea
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={newDepDescription}
                  onChange={(e) => setNewDepDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">URL da foto (opcional)</label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={newDepPhotoUrl}
                  onChange={(e) => setNewDepPhotoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-pink-500 hover:bg-pink-600"
                >
                  Adicionar depoimento
                </button>
              </div>
            </form>

            {/* Lista de depoimentos (editável) */}
            <ul className="space-y-3 max-h-80 overflow-y-auto text-sm">
              {testimonials?.map((t) => (
                <li
                  key={t._id}
                  className="flex gap-3 border border-gray-100 rounded-lg p-3 bg-pink-50/40"
                >
                  {t.photoUrl && (
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        className="flex-1 border rounded px-2 py-1 text-sm font-medium text-pink-700 bg-white/70"
                        defaultValue={t.name}
                        onBlur={(e) =>
                          updateTestimonial({
                            id: t._id,
                            name: e.target.value,
                            event: t.event,
                            description: t.description,
                            photoUrl: t.photoUrl,
                          })
                        }
                      />
                      <input
                        className="border rounded px-2 py-1 text-xs text-pink-600 bg-pink-50"
                        defaultValue={t.event}
                        onBlur={(e) =>
                          updateTestimonial({
                            id: t._id,
                            name: t.name,
                            event: e.target.value,
                            description: t.description,
                            photoUrl: t.photoUrl,
                          })
                        }
                      />
                    </div>
                    <textarea
                      className="w-full border rounded px-2 py-1 text-xs text-gray-700 bg-white/70"
                      defaultValue={t.description}
                      rows={3}
                      onBlur={(e) =>
                        updateTestimonial({
                          id: t._id,
                          name: t.name,
                          event: t.event,
                          description: e.target.value,
                          photoUrl: t.photoUrl,
                        })
                      }
                    />
                    <input
                      className="w-full border rounded px-2 py-1 text-xs text-gray-600 bg-white/70"
                      placeholder="URL da foto"
                      defaultValue={t.photoUrl ?? ""}
                      onBlur={(e) =>
                        updateTestimonial({
                          id: t._id,
                          name: t.name,
                          event: t.event,
                          description: t.description,
                          photoUrl: e.target.value || undefined,
                        })
                      }
                    />
                  </div>
                </li>
              ))}
              {!testimonials?.length && (
                <li className="text-gray-400 text-sm">
                  Nenhum depoimento cadastrado ainda.
                </li>
              )}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
