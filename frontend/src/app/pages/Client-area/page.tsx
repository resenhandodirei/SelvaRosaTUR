"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type User = {
  id: number | string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

type TabKey = "overview" | "trips" | "favorites" | "support" | "account";

export default function ClientAreaPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [active, setActive] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="animate-pulse w-full max-w-4xl p-6">
          <div className="h-8 w-40 bg-slate-200 rounded mb-4" />
          <div className="h-32 bg-slate-200 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 bg-slate-200 rounded" />
            <div className="h-24 bg-slate-200 rounded" />
            <div className="h-24 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-green-50">
      {/* topo */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-pink-600 text-white font-bold">
              SR
            </span>
            <div className="leading-tight">
              <p className="font-semibold text-slate-800">SelvaRosa TUR</p>
              <p className="text-xs text-slate-500">Área da Cliente</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-white border hover:bg-slate-50 text-slate-700"
            >
              Voltar ao site
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* capa/overview header */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-green-500 p-[2px]">
              <div className="h-full w-full rounded-full bg-white grid place-items-center">
                <span className="text-lg font-semibold text-pink-600">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-slate-800">
              Olá, {user.name?.split(" ")[0]} 🌿
            </h1>
            <p className="text-slate-600">
              Bem-vinda à sua área! Gerencie suas viagens, favoritos e suporte em um só lugar.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActive("trips")}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white"
            >
              Minhas viagens
            </button>
            <button
              onClick={() => setActive("support")}
              className="px-4 py-2 rounded-xl bg-white border hover:bg-slate-50 text-slate-700"
            >
              Suporte
            </button>
          </div>
        </div>
      </section>

      {/* navegação de abas */}
      <nav className="mx-auto max-w-6xl px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { key: "overview", label: "Resumo" },
            { key: "trips", label: "Minhas viagens" },
            { key: "favorites", label: "Favoritos" },
            { key: "support", label: "Suporte" },
            { key: "account", label: "Conta" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key as TabKey)}
              className={`px-3 py-2 rounded-xl text-sm transition ${
                active === (t.key as TabKey)
                  ? "bg-pink-600 text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* conteúdo */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {active === "overview" && <OverviewSection user={user} />}

        {active === "trips" && <TripsSection />}

        {active === "favorites" && <FavoritesSection />}

        {active === "support" && <SupportSection />}

        {active === "account" && <AccountSection user={user} />}
      </main>

      {/* CTA flutuante (bot/whatsapp) */}
      <a
        href="#"
        aria-label="Contato"
        className="fixed bottom-5 right-5 rounded-full shadow-lg bg-green-600 hover:bg-green-700 text-white px-5 py-3"
        title="Falar com nossa concierge"
      >
        Falar com a concierge
      </a>
    </div>
  );
}

/* ===================== Sections ===================== */

function OverviewSection({ user }: { user: User }) {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Próxima viagem">
          <p className="text-slate-600">
            Você ainda não tem viagens confirmadas.{" "}
            <a href="/pacotes" className="text-pink-600 underline">
              Explore pacotes
            </a>
            .
          </p>
        </Card>
        <Card title="Créditos/Wallet">
          <p className="text-slate-600">R$ 0,00</p>
        </Card>
        <Card title="Status da conta">
          <p className="text-slate-600">Cliente ativa • {user.email}</p>
        </Card>
      </div>

      <Card title="Recomendações para você">
        <ul className="grid md:grid-cols-3 gap-4">
          {["Selva Amazônica", "Chapada dos Veadeiros", "Lençóis Maranhenses"].map(
            (d, i) => (
              <li
                key={i}
                className="rounded-xl border bg-white hover:shadow-md transition p-4"
              >
                <div className="h-28 rounded-lg bg-gradient-to-br from-pink-100 to-green-100 mb-3" />
                <p className="font-medium text-slate-800">{d}</p>
                <p className="text-sm text-slate-500">Roteiros eco & women-led</p>
                <button className="mt-3 text-pink-600 text-sm underline">
                  Ver detalhes
                </button>
              </li>
            )
          )}
        </ul>
      </Card>
    </div>
  );
}

function TripsSection() {
  // Você pode trocar por fetch real:
  // GET /trips/my (autenticado) no seu backend quando existir
  const trips: Array<any> = [];
  return (
    <Card title="Minhas viagens">
      {trips.length === 0 ? (
        <EmptyState
          title="Sem viagens ainda"
          description="Quando você reservar um pacote, ele aparecerá aqui."
          actionText="Buscar pacotes"
          href="/pacotes"
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">{/* cards de viagens */}</div>
      )}
    </Card>
  );
}

function FavoritesSection() {
  // Ex.: GET /favorites (autenticado)
  const favorites: Array<any> = [];
  return (
    <Card title="Favoritos">
      {favorites.length === 0 ? (
        <EmptyState
          title="Nada nos favoritos"
          description="Salve experiências para acompanhar promoções e datas."
          actionText="Explorar destinos"
          href="/destinos"
        />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">{/* cards */}</div>
      )}
    </Card>
  );
}

function SupportSection() {
  // Ex.: integração futura com tickets: POST /support/tickets
  return (
    <Card title="Suporte & Concierge">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Mensagem enviada! Em breve nossa concierge responde 💚");
        }}
        className="grid gap-3 max-w-xl"
      >
        <input
          className="border rounded-xl p-3"
          placeholder="Assunto"
          required
        />
        <textarea
          className="border rounded-xl p-3 min-h-[120px]"
          placeholder="Como podemos ajudar?"
          required
        />
        <button className="self-start bg-pink-600 hover:bg-pink-700 text-white rounded-xl px-4 py-2">
          Enviar
        </button>
      </form>
    </Card>
  );
}

function AccountSection({ user }: { user: User }) {
  return (
    <Card title="Configurações da conta">
      <div className="grid gap-4 max-w-xl">
        <div>
          <label className="text-sm text-slate-500">Nome</label>
          <input className="border rounded-xl p-3 w-full" defaultValue={user.name} />
        </div>
        <div>
          <label className="text-sm text-slate-500">E-mail</label>
          <input className="border rounded-xl p-3 w-full" defaultValue={user.email} />
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-4 py-2">
            Salvar alterações
          </button>
          <button className="bg-white border hover:bg-slate-50 text-slate-700 rounded-xl px-4 py-2">
            Alterar senha
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ===================== UI Helpers ===================== */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">{title}</h2>
      {children}
    </section>
  );
}

function EmptyState({
  title,
  description,
  actionText,
  href,
}: {
  title: string;
  description: string;
  actionText: string;
  href: string;
}) {
  return (
    <div className="text-center py-10">
      <p className="text-slate-800 font-medium">{title}</p>
      <p className="text-slate-500 text-sm mt-1">{description}</p>
      <a
        href={href}
        className="inline-flex mt-4 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white"
      >
        {actionText}
      </a>
    </div>
  );
}
