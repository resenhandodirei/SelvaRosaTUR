import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3001/auth/forgot-password", {
        email,
      });

      if (res.status === 200) {
        setMessage("Enviamos um link de recuperação para seu e-mail!");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao solicitar recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form
        onSubmit={handleForgot}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          Recuperar Senha
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

        <input
          type="email"
          placeholder="E-mail"
          className="border rounded-lg p-3 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white p-3 rounded-lg w-full hover:bg-pink-700 transition"
        >
          {loading ? "Enviando..." : "Enviar link"}
        </button>

        <div className="text-center mt-4">
          <a href="/login" className="text-sm text-gray-500">
            Voltar para login
          </a>
        </div>
      </form>
    </div>
  );
}
