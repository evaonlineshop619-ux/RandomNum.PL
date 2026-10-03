import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  GitBranch,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Download,
  FolderGit2
} from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState<string>('evaonlineshop619');
  const [repoName, setRepoName] = useState<string>('quantum-rng-telemetry');
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const repoUrl = `https://github.com/${username || 'username'}/${repoName || 'quantum-rng-telemetry'}`;
  const gitCloneCmd = `git clone ${repoUrl}.git`;

  const pushCommands = [
    'git init',
    'git branch -M main',
    'git add .',
    'git commit -m "feat: Quantum RNG & Telemetry v2.4 - True Random Number Generator"',
    `git remote add origin ${repoUrl}.git`,
    'git push -u origin main',
  ].join('\n');

  const ghCliCommand = `gh repo create ${repoName} ${isPublic ? '--public' : '--private'} --source=. --remote=origin --push`;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e172a] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#222a3d] bg-[#0b1326]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#171f33] border border-[#31394d] flex items-center justify-center text-white">
              {/* GitHub SVG icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-space font-bold text-base text-white flex items-center gap-2">
                Publish & Sync to GitHub
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30">
                  PUBLIC REPO READY
                </span>
              </h2>
              <p className="text-xs text-[#908fa0] font-mono">
                Open source telemetry code with NIST SP 800-90B verification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#171f33] hover:bg-[#222a3d] border border-[#31394d] flex items-center justify-center text-[#908fa0] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Repository Target Configuration */}
          <div className="rounded-xl bg-[#060e20] border border-[#222a3d] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#c0c1ff]">
              <span className="flex items-center gap-1.5 font-bold">
                <FolderGit2 className="w-3.5 h-3.5 text-[#8083ff]" />
                REPOSITORY TARGET CONFIGURATION
              </span>
              <span className="text-[#908fa0] text-[11px]">Git branch: main</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#908fa0]">GitHub Username / Organization</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your-github-username"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#222a3d] focus:border-[#8083ff] text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#908fa0]">Repository Name</label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="quantum-rng-telemetry"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#222a3d] focus:border-[#8083ff] text-white font-mono text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-1 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#908fa0]">Visibility:</span>
                <button
                  onClick={() => setIsPublic(true)}
                  className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                    isPublic
                      ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40 font-bold'
                      : 'bg-[#131b2e] text-[#908fa0]'
                  }`}
                >
                  Public (Recommended)
                </button>
                <button
                  onClick={() => setIsPublic(false)}
                  className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                    !isPublic
                      ? 'bg-[#8083ff]/20 text-[#c0c1ff] border border-[#8083ff]/40 font-bold'
                      : 'bg-[#131b2e] text-[#908fa0]'
                  }`}
                >
                  Private
                </button>
              </div>

              <a
                href={`https://github.com/new?name=${encodeURIComponent(repoName)}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#8083ff] hover:text-[#c0c1ff] flex items-center gap-1 hover:underline text-xs"
              >
                Create repo on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Push Commands Block */}
          <div className="rounded-xl bg-[#060e20] border border-[#222a3d] p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                <Terminal className="w-3.5 h-3.5 text-[#4edea3]" />
                <span className="font-semibold">Terminal Commands to Push to GitHub</span>
              </div>
              <button
                onClick={() => handleCopy(pushCommands, 1)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171f33] hover:bg-[#222a3d] border border-[#31394d] text-xs font-mono text-[#dae2fd] hover:text-white transition-all cursor-pointer"
              >
                {copiedIndex === 1 ? <Check className="w-3 h-3 text-[#4edea3]" /> : <Copy className="w-3 h-3 text-[#908fa0]" />}
                <span>{copiedIndex === 1 ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-lg bg-[#030712] border border-[#222a3d] text-xs font-mono text-[#4edea3] overflow-x-auto leading-relaxed select-all">
              {pushCommands}
            </pre>
          </div>

          {/* Option 2: GitHub CLI Command */}
          <div className="rounded-xl bg-[#060e20] border border-[#222a3d] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#dae2fd] flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-[#c0c1ff]" />
                Or 1-Line with GitHub CLI (`gh`):
              </span>
              <button
                onClick={() => handleCopy(ghCliCommand, 2)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#171f33] hover:bg-[#222a3d] border border-[#31394d] text-xs font-mono text-[#dae2fd] hover:text-white transition-all cursor-pointer"
              >
                {copiedIndex === 2 ? <Check className="w-3 h-3 text-[#4edea3]" /> : <Copy className="w-3 h-3 text-[#908fa0]" />}
                <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded-lg bg-[#030712] border border-[#222a3d] text-xs font-mono text-[#c0c1ff] overflow-x-auto select-all">
              {ghCliCommand}
            </pre>
          </div>

          {/* Included Open Source Assets */}
          <div className="rounded-xl bg-[#060e20] border border-[#222a3d] p-3 text-xs font-mono space-y-2">
            <span className="text-[#908fa0] text-[11px] font-semibold uppercase tracking-wider block">
              Included Files for GitHub Publication:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded bg-[#131b2e] border border-[#222a3d] text-[#dae2fd]">
                <span className="text-[#4edea3] block font-bold">README.md</span>
                <span className="text-[10px] text-[#908fa0]">Full documentation</span>
              </div>
              <div className="p-2 rounded bg-[#131b2e] border border-[#222a3d] text-[#dae2fd]">
                <span className="text-[#8083ff] block font-bold">LICENSE</span>
                <span className="text-[10px] text-[#908fa0]">Apache 2.0 Open Source</span>
              </div>
              <div className="p-2 rounded bg-[#131b2e] border border-[#222a3d] text-[#dae2fd]">
                <span className="text-[#c0c1ff] block font-bold">.gitignore</span>
                <span className="text-[10px] text-[#908fa0]">Node & Vite clean</span>
              </div>
              <div className="p-2 rounded bg-[#131b2e] border border-[#222a3d] text-[#dae2fd]">
                <span className="text-[#ffb4ab] block font-bold">.env.example</span>
                <span className="text-[10px] text-[#908fa0]">Zero secret leaks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#222a3d] bg-[#0b1326] text-xs font-mono">
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#dae2fd] hover:text-white transition-colors"
          >
            <span>Target:</span>
            <span className="text-[#4edea3] underline underline-offset-2">{repoUrl}</span>
            <ExternalLink className="w-3 h-3 text-[#908fa0]" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#171f33] hover:bg-[#222a3d] border border-[#31394d] text-white transition-all cursor-pointer font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
