"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "https://localhost:3001"}/auth/login`,
        { email, password },
        { timeout: 10000 }
      );

      localStorage.setItem("token", res.data.token);
      router.replace("/client-area");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Falha ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 relative">
      {/* Overlay de processamento opcional */}
      {loading && (
        <div
          aria-live="assertive"
          className="absolute inset-0 bg-white/60 backdrop-blur-sm grid place-items-center z-10"
        >
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-pink-600" />
            <p className="text-slate-700">Autenticando…</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white rounded-2xl shadow p-6"
        aria-busy={loading}
      >
        <h1 className="text-xl font-semibold text-slate-800">Entrar</h1>
        <p className="text-sm text-slate-500">Acesse sua área de cliente</p>

        <label className="block mt-4 text-sm text-slate-600">E-mail</label>
        <input
          className="mt-1 w-full border rounded-xl p-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        <label className="block mt-3 text-sm text-slate-600">Senha</label>
        <input
          className="mt-1 w-full border rounded-xl p-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        {errorMsg && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl px-4 py-2 disabled:opacity-60"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
          )}
          {loading ? "Entrando…" : "Entrar"}
        </button>

        <div className="mt-4 flex justify-between text-sm">
          <a className="text-pink-600 hover:underline" href="/register">Criar conta</a>
          <a className="text-pink-600 hover:underline" href="/forgot-password">Esqueci a senha</a>
        </div>
      </form>
    </div>
  );
}