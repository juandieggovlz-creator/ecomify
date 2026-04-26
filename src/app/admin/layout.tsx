"use client";

import { ReactNode } from "react";
import { LayoutDashboard, ShieldCheck, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Si estamos en la página de login, no mostrar la estructura del panel (Header/Sidebar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
            <img src="/images/Logo Ecomify.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Ecomify<span className="text-orange-500">Admin</span></h1>
            <p className="text-xs text-neutral-400">Hiperseguridad Activada</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full border border-neutral-700 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-neutral-300">Conectado a DB</span>
          </div>
          <button 
            onClick={async () => {
              await fetch('/api/admin/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto p-6 gap-6">
        <aside className="w-64 hidden lg:flex flex-col gap-2">
          <a href="/admin" className="flex items-center gap-3 px-4 py-3 bg-orange-600/10 text-orange-500 rounded-xl border border-orange-500/20 transition-all font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Panel Principal
          </a>
          {/* Espacio para futuros enlaces de admin */}
        </aside>

        <main className="flex-1 bg-neutral-900/50 rounded-2xl border border-neutral-800 p-6 shadow-xl relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
