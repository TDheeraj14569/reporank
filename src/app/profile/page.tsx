/* eslint-disable */
"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { useProgressStore } from "@/lib/stores/progress-store";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Globe,
  Award,
  Code2,
  GitBranch,
  Bug,
  Zap,
  Clock,
  Trophy,
  BarChart3,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { getStats } = useProgressStore();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Profile Header */}
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-2xl font-bold shrink-0">
              DD
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Demo Developer</h1>
                <Link
                  href="/settings"
                  className="flex items-center gap-1 rounded-md border border-[hsl(var(--border))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
                >
                  <Edit3 className="h-3 w-3" />
                  Edit Profile
                </Link>
              </div>
              <p className="mt-1 text-[hsl(var(--muted-foreground))]">
                Software Engineer · Practicing for backend interviews
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-[hsl(var(--muted-foreground))]">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> demo@reporank.dev
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Joined October 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: "Challenges Solved",
              value: stats.totalSolved,
              icon: Trophy,
              color: "text-yellow-500",
            },
            {
              label: "Repository Challenges",
              value: stats.repositorySolved,
              icon: GitBranch,
              color: "text-blue-500",
            },
            {
              label: "Current Streak",
              value: `${stats.currentStreak} days`,
              icon: Zap,
              color: "text-orange-500",
            },
            {
              label: "Success Rate",
              value: `${stats.successPercentage}%`,
              icon: BarChart3,
              color: "text-green-500",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
            >
              <div className="flex items-center gap-2">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                  {stat.label}
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <h2 className="text-lg font-semibold mb-4">Skill Breakdown</h2>
          <div className="space-y-3">
            {stats.skillBreakdown.map((skill) => {
              const pct = skill.total > 0 ? Math.round((skill.solved / skill.total) * 100) : 0;
              return (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{skill.skill}</span>
                    <span className="text-[hsl(var(--muted-foreground))]">
                      {skill.solved}/{skill.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[hsl(var(--muted))]">
                    <div
                      className="h-full rounded-full bg-[hsl(var(--primary))] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">
            <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Start solving challenges to see your activity here.</p>
            <Link
              href="/practice"
              className="mt-3 inline-flex items-center gap-1 text-sm text-[hsl(var(--primary))] hover:underline"
            >
              Go to Practice →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
