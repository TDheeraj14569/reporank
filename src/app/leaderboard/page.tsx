import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Trophy, Medal, ArrowLeft } from 'lucide-react';

export default async function LeaderboardPage() {
  const users = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 50,
  });

  return (
    <div className="min-h-screen bg-[#0f0f11] text-gray-300 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-[#222] pb-6">
          <Link href="/practice" className="p-2 hover:bg-[#222] rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Trophy className="text-yellow-500" /> Global Leaderboard
          </h1>
        </div>

        <div className="bg-[#1a1a1f] border border-[#333] rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#222] text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Rank</th>
                <th className="p-4 font-medium">Developer</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-[#222]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-white">
                      {index === 0 && <Medal size={20} className="text-yellow-400" />}
                      {index === 1 && <Medal size={20} className="text-gray-400" />}
                      {index === 2 && <Medal size={20} className="text-amber-600" />}
                      {index > 2 && <span className="w-5 text-center text-gray-500">#{index + 1}</span>}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-blue-400">{user.username}</td>
                  <td className="p-4 text-purple-400 text-sm">{user.rank}</td>
                  <td className="p-4 text-right font-mono font-bold text-green-400">{user.points} XP</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No developers have earned points yet. Be the first!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
