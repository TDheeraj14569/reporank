import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Trophy, Code2, Clock } from 'lucide-react';

export default async function DashboardPage() {
  // Hardcoded guest user for now
  const userId = "guest-user";
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      submissions: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f11] text-gray-300 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to RepoRank!</h1>
          <p className="mb-6">Solve your first challenge to initialize your profile.</p>
          <Link href="/practice" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Practice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-gray-300 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-[#222] pb-6">
          <Link href="/practice" className="p-2 hover:bg-[#222] rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats Card */}
          <div className="bg-[#1a1a1f] border border-[#333] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" /> Player Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                <span className="text-gray-400">Username</span>
                <span className="font-medium text-white">{user.username}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                <span className="text-gray-400">Total Points</span>
                <span className="font-bold text-green-400">{user.points} XP</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                <span className="text-gray-400">Current Rank</span>
                <span className="font-medium text-purple-400">{user.rank}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Challenges Solved</span>
                <span className="font-medium text-white">
                  {user.submissions.filter(s => s.status === 'PASSED').length}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="bg-[#1a1a1f] border border-[#333] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code2 size={18} className="text-blue-500" /> Recent Submissions
            </h2>
            {user.submissions.length === 0 ? (
              <p className="text-gray-500 text-sm">No submissions yet.</p>
            ) : (
              <div className="space-y-3">
                {user.submissions.map(sub => (
                  <div key={sub.id} className="flex justify-between items-center p-3 bg-[#111] rounded border border-[#222]">
                    <div>
                      <div className="text-sm font-medium text-gray-200">{sub.challengeSlug}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock size={12} /> {sub.executionTimeMs}ms execution
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${sub.status === 'PASSED' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
