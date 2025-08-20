"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // token enviado no link por e-mail

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/reset-password", {
        token,
        password,
      });

      if (res.status === 200) {
        setMessage("Senha redefinida com sucesso!");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleReset}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Redefinir Senha
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-3">{message}</p>}

        <input
          type="password"
          placeholder="Nova senha"
          className="border rounded-lg p-3 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirme a nova senha"
          className="border rounded-lg p-3 w-full mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition"
        >
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </button>
      </form>
    </div>
  );
}
