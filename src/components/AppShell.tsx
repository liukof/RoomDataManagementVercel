"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectProvider } from "@/lib/projectContext";
import { ProjectSelector } from "@/components/ProjectSelector";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={[
        "rounded-lg px-3 py-2 text-sm",
        active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/me", { cache: "no-store" });
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const json = (await res.json()) as { ok: boolean; user: { email?: string } };
      if (!cancelled) setEmail(json.user?.email ?? null);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <ProjectProvider>
      <div className="space-y-6">
        <header className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Link href="/dashboard" className="text-lg font-semibold">
                BIM Manager
              </Link>
              <ProjectSelector />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">{email ? `Connesso: ${email}` : ""}</span>
              <button
                onClick={logout}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          </div>

          <nav className="mt-4 flex flex-wrap gap-2">
            <NavLink href="/project" label="📊 Project" />
            <NavLink href="/rooms" label="📍 Rooms" />
            <NavLink href="/mappings" label="🔗 Mappings" />
            <NavLink href="/item-catalog" label="📦 Item Catalog" />
            <NavLink href="/system" label="⚙️ System" />
          </nav>
        </header>

        <div>{children}</div>
      </div>
    </ProjectProvider>
  );
}

