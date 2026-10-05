/* eslint-disable */
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search, Bell, Sun, Moon, User, Menu, X, Code2, GitBranch,
  Trophy, ChevronDown, Settings, LogOut, Bookmark, BarChart3, Layout,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/practice", label: "Practice", icon: Code2 },
  { href: "/practice/repository", label: "Repositories", icon: GitBranch },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isWorkspace = pathname?.includes("/practice/repository/") && pathname?.split("/").length > 3;
  if (isWorkspace) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#0A0A0A]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0A0A0A]/60 text-white">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors hidden sm:block">RepoRank</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-100 hover:bg-white/[0.05]"
                )}
              >
                <link.icon className={cn("h-4 w-4", isActive ? "text-blue-400" : "")} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex-1" />

        {/* Search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-sm text-gray-400 hover:bg-white/[0.05] hover:text-white hover:border-white/[0.2] transition-all hidden sm:flex"
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-4 flex items-center gap-1 rounded bg-white/[0.1] px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-300">
            <Command className="w-3 h-3"/> K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </button>

        {/* User Avatar / Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 text-white text-sm font-bold shadow-lg">
              D
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 hidden sm:block" />
          </button>
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-gray-800 bg-[#111] text-white shadow-2xl animate-fade-in">
                <div className="p-4 border-b border-gray-800">
                  <p className="text-sm font-medium">Demo Developer</p>
                  <p className="text-xs text-gray-500 mt-1">demo@reporank.dev</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link href="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors">
                    <Layout className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link href="/bookmarks" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors">
                    <Bookmark className="h-4 w-4" /> Bookmarks
                  </Link>
                  <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                </div>
                <div className="p-2 border-t border-gray-800">
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#0A0A0A] animate-fade-in">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  <link.icon className={cn("h-4 w-4", isActive ? "text-blue-400" : "")} />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-slide-up">
            <div className="rounded-2xl border border-gray-800 bg-[#111] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 border-b border-gray-800 px-5 py-4">
                <Search className="h-5 w-5 text-gray-500" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search challenges, technologies, skills..."
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-500"
                />
                <kbd className="rounded bg-white/[0.1] px-2 py-1 text-[10px] font-mono text-gray-400">
                  ESC
                </kbd>
              </div>
              <div className="p-8 text-center text-sm text-gray-500">
                Start typing to search...
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
