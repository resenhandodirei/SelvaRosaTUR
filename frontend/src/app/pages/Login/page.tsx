import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      }, { withCredentials: true }); // cookies HTTPOnly

      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Entrar</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="E-mail"
          className="border rounded-lg p-3 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border rounded-lg p-3 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white p-3 rounded-lg w-full hover:bg-pink-700 transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm text-pink-600">
            Esqueci minha senha
          </a>
          <br />
          <a href="/register" className="text-sm text-gray-500">
            Criar nova conta
          </a>
        </div>
      </form>
    </div>
  );
}
