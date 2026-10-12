import React, { useState } from 'react';
import { PKG_COMPONENTS } from '../data/pkgStructure';
import { FullEvaluationResult } from '../types/pkg';
import { calculateComponentScore } from '../utils/calculations';
import { Sparkles, CheckCheck, RefreshCw, Zap, HelpCircle } from 'lucide-react';

interface ScoringViewProps {
  scores: Record<string, number>;
  evaluation: FullEvaluationResult;
  onUpdateScore: (code: string, value: number) => void;
  onBatchSetScores: (newScores: Record<string, number>) => void;
}

export const ScoringView: React.FC<ScoringViewProps> = ({
  scores,
  evaluation,
  onUpdateScore,
  onBatchSetScores
}) => {
  const [activeCompetency, setActiveCompetency] = useState<number>(0); // 0 = Semua

  // 1-Click Auto Fill
  const handleAutoFillMax = () => {
    const updated: Record<string, number> = {};
    PKG_COMPONENTS.forEach((comp) => {
      comp.indicators.forEach((ind) => {
        updated[ind.code] = 2;
      });
    });
    onBatchSetScores(updated);
  };

  const handleAutoFillBaik = () => {
    // Generates a realistic high "Baik" score (~85-88%)
    const updated: Record<string, number> = {};
    PKG_COMPONENTS.forEach((comp) => {
      comp.indicators.forEach((ind, index) => {
        // give most 2, but a few 1
        updated[ind.code] = index % 4 === 1 ? 1 : 2;
      });
    });
    onBatchSetScores(updated);
  };

  const handleAutoFillCukup = () => {
    const updated: Record<string, number> = {};
    PKG_COMPONENTS.forEach((comp) => {
      comp.indicators.forEach((ind, index) => {
        updated[ind.code] = index % 2 === 0 ? 1 : 2;
      });
    });
    onBatchSetScores(updated);
  };

  const handleResetScores = () => {
    const updated: Record<string, number> = {};
    PKG_COMPONENTS.forEach((comp) => {
      comp.indicators.forEach((ind) => {
        updated[ind.code] = 0;
      });
    });
    onBatchSetScores(updated);
  };

  const handleSetComponentScores = (componentId: number, val: number) => {
    const comp = PKG_COMPONENTS.find((c) => c.id === componentId);
    if (!comp) return;
    const updated = { ...scores };
    comp.indicators.forEach((ind) => {
      updated[ind.code] = val;
    });
    onBatchSetScores(updated);
  };

  const filteredComponents = activeCompetency === 0
    ? PKG_COMPONENTS
    : PKG_COMPONENTS.filter((c) => c.competencyId === activeCompetency);

  return (
    <div className="space-y-6">
      {/* Auto-Fill Action Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-semibold text-slate-900">
                Otomatisasi Penilaian Kinerja Guru (79 Indikator)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik salah satu tombol di bawah untuk mengisi seluruh 79 indikator secara instan, atau sesuaikan per indikator.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoFillMax}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Zap className="w-4 h-4" />
              Otomatis Nilai Maksimal (Amat Baik 100%)
            </button>

            <button
              onClick={handleAutoFillBaik}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Otomatis Nilai Baik (~88%)
            </button>

            <button
              onClick={handleAutoFillCukup}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              Nilai Cukup (~70%)
            </button>

            <button
              onClick={handleResetScores}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-medium transition-colors"
              title="Kosongkan semua nilai"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset (0)
            </button>
          </div>
        </div>

        {/* Live Score Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Total Nilai PKG</span>
            <div className="text-xl font-bold text-slate-800">
              {evaluation.totalComponentScore} <span className="text-xs font-normal text-slate-500">/ 60</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Nilai Skala 100</span>
            <div className="text-xl font-bold text-emerald-700 tabular-nums">
              {evaluation.scale100Score}%
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Sebutan Kinerja & NPK</span>
            <div className="text-base font-bold text-slate-900 truncate">
              {evaluation.predicate} <span className="text-xs font-semibold text-emerald-600">({evaluation.npkPercent}%)</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Estimasi Angka Kredit/Tahun</span>
            <div className="text-xl font-bold text-blue-700 tabular-nums">
              {evaluation.annualCreditScore}
            </div>
          </div>
        </div>
      </div>

      {/* Competency Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-500 shrink-0">Filter Kompetensi:</span>
        {[
          { id: 0, label: 'Semua (15 Komponen)' },
          { id: 1, label: '1. Pedagogik (1-8)' },
          { id: 2, label: '2. Kepribadian (9-11)' },
          { id: 3, label: '3. Profesional (12-13)' },
          { id: 4, label: '4. Sosial (14-15)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCompetency(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCompetency === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Guide Legend */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
        <HelpCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
        <div>
          <span className="font-semibold">Pedoman Penskoran Resmi Kepdirjen Pendis 1843/2021:</span>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-slate-700">
            <span><strong>0</strong> = Tidak ada bukti (tidak terpenuhi)</span>
            <span><strong>1</strong> = Terpenuhi sebagian</span>
            <span><strong>2</strong> = Terpenuhi seluruhnya</span>
            <span>Skor Maks = Jumlah Indikator × 2 | Konversi Komponen: &gt;75% = 4; &gt;50% = 3; &gt;25% = 2; &le;25% = 1</span>
          </div>
        </div>
      </div>

      {/* Components Accordions / Cards */}
      <div className="space-y-6">
        {filteredComponents.map((comp) => {
          const compCalc = calculateComponentScore(comp.id, scores);
          return (
            <div
              key={comp.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs"
            >
              {/* Component Header */}
              <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start md:items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {comp.id}
                  </span>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">
                      Kompetensi {comp.competencyId}: {comp.competencyTitle}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                      Komponen {comp.id}: {comp.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                  {/* Quick Component Buttons */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-slate-400 mr-1 hidden sm:inline">Set Komponen:</span>
                    <button
                      onClick={() => handleSetComponentScores(comp.id, 2)}
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded font-medium"
                      title="Semua indikator bernilai 2"
                    >
                      Semua 2
                    </button>
                    <button
                      onClick={() => handleSetComponentScores(comp.id, 1)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded font-medium"
                      title="Semua indikator bernilai 1"
                    >
                      Semua 1
                    </button>
                    <button
                      onClick={() => handleSetComponentScores(comp.id, 0)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200 rounded font-medium"
                      title="Semua indikator bernilai 0"
                    >
                      Reset 0
                    </button>
                  </div>

                  {/* Component Calculated Badge */}
                  <div className="text-right pl-3 border-l border-slate-200">
                    <div className="text-xs text-slate-500">
                      Skor: <span className="font-bold text-slate-800">{compCalc.totalScore}</span> / {compCalc.maxScore} ({compCalc.percentage}%)
                    </div>
                    <div className="text-xs font-semibold text-emerald-700">
                      Nilai Komponen: <span className="text-sm font-bold">{compCalc.componentValue}</span> / 4
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicators Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-semibold">
                      <th className="py-2.5 px-3 w-12 text-center">No</th>
                      <th className="py-2.5 px-4">Indikator Kinerja</th>
                      <th className="py-2.5 px-4 w-72">Bukti Kinerja (Dokumen / Pengamatan)</th>
                      <th className="py-2.5 px-4 w-44 text-center">Nilai Kinerja</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comp.indicators.map((ind, idx) => {
                      const currentVal = scores[ind.code] ?? 0;
                      return (
                        <tr
                          key={ind.code}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            currentVal === 2 ? 'bg-emerald-50/20' : ''
                          }`}
                        >
                          <td className="py-3 px-3 text-center text-slate-500 font-medium align-top">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-4 text-slate-800 align-top leading-relaxed">
                            {ind.text}
                          </td>
                          <td className="py-3 px-4 text-slate-600 align-top">
                            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                              {ind.evidence.map((ev, eIdx) => (
                                <li key={eIdx}>{ev}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-3 px-4 align-top text-center">
                            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                              {[0, 1, 2].map((v) => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => onUpdateScore(ind.code, v)}
                                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                                    currentVal === v
                                      ? v === 2
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : v === 1
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-slate-600 text-white shadow-xs'
                                      : 'text-slate-600 hover:bg-slate-200/60'
                                  }`}
                                  title={
                                    v === 0
                                      ? 'Tidak ada bukti'
                                      : v === 1
                                      ? 'Terpenuhi sebagian'
                                      : 'Terpenuhi seluruhnya'
                                  }
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {currentVal === 2
                                ? 'Terpenuhi seluruhnya'
                                : currentVal === 1
                                ? 'Terpenuhi sebagian'
                                : 'Tidak ada bukti'}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
