import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Consulta o usuário quando o login estiver preenchido
  const user = useQuery(api.users.getByLogin, login ? { login } : "skip");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) {
      setError("Usuário não encontrado.");
      return;
    }

    if (user.senha !== senha) {
      setError("Senha incorreta.");
      return;
    }

    // Aqui você pode redirecionar, guardar estado de admin, etc.
    if (user.admin === "sim") {
      setSuccess("Login de administrador realizado com sucesso!");
      localStorage.setItem("candyAdmin", "sim");
      navigate("/jujuba");
    } else {
      setSuccess("Login realizado com sucesso!");
      localStorage.setItem("candyAdmin", "nao");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50">
      <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 border border-pink-100">
        <h1
          className="text-3xl text-center mb-2 text-pink-600"
          style={{ fontFamily: "Pacifico" }}
        >
          Doce Amor Minas
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Acesso restrito para gestão do site.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              placeholder="Digite seu login"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
