import React, { useState, useRef, useEffect } from 'react';
import { Table, Upload, Play, Shuffle, Check, FileText, Trash2, ArrowRight, Square } from 'lucide-react';
import { sampleCryptographicInt } from '../utils/quantumRng';
import { playQuantumTick, playQuantumSnap } from '../utils/audio';

interface ImportPoolScreenProps {
  audioEnabled: boolean;
}

export const ImportPoolScreen: React.FC<ImportPoolScreenProps> = ({ audioEnabled }) => {
  const [items, setItems] = useState<string[]>([
    'Alpha Photon 01',
    'Beta Waveform 02',
    'Gamma Coherence 03',
    'Delta Fluctuation 04',
    'Epsilon Lattice 05',
    'Zeta Polarization 06',
    'Eta Entanglement 07',
    'Theta Superposition 08',
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [sampleCount, setSampleCount] = useState<number>(1);
  const [withReplacement, setWithReplacement] = useState<boolean>(false);
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isRunningContinuous, setIsRunningContinuous] = useState<boolean>(false);
  const runTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (runTimerRef.current) {
        clearInterval(runTimerRef.current);
      }
    };
  }, []);

  const finalizeDraw = () => {
    const pool = [...items];
    const finalPick: string[] = [];
    for (let i = 0; i < Math.min(sampleCount, pool.length); i++) {
      const idx = sampleCryptographicInt(0, pool.length - 1);
      finalPick.push(pool[idx]);
      if (!withReplacement) {
        pool.splice(idx, 1);
      }
    }
    setSelectedWinners(finalPick);
    setIsDrawing(false);
    setIsRunningContinuous(false);
    if (audioEnabled) playQuantumSnap(600);
  };

  // Continuous run until click stop handler
  const handleToggleRunContinuous = () => {
    if (items.length === 0) return;

    if (isRunningContinuous) {
      // STOP: Halt continuous running and lock on final true quantum random choice
      if (runTimerRef.current) {
        clearInterval(runTimerRef.current);
        runTimerRef.current = null;
      }
      finalizeDraw();
    } else {
      // START: Begin continuous running until user clicks stop
      setIsRunningContinuous(true);
      setIsDrawing(true);

      if (audioEnabled) {
        playQuantumTick(880);
      }

      let step = 0;
      runTimerRef.current = setInterval(() => {
        step++;
        const tempPick: string[] = [];
        const pool = [...items];
        for (let i = 0; i < Math.min(sampleCount, pool.length); i++) {
          const idx = sampleCryptographicInt(0, pool.length - 1);
          tempPick.push(pool[idx]);
          if (!withReplacement) {
            pool.splice(idx, 1);
          }
        }
        setSelectedWinners(tempPick);

        if (audioEnabled && step % 3 === 0) {
          playQuantumTick(780 + (step % 8) * 30);
        }
      }, 40);
    }
  };

  // 1x Instant Sample Handler
  const handleInstantDraw = () => {
    if (items.length === 0 || isDrawing || isRunningContinuous) return;
    setIsDrawing(true);

    if (audioEnabled) {
      playQuantumTick(880);
    }

    let rolls = 0;
    const interval = setInterval(() => {
      rolls++;
      const tempPick: string[] = [];
      const pool = [...items];
      for (let i = 0; i < Math.min(sampleCount, pool.length); i++) {
        const idx = sampleCryptographicInt(0, pool.length - 1);
        tempPick.push(pool[idx]);
        if (!withReplacement) {
          pool.splice(idx, 1);
        }
      }
      setSelectedWinners(tempPick);

      if (audioEnabled && rolls % 2 === 0) {
        playQuantumTick(900 + rolls * 20);
      }

      if (rolls >= 10) {
        clearInterval(interval);
        finalizeDraw();
      }
    }, 40);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result as string;
      if (!text) return;

      const parsedLines = text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

      // Handle simple CSV splitting if lines contain commas
      const extracted: string[] = [];
      parsedLines.forEach(line => {
        if (line.includes(',')) {
          line.split(',').forEach(col => {
            const clean = col.replace(/^["']|["']$/g, '').trim();
            if (clean) extracted.push(clean);
          });
        } else {
          extracted.push(line);
        }
      });

      if (extracted.length > 0) {
        setItems(extracted);
      }
    };
    reader.readAsText(file);
  };

  const handleAddManual = () => {
    if (!inputText.trim()) return;
    const newItems = inputText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    setItems(prev => [...prev, ...newItems]);
    setInputText('');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Pool setup & controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-[#131b2e] border border-[#222a3d] p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="w-5 h-5 text-[#4edea3]" />
                <h2 className="font-space font-bold text-lg text-white">
                  Custom Entropy Pool (CSV / XLSX / List)
                </h2>
              </div>
              <span className="text-xs font-mono text-[#908fa0] px-2 py-0.5 rounded bg-[#0b1326] border border-[#222a3d]">
                {items.length} pool items
              </span>
            </div>

            <p className="text-xs text-[#908fa0]">
              Upload a CSV file or enter custom values (names, ticket IDs, lottery entries, hex tokens) to sample true random subsets with zero modulo bias.
            </p>

            {/* Upload or paste area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#222a3d] hover:border-[#8083ff] rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center cursor-pointer bg-[#060e20] transition-colors group"
              >
                <Upload className="w-6 h-6 text-[#908fa0] group-hover:text-[#c0c1ff] transition-colors" />
                <div className="text-xs font-medium text-white">Import .CSV / .TXT / .XLSX</div>
                <div className="text-[10px] text-[#908fa0]">Click to choose file</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv,.txt,.xlsx"
                  className="hidden"
                />
              </div>

              <div className="flex flex-col gap-2">
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Or paste list items (one per line)..."
                  rows={3}
                  className="w-full h-full p-2.5 rounded-xl bg-[#060e20] border border-[#222a3d] text-xs text-white focus:outline-none focus:border-[#8083ff] resize-none font-mono"
                />
                <button
                  onClick={handleAddManual}
                  disabled={!inputText.trim()}
                  className="py-1.5 px-3 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-xs font-medium text-white border border-[#31394d] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Add Items to Pool
                </button>
              </div>
            </div>

            {/* Sampling Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#222a3d]/70 text-xs font-mono">
              <div>
                <label className="text-[#908fa0] block mb-1">SAMPLE QUANTITY (DRAW COUNT)</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 5].map(cnt => (
                    <button
                      key={cnt}
                      onClick={() => setSampleCount(cnt)}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        sampleCount === cnt
                          ? 'bg-[#171f33] text-white border border-[#31394d] font-semibold'
                          : 'bg-[#060e20] text-[#908fa0] border border-[#222a3d]'
                      }`}
                    >
                      {cnt}x
                    </button>
                  ))}
                  <input
                    type="number"
                    min={1}
                    max={items.length || 1}
                    value={sampleCount}
                    onChange={e => setSampleCount(Math.max(1, Number(e.target.value)))}
                    className="w-14 px-2 py-1 text-center rounded-lg bg-[#060e20] border border-[#222a3d] text-white focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#908fa0] block mb-1">REPLACEMENT MODE</label>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setWithReplacement(!withReplacement)}
                    className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                      withReplacement ? 'bg-[#4edea3]' : 'bg-[#222a3d]'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                        withReplacement ? 'left-4.5' : 'left-1'
                      }`}
                    />
                  </button>
                  <span className="text-[#dae2fd]">
                    {withReplacement ? 'With Replacement' : 'Without Replacement (Unique)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Draw Button: Run Until Click Stop */}
            <button
              onClick={handleToggleRunContinuous}
              disabled={items.length === 0}
              className={`w-full py-4 rounded-xl font-space font-bold text-base tracking-wide flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl active:scale-[0.99] border select-none group disabled:opacity-50 ${
                isRunningContinuous
                  ? 'bg-gradient-to-r from-[#ff3b5c] via-[#f43f5e] to-[#e11d48] hover:from-[#ff5270] hover:to-[#f43f5e] text-white shadow-[0_0_30px_rgba(244,63,94,0.65)] border-[#ff7088]/60 animate-pulse ring-2 ring-[#ff4d6d]/40'
                  : 'bg-gradient-to-r from-[#8083ff] via-[#6e71f7] to-[#6366f1] hover:from-[#9295ff] hover:via-[#8083ff] hover:to-[#6f72f7] text-white shadow-[0_0_24px_rgba(99,102,241,0.45)] hover:shadow-[0_0_32px_rgba(128,131,255,0.65)] border-[#a5a7ff]/30'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  isRunningContinuous
                    ? 'bg-white/25 text-white scale-110 shadow-inner'
                    : 'bg-white/20 text-white group-hover:rotate-45 transition-transform duration-300'
                }`}
              >
                {isRunningContinuous ? (
                  <Square className="w-3.5 h-3.5 fill-current animate-pulse" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </div>
              <span className="tracking-wide text-sm sm:text-base font-extrabold uppercase">
                {isRunningContinuous ? 'CLICK TO STOP & LOCK WINNERS' : 'RUN UNTIL CLICK STOP (QUANTUM DRAW)'}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded border font-mono font-bold transition-all ${
                  isRunningContinuous
                    ? 'bg-black/50 border-white/40 text-white animate-pulse'
                    : 'bg-black/30 border-white/20 text-[#dae2fd]'
                }`}
              >
                {isRunningContinuous ? 'STOP' : 'RUN'}
              </span>
            </button>

            {/* Run mode status & instant draw option */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#908fa0] px-1 pt-0.5">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isRunningContinuous ? 'bg-[#ff4d6d] animate-ping' : 'bg-[#4edea3]'}`} />
                {isRunningContinuous ? 'Continuous pool scrambling active...' : 'Mode: Run until click stop'}
              </span>
              <button
                onClick={handleInstantDraw}
                disabled={items.length === 0 || isRunningContinuous}
                className="hover:text-white text-[#c0c1ff] underline underline-offset-2 transition-colors cursor-pointer disabled:opacity-40"
              >
                or 1x instant sample
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Winners & Pool Items */}
        <div className="lg:col-span-5 space-y-4">
          {/* Winners Display */}
          <div className="rounded-2xl bg-[#131b2e] border border-[#222a3d] p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#908fa0]">SELECTED SAMPLE(S)</span>
              <span className="text-xs font-mono text-[#4edea3]">ZERO-BIAS TRNG</span>
            </div>

            {selectedWinners.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#908fa0] border border-dashed border-[#222a3d] rounded-xl font-mono">
                Click "Sample From Pool" to draw quantum entries
              </div>
            ) : (
              <div className="space-y-2">
                {selectedWinners.map((winner, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#060e20] border border-[#4edea3]/40 flex items-center justify-between glow-secondary"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#171f33] border border-[#31394d] text-[11px] font-mono font-bold text-[#4edea3] flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="font-space font-bold text-white text-base">
                        {winner}
                      </span>
                    </div>
                    <Check className="w-4 h-4 text-[#4edea3]" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Pool List */}
          <div className="rounded-2xl bg-[#131b2e] border border-[#222a3d] p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#908fa0]">ACTIVE POOL ITEMS</span>
              <button
                onClick={() => setItems([])}
                className="text-xs text-[#ffb4ab] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs font-mono text-[#dae2fd] flex items-center justify-between group"
                >
                  <span className="truncate">{item}</span>
                  <button
                    onClick={() => setItems(items.filter((_, i) => i !== idx))}
                    className="opacity-0 group-hover:opacity-100 text-[#ffb4ab] hover:text-red-400 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
