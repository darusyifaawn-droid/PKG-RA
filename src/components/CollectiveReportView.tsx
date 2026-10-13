import React from 'react';
import { TeacherRecord } from '../types/pkg';
import { evaluatePKG } from '../utils/calculations';
import { KopSurat } from './KopSurat';
import { KemenagLogo } from './KemenagLogo';
import {
  FileSpreadsheet,
  Users,
  Download,
  Printer,
  School,
  FileText,
  FileCheck,
  Pencil,
  Trash2,
  Info
} from 'lucide-react';

interface CollectiveReportViewProps {
  records: TeacherRecord[];
  activeRecord: TeacherRecord;
  onSelectTeacher: (id: string) => void;
  onOpenTeacherModal: () => void;
  onEditTeacher?: (id: string) => void;
  onDeleteTeacher?: (id: string) => void;
}

export const CollectiveReportView: React.FC<CollectiveReportViewProps> = ({
  records,
  activeRecord,
  onSelectTeacher,
  onOpenTeacherModal,
  onEditTeacher,
  onDeleteTeacher
}) => {
  const { teacher, metadata } = activeRecord;

  const handlePrint = () => {
    try {
      window.focus();
      setTimeout(() => {
        window.print();
      }, 150);
    } catch (err) {
      console.error(err);
      alert('Gunakan kombinasi tombol Ctrl + P pada keyboard untuk mencetak.');
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'No',
      'Nama Guru',
      'NIP',
      'Golongan',
      'NUPTK/PegID',
      'Mapel Diampu',
      'Tugas Tambahan',
      'Jumlah Total Jam',
      'Nilai PKG',
      'Konversi Nilai PKG',
      'Kategori',
      'Angka Kredit'
    ];

    const rows = records.map((rec, idx) => {
      const ev = evaluatePKG(rec.scores, rec.creditParams);
      return [
        idx + 1,
        `"${rec.teacher.name || '-'}"`,
        `"${rec.teacher.nip || '-'}"`,
        `"${rec.teacher.rankGrade || '-'}"`,
        `"${rec.teacher.nuptk || '-'}"`,
        `"${rec.teacher.teachingAssignment || '-'}"`,
        `"${rec.teacher.additionalDuty || '-'}"`,
        rec.creditParams.jm,
        ev.totalComponentScore,
        ev.scale100Score,
        `"${ev.predicate}"`,
        ev.annualCreditScore
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const safeSchool = (teacher.schoolName || 'RA').replace(/\s+/g, '_');
    link.setAttribute('download', `Laporan_Hasil_Nilai_PKG_${safeSchool}_${metadata.year || '2026'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (id: string) => {
    if (onEditTeacher) {
      onEditTeacher(id);
    } else {
      onSelectTeacher(id);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (records.length <= 1) {
      alert('Minimal harus ada 1 guru dalam daftar.');
      return;
    }
    if (window.confirm(`Yakin ingin menghapus data guru "${name || 'Guru'}"?`)) {
      onDeleteTeacher?.(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* TAMPILAN DASHBOARD (LAYAR MONITOR - PERSIS GAMBAR USER)   */}
      {/* ======================================================== */}
      <div className="no-print bg-white border border-slate-200/90 rounded-2xl shadow-xs p-6 sm:p-7">
        
        {/* 1. Card Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 p-1 flex items-center justify-center shrink-0 shadow-xs">
              <KemenagLogo size={40} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                Laporan Hasil Nilai PKG Kolektif (Semua Guru RA)
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Format resmi sesuai blanko madrasah/RA lengkap dengan Kop Surat, NSM, NPSN, dan rekap seluruh guru.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenTeacherModal}
              className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500 hover:border-emerald-600 bg-white hover:bg-emerald-50/50 text-emerald-800 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Kelola / Tambah Guru ({records.length})</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500 hover:border-emerald-600 bg-white hover:bg-emerald-50/50 text-emerald-800 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Ekspor Excel (CSV)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Laporan Hasil Nilai PKG</span>
            </button>
          </div>
        </div>

        {/* 2. Sub-Card / School Info Banner (Light Mint) */}
        <div className="mt-6 bg-[#f0fdf9] border border-emerald-200/80 rounded-2xl p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            {/* Nama Madrasah/RA */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                <School className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">
                  Nama Madrasah/RA
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 truncate block">
                  {teacher.schoolName || 'RA Darusyifa Arjawinangun'}
                </span>
              </div>
            </div>

            {/* NSM */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">
                  NSM
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-wide truncate block">
                  {teacher.nsm || '101232450001'}
                </span>
              </div>
            </div>

            {/* NPSN */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">
                  NPSN
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-wide truncate block">
                  {teacher.npsn || '60716062'}
                </span>
              </div>
            </div>

            {/* Jumlah Guru */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">
                  Jumlah Guru
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 truncate block">
                  {records.length} Guru
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Table Guru */}
        <div className="mt-6 border border-slate-200 rounded-2xl overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th scope="col" className="w-16 py-3.5 px-4 text-center">
                    No
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Nama Guru
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    NIP
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Status Kepegawaian
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Jenis Kelamin
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Mapel / Tugas Tambahan
                  </th>
                  <th scope="col" className="w-48 py-3.5 px-4 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec, idx) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-4 px-4 text-center font-medium text-slate-700">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 text-sm block">
                        {rec.teacher.name || 'Siti Aminah, S.Pd.I'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {rec.teacher.nip || '-'}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        {rec.teacher.rankGrade?.includes('Yayasan') || rec.teacher.rankGrade === 'Guru Tetap'
                          ? 'Guru Tetap'
                          : rec.teacher.rankGrade || 'Guru Tetap'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {rec.teacher.gender || 'Perempuan'}
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {rec.teacher.teachingAssignment || rec.teacher.additionalDuty || 'Guru Kelas'}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(rec.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-emerald-500 hover:border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(rec.id, rec.teacher.name)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rose-300 hover:border-rose-400 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Bottom Info Note */}
        <div className="mt-4 px-1 flex items-center gap-2 text-xs text-slate-500">
          <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            i
          </div>
          <span>
            Data di atas merupakan rekap seluruh guru yang terdaftar pada PKG Guru RA.
          </span>
        </div>

      </div>

      {/* ======================================================== */}
      {/* TAMPILAN BERKAS CETAK RESMI (HANYA MUNCUL SAAT DI-PRINT)  */}
      {/* ======================================================== */}
      <div className="hidden print:block print-sheets">
        <div className="sheet-page bg-white text-black p-8 border-none mx-auto w-[297mm] min-h-[210mm] font-sans text-xs">
          {/* Kop Surat */}
          <KopSurat teacher={teacher} logoSize={80} />

          {/* Judul Laporan */}
          <div className="text-center my-4">
            <h2 className="text-base font-bold uppercase tracking-wide">
              LAPORAN HASIL NILAI PKG
            </h2>
            <h3 className="text-sm font-bold uppercase tracking-wide">
              TAHUN {metadata.year || '2026'}
            </h3>
          </div>

          {/* Info Madrasah */}
          <div className="text-xs mb-4 max-w-xl">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="w-36 py-0.5 font-medium">Nama Madrasah / RA</td>
                  <td className="w-3 py-0.5">:</td>
                  <td className="py-0.5 font-bold uppercase">{teacher.schoolName || 'RA DARUSYIFA ARJAWINANGUN'}</td>
                </tr>
                <tr>
                  <td className="py-0.5 font-medium">N S M</td>
                  <td className="py-0.5">:</td>
                  <td className="py-0.5">{teacher.nsm || '101232450001'}</td>
                </tr>
                <tr>
                  <td className="py-0.5 font-medium">N P S N</td>
                  <td className="py-0.5">:</td>
                  <td className="py-0.5">{teacher.npsn || '60716062'}</td>
                </tr>
                <tr>
                  <td className="py-0.5 font-medium">Alamat</td>
                  <td className="py-0.5">:</td>
                  <td className="py-0.5">{teacher.schoolAddress || 'Jl. Raya Arjawinangun No. 12'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tabel Lengkap Kolektif dengan Nilai & Angka Kredit */}
          <table className="w-full border-collapse border border-black text-[11px] mb-8">
            <thead>
              <tr className="bg-slate-100 text-center font-bold">
                <th className="border border-black p-2 w-8">No</th>
                <th className="border border-black p-2">Nama Guru / NIP</th>
                <th className="border border-black p-2 w-20">Gol.</th>
                <th className="border border-black p-2 w-28">NUPTK/PegID</th>
                <th className="border border-black p-2">Mapel Diampu</th>
                <th className="border border-black p-2">Tugas Tambahan</th>
                <th className="border border-black p-2 w-12">JM</th>
                <th className="border border-black p-2 w-16">Nilai PKG</th>
                <th className="border border-black p-2 w-16">Konversi Skala 100</th>
                <th className="border border-black p-2 w-20">Kategori</th>
                <th className="border border-black p-2 w-20">Angka Kredit 1 Th</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, idx) => {
                const ev = evaluatePKG(rec.scores, rec.creditParams);
                return (
                  <tr key={rec.id} className="text-center">
                    <td className="border border-black p-2">{idx + 1}</td>
                    <td className="border border-black p-2 text-left">
                      <div className="font-bold">{rec.teacher.name || '-'}</div>
                      <div className="text-[10px] text-slate-600">NIP: {rec.teacher.nip || '-'}</div>
                    </td>
                    <td className="border border-black p-2">{rec.teacher.rankGrade || '-'}</td>
                    <td className="border border-black p-2">{rec.teacher.nuptk || '-'}</td>
                    <td className="border border-black p-2 text-left">{rec.teacher.teachingAssignment || 'Guru Kelas RA'}</td>
                    <td className="border border-black p-2">{rec.teacher.additionalDuty || '-'}</td>
                    <td className="border border-black p-2 font-semibold">{rec.creditParams.jm}</td>
                    <td className="border border-black p-2 font-bold">{ev.totalComponentScore}</td>
                    <td className="border border-black p-2 font-bold">{ev.scale100Score}</td>
                    <td className="border border-black p-2 font-semibold">{ev.predicate}</td>
                    <td className="border border-black p-2 font-bold text-emerald-900">{ev.annualCreditScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Tanda Tangan */}
          <div className="flex justify-between text-xs px-10 pt-6">
            <div className="text-center w-64">
              <div>Mengetahui,</div>
              <div className="font-medium">Supervisor / Pengawas Pembina</div>
              <div className="h-20"></div>
              <div className="font-bold underline">{metadata.supervisorName || '( . . . . . . . . . . . . . . . . . . )'}</div>
              <div>NIP. {metadata.supervisorNip || '( . . . . . . . . . . . . . . . . . . )'}</div>
            </div>

            <div className="text-center w-64">
              <div>{teacher.schoolCity || 'Cirebon'}, {metadata.cityDate || '31 Desember 2026'}</div>
              <div className="font-medium">Kepala Madrasah / RA</div>
              <div className="h-20"></div>
              <div className="font-bold underline">{metadata.headmasterName || '( . . . . . . . . . . . . . . . . . . )'}</div>
              <div>NIP. {metadata.headmasterNip || '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
