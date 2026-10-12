import React, { useState } from 'react';
import { TeacherRecord, FullEvaluationResult } from '../types/pkg';
import { PKG_COMPONENTS, LEGAL_FOUNDATIONS } from '../data/pkgStructure';
import { KemenagLogo } from './KemenagLogo';
import { Printer, Eye, Layers } from 'lucide-react';

interface PrintDocumentProps {
  record: TeacherRecord;
  evaluation: FullEvaluationResult;
}

type PrintSection = 'all' | 'summary' | 'cover' | 'instruments';

export const PrintDocument: React.FC<PrintDocumentProps> = ({
  record,
  evaluation
}) => {
  const [activePrintSection, setActivePrintSection] = useState<PrintSection>('all');
  const { teacher, metadata, creditParams, scores } = record;

  const handlePrint = () => {
    window.print();
  };

  // Group components for instruments layout matching pages 4-13
  // Page 4: Komponen 1 & Komponen 2 (part 1)
  // Or render grouped by component cleanly with proper page breaks!

  return (
    <div className="space-y-6">
      {/* Floating / Top Print Control Bar (Hidden on print) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 shadow-sm sticky top-4 z-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Pilihan Cetak Dokumen Resmi PKG RA
              </h2>
              <p className="text-xs text-slate-500">
                Format standar Kepdirjen Pendis No. 1843 Tahun 2021 (Kertas A4 Potret)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setActivePrintSection('all')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activePrintSection === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Berkas (16 Hal)
              </button>
              <button
                type="button"
                onClick={() => setActivePrintSection('summary')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activePrintSection === 'summary'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rekap & Angka Kredit Saja
              </button>
              <button
                type="button"
                onClick={() => setActivePrintSection('cover')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activePrintSection === 'cover'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cover & Persetujuan
              </button>
              <button
                type="button"
                onClick={() => setActivePrintSection('instruments')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activePrintSection === 'instruments'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Instrumen 1-15 Saja
              </button>
            </div>

            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF
            </button>
          </div>
        </div>
      </div>

      {/* Printable Paper Container */}
      <div className="print-container bg-slate-200/60 p-4 md:p-8 rounded-2xl overflow-x-auto flex justify-center">
        <div className="print-sheets flex flex-col gap-8 w-full max-w-[210mm]">

          {/* ======================================================== */}
          {/* HALAMAN 1: COVER                                         */}
          {/* ======================================================== */}
          {(activePrintSection === 'all' || activePrintSection === 'cover') && (
            <div className="sheet-page bg-white text-black p-[15mm] border border-slate-300 shadow-md relative mx-auto w-[210mm] min-h-[297mm] flex flex-col justify-between font-serif">
              {/* Outer double border typical of official cover */}
              <div className="absolute inset-[10mm] border-[3px] border-emerald-700 pointer-events-none">
                <div className="absolute inset-[3px] border border-emerald-700"></div>
              </div>

              {/* Header Cover */}
              <div className="text-center pt-8 z-10">
                <h1 className="text-xl font-bold tracking-wide uppercase leading-tight font-sans">
                  Laporan Hasil Penilaian Kinerja Guru (PKG)
                </h1>
                <h2 className="text-lg font-bold tracking-wide uppercase font-sans mt-1">
                  (Guru Raudhatul Athfal)
                </h2>
                <h3 className="text-sm font-semibold tracking-wide uppercase font-sans mt-0.5 text-slate-800">
                  (Kepdirjen Pendis No. 1843 Tahun 2021)
                </h3>
                <div className="text-sm font-medium mt-4 font-sans text-slate-700">
                  Periode Penilaian : {metadata.period}
                </div>
              </div>

              {/* Logo Kemenag / Logo Sekolah */}
              <div className="flex justify-center my-6 z-10">
                {teacher.schoolLogoUrl && teacher.schoolLogoUrl.startsWith('data:image') ? (
                  <img
                    src={teacher.schoolLogoUrl}
                    alt="Logo Sekolah / RA"
                    className="max-h-[190px] max-w-[190px] object-contain"
                  />
                ) : (
                  <KemenagLogo size={190} />
                )}
              </div>

              {/* Identitas Guru di Cover */}
              <div className="px-12 z-10 text-sm font-sans">
                <table className="w-full text-left border-none">
                  <tbody className="space-y-1">
                    <tr>
                      <td className="w-44 py-1">N a m a</td>
                      <td className="w-4 py-1">:</td>
                      <td className="py-1 font-bold">{teacher.name || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1">N I P</td>
                      <td className="py-1">:</td>
                      <td className="py-1">{teacher.nip || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1">NUPTK/PegID</td>
                      <td className="py-1">:</td>
                      <td className="py-1">{teacher.nuptk || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Pangkat/Gol. Ruang</td>
                      <td className="py-1">:</td>
                      <td className="py-1">{teacher.rankGrade || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Jabatan</td>
                      <td className="py-1">:</td>
                      <td className="py-1">{teacher.position || 'Guru Pertama'}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Jenis Guru</td>
                      <td className="py-1">:</td>
                      <td className="py-1">{teacher.teacherType || 'Guru Kelas'}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Mengajar</td>
                      <td className="py-1">:</td>
                      <td className="py-1">{teacher.teachingAssignment || 'Guru Kelas RA'}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Tempat Tugas</td>
                      <td className="py-1">:</td>
                      <td className="py-1 font-semibold">
                        {teacher.schoolName || '-'}
                        {teacher.nsm ? ` (NSM: ${teacher.nsm})` : ''}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">Unit Kerja</td>
                      <td className="py-1">:</td>
                      <td className="py-1">{teacher.unitOfWork || `Kementerian Agama ${teacher.schoolCity}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Instansi Bawah Cover */}
              <div className="text-center pb-8 z-10 font-sans">
                <h4 className="text-sm font-bold tracking-wider uppercase text-slate-900">
                  Kementerian Agama Republik Indonesia
                </h4>
                <h5 className="text-xs font-bold tracking-wider uppercase text-slate-800 mt-0.5">
                  Kantor Kementerian Agama {teacher.schoolCity}
                </h5>
                <p className="text-[11px] text-slate-600 mt-1 max-w-md mx-auto">
                  {teacher.kemenagOfficeAddress}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {teacher.kemenagOfficeContact}
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* HALAMAN 2: HALAMAN PERSETUJUAN                           */}
          {/* ======================================================== */}
          {(activePrintSection === 'all' || activePrintSection === 'cover') && (
            <div className="sheet-page bg-white text-black p-[20mm] border border-slate-300 shadow-md relative mx-auto w-[210mm] min-h-[297mm] flex flex-col justify-between font-sans text-xs page-break">
              <div>
                <div className="text-center border-b-2 border-black pb-3 mb-8">
                  <h2 className="text-base font-bold uppercase tracking-wide">
                    Halaman Persetujuan
                  </h2>
                </div>

                <p className="text-justify leading-relaxed mb-6">
                  Laporan pelaksanaan Penilaian Kinerja Guru Raudhatul Athfal disusun sebagai bukti penilaian atas kinerja guru :
                </p>

                <table className="w-full text-left mb-8">
                  <tbody>
                    <tr>
                      <td className="w-48 py-1.5 font-medium">N a m a</td>
                      <td className="w-4 py-1.5">:</td>
                      <td className="py-1.5 font-bold border-b border-black">{teacher.name || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">N I P</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.nip || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Pangkat / Gol. Ruang</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.rankGrade || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Tugas yang Diampu</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.teachingAssignment || 'Guru Kelas RA'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Tempat Tugas</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 font-semibold border-b border-black">{teacher.schoolName || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Alamat Tempat Tugas</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.schoolAddress || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Tanggal Penilaian</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{metadata.assessmentDate || '-'}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-center font-medium my-6">
                  Telah diperiksa dan disetujui oleh :
                </p>
              </div>

              {/* Tanda Tangan */}
              <div className="space-y-12">
                <div className="flex justify-between items-start px-4">
                  <div className="text-center w-64">
                    <p className="mb-20">Guru yang Dinilai,</p>
                    <p className="font-bold underline uppercase">{teacher.name}</p>
                    <p>NIP. {teacher.nip || '-'}</p>
                  </div>
                  <div className="text-center w-64">
                    <p className="mb-1">{metadata.cityDate}</p>
                    <p className="mb-20">Penilai,</p>
                    <p className="font-bold underline uppercase">{metadata.assessorName}</p>
                    <p>NIP. {metadata.assessorNip || '-'}</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-1">Menyetujui :</p>
                  <p className="mb-20">Kepala RA,</p>
                  <p className="font-bold underline uppercase">{metadata.headmasterName}</p>
                  <p>NIP. {metadata.headmasterNip || '-'}</p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* HALAMAN 3: DASAR HUKUM & STRUKTUR 79 INDIKATOR           */}
          {/* ======================================================== */}
          {(activePrintSection === 'all') && (
            <div className="sheet-page bg-white text-black p-[18mm] border border-slate-300 shadow-md relative mx-auto w-[210mm] min-h-[297mm] font-sans text-xs page-break">
              <div className="text-center mb-6">
                <h2 className="text-sm font-bold uppercase">
                  Penilaian Kinerja
                </h2>
                <h3 className="text-sm font-bold uppercase">
                  Guru Raudhatul Athfal (RA)
                </h3>
                <p className="text-xs font-semibold uppercase text-slate-800">
                  (Kepdirjen Pendis No. 1843 Tahun 2021)
                </p>
              </div>

              {/* Dasar Hukum */}
              <div className="mb-6">
                <h4 className="font-bold text-xs mb-2">Dasar Hukum :</h4>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-slate-800">
                  {LEGAL_FOUNDATIONS.map((base, idx) => (
                    <li key={idx} className="pl-1">{base}</li>
                  ))}
                </ol>
              </div>

              {/* Tabel Kompetensi dan Komponen Guru RA */}
              <div>
                <h4 className="font-bold text-xs mb-2 text-center">
                  Kompetensi dan Komponen Guru Raudhatul Athfal (RA)
                </h4>
                <table className="w-full border-collapse border border-black text-[11px]">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-black text-center">
                      <th className="border border-black p-1.5 w-10">No.</th>
                      <th className="border border-black p-1.5 w-32">Kompetensi</th>
                      <th className="border border-black p-1.5">Komponen</th>
                      <th className="border border-black p-1.5 w-24">Indikator Kinerja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Pedagogik */}
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold align-top" rowSpan={9}>1.</td>
                      <td className="border border-black p-1.5 font-bold align-top" rowSpan={9}>Pedagogik</td>
                      <td className="border border-black p-1.5">1. Mengorganisasikan aspek perkembangan sesuai dengan karakteristik perkembangan anak usia dini</td>
                      <td className="border border-black p-1.5 text-center font-semibold">6</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">2. Menganalisis teori bermain sesuai aspek dan tahapan perkembangan, potensi, bakat, dan minat anak usia dini</td>
                      <td className="border border-black p-1.5 text-center font-semibold">5</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">3. Merancang kegiatan pengembangan anak usia dini berdasarkan kurikulum</td>
                      <td className="border border-black p-1.5 text-center font-semibold">4</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">4. Menyelenggarakan kegiatan bermain yang menyenangkan</td>
                      <td className="border border-black p-1.5 text-center font-semibold">7</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">5. Memanfaatkan teknologi informasi dan komunikasi untuk kepentingan penyelenggaraan kegiatan pengembangan yang mendidik</td>
                      <td className="border border-black p-1.5 text-center font-semibold">4</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">6. Mengembangkan potensi anak usia dini</td>
                      <td className="border border-black p-1.5 text-center font-semibold">6</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">7. Berkomunikasi secara efektif, empati, dan santun</td>
                      <td className="border border-black p-1.5 text-center font-semibold">6</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">8. Menyelenggarakan dan membuat laporan hasil penilaian perkembangan anak</td>
                      <td className="border border-black p-1.5 text-center font-semibold">9</td>
                    </tr>
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-1.5 text-center">Jumlah Indikator Sub 1</td>
                      <td className="border border-black p-1.5 text-center">47</td>
                    </tr>

                    {/* Kepribadian */}
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold align-top" rowSpan={4}>2.</td>
                      <td className="border border-black p-1.5 font-bold align-top" rowSpan={4}>Kepribadian</td>
                      <td className="border border-black p-1.5">9. Bertindak sesuai dengan norma, agama, hukum, sosial, dan kebudayaan nasional Indonesia</td>
                      <td className="border border-black p-1.5 text-center font-semibold">5</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">10. Menampilkan diri sebagai pribadi yang jujur, berakhlakul karimah, dan teladan bagi anak usia dini dan masyarakat</td>
                      <td className="border border-black p-1.5 text-center font-semibold">5</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">11. Menunjukkan etos kerja, tanggung jawab yang tinggi, rasa percaya diri, dan bangga menjadi guru</td>
                      <td className="border border-black p-1.5 text-center font-semibold">7</td>
                    </tr>
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-1.5 text-center">Jumlah Indikator Sub 2</td>
                      <td className="border border-black p-1.5 text-center">17</td>
                    </tr>

                    {/* Profesional */}
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold align-top" rowSpan={3}>3.</td>
                      <td className="border border-black p-1.5 font-bold align-top" rowSpan={3}>Profesional</td>
                      <td className="border border-black p-1.5">12. Mengembangkan materi, struktur, dan konsep bidang keilmuan yang mendukung serta sejalan dengan kebutuhan dan tahapan perkembangan anak usia dini</td>
                      <td className="border border-black p-1.5 text-center font-semibold">3</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">13. Mengembangkan profesionalitas secara berkelanjutan dengan melakukan tindakan reflektif</td>
                      <td className="border border-black p-1.5 text-center font-semibold">5</td>
                    </tr>
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-1.5 text-center">Jumlah Indikator Sub 3</td>
                      <td className="border border-black p-1.5 text-center">8</td>
                    </tr>

                    {/* Sosial */}
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold align-top" rowSpan={3}>4.</td>
                      <td className="border border-black p-1.5 font-bold align-top" rowSpan={3}>Sosial</td>
                      <td className="border border-black p-1.5">14. Berkomunikasi secara efektif, empati, dan santun dengan sesama pendidik, tenaga kependidikan, orang tua, dan masyarakat</td>
                      <td className="border border-black p-1.5 text-center font-semibold">4</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">15. Beradaptasi dalam keanekaragaman sosial budaya bangsa Indonesia dengan tetap menjunjung tinggi nilai Islami</td>
                      <td className="border border-black p-1.5 text-center font-semibold">3</td>
                    </tr>
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-1.5 text-center">Jumlah Indikator Sub 4</td>
                      <td className="border border-black p-1.5 text-center">7</td>
                    </tr>

                    {/* Grand Total */}
                    <tr className="bg-slate-200 font-extrabold">
                      <td className="border border-black p-2 text-center" colSpan={3}>
                        Jumlah Total Indikator Sub (1+2+3+4)
                      </td>
                      <td className="border border-black p-2 text-center text-sm">
                        79
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* INSTRUMEN PENILAIAN KOMPONEN 1 - 15 (Page 4 s/d 13)       */}
          {/* ======================================================== */}
          {(activePrintSection === 'all' || activePrintSection === 'instruments') && (
            <div className="space-y-8">
              {PKG_COMPONENTS.map((comp) => {
                const res = evaluation.componentResults.find((r) => r.componentId === comp.id);
                return (
                  <div
                    key={comp.id}
                    className="sheet-page bg-white text-black p-[15mm] border border-slate-300 shadow-md relative mx-auto w-[210mm] min-h-[297mm] font-sans text-xs page-break flex flex-col justify-between"
                  >
                    <div>
                      {/* Header Instrumen pada halaman pertama atau tiap komponen */}
                      <div className="text-center mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-wide">
                          Instrumen Penilaian Kinerja Guru Raudhatul Athfal (RA)
                        </h2>
                      </div>

                      {/* Header Guru & Penilai Ringkas */}
                      <div className="grid grid-cols-2 gap-4 text-[10px] mb-3 pb-2 border-b border-black">
                        <table>
                          <tbody>
                            <tr>
                              <td className="w-24 font-medium">Nama Guru</td>
                              <td className="w-2">:</td>
                              <td className="font-bold">{teacher.name}</td>
                            </tr>
                            <tr>
                              <td className="font-medium">N I P</td>
                              <td>:</td>
                              <td>{teacher.nip || '-'}</td>
                            </tr>
                            <tr>
                              <td className="font-medium">Pangkat / Gol.</td>
                              <td>:</td>
                              <td>{teacher.rankGrade}</td>
                            </tr>
                            <tr>
                              <td className="font-medium">Tempat Tugas</td>
                              <td>:</td>
                              <td>{teacher.schoolName}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table>
                          <tbody>
                            <tr>
                              <td className="w-24 font-medium">Nama Penilai</td>
                              <td className="w-2">:</td>
                              <td className="font-bold">{metadata.assessorName}</td>
                            </tr>
                            <tr>
                              <td className="font-medium">N I P</td>
                              <td>:</td>
                              <td>{metadata.assessorNip || '-'}</td>
                            </tr>
                            <tr>
                              <td className="font-medium">Pangkat / Gol.</td>
                              <td>:</td>
                              <td>{metadata.assessorRank}</td>
                            </tr>
                            <tr>
                              <td className="font-medium">Jabatan</td>
                              <td>:</td>
                              <td>{metadata.assessorPosition}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="font-bold text-xs mb-2">
                        Kompetensi {comp.competencyId} : {comp.competencyTitle}
                      </div>

                      {/* Tabel Komponen */}
                      <table className="w-full border-collapse border border-black text-[10px]">
                        <thead>
                          <tr className="bg-slate-100 font-bold border-b border-black">
                            <th className="border border-black p-1.5 w-40 text-left">Komponen</th>
                            <th className="border border-black p-1.5 text-left">Indikator Kinerja</th>
                            <th className="border border-black p-1.5 w-48 text-left">Bukti Kinerja</th>
                            <th className="border border-black p-1 text-center" colSpan={3}>
                              Nilai Kinerja
                              <div className="grid grid-cols-3 border-t border-black mt-1 pt-0.5">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {comp.indicators.map((ind, iIdx) => {
                            const val = scores[ind.code] ?? 0;
                            return (
                              <tr key={ind.code}>
                                {iIdx === 0 && (
                                  <td
                                    className="border border-black p-1.5 align-top font-semibold"
                                    rowSpan={comp.indicators.length}
                                  >
                                    {comp.id}. {comp.title}
                                  </td>
                                )}
                                <td className="border border-black p-1.5 align-top leading-tight">
                                  {iIdx + 1}. {ind.text}
                                </td>
                                <td className="border border-black p-1.5 align-top">
                                  <ul className="list-disc list-inside space-y-0.5 text-[9.5px]">
                                    {ind.evidence.map((ev, evIdx) => (
                                      <li key={evIdx}>{ev}</li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="border border-black p-1 text-center align-middle w-7">
                                  {val === 0 ? '✓' : ''}
                                </td>
                                <td className="border border-black p-1 text-center align-middle w-7 font-bold">
                                  {val === 1 ? '✓' : ''}
                                </td>
                                <td className="border border-black p-1 text-center align-middle w-7 font-bold">
                                  {val === 2 ? '✓' : ''}
                                </td>
                              </tr>
                            );
                          })}

                          {/* Footer Penskoran Komponen */}
                          <tr className="font-semibold bg-slate-50">
                            <td className="border border-black p-1" colSpan={3}>
                              Total skor untuk komponen {comp.id}
                            </td>
                            <td className="border border-black p-1 text-center font-bold" colSpan={3}>
                              {res?.totalScore}
                            </td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="border border-black p-1" colSpan={3}>
                              Skor maksimum komponen {comp.id} = jumlah indikator x 2
                            </td>
                            <td className="border border-black p-1 text-center" colSpan={3}>
                              {res?.maxScore}
                            </td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="border border-black p-1" colSpan={3}>
                              Persentase = (total skor / {res?.maxScore}) x 100%
                            </td>
                            <td className="border border-black p-1 text-center" colSpan={3}>
                              {res?.percentage}%
                            </td>
                          </tr>
                          <tr className="font-bold bg-slate-100">
                            <td className="border border-black p-1" colSpan={3}>
                              Nilai untuk komponen {comp.id} :
                              <div className="font-normal text-[9px] text-slate-700">
                                (0% &lt; X ≤ 25% = 1; 25% &lt; X ≤ 50% = 2; 50% &lt; X ≤ 75% = 3; 75% &lt; X ≤ 100% = 4)
                              </div>
                            </td>
                            <td className="border border-black p-1 text-center text-xs font-extrabold" colSpan={3}>
                              {res?.componentValue}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between">
                      <span>PKG Guru Raudhatul Athfal (Kepdirjen Pendis 1843/2021)</span>
                      <span>Komponen {comp.id} dari 15</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ======================================================== */}
          {/* HALAMAN 14: LAPORAN DAN EVALUASI & PERSETUJUAN           */}
          {/* ======================================================== */}
          {(activePrintSection === 'all') && (
            <div className="sheet-page bg-white text-black p-[20mm] border border-slate-300 shadow-md relative mx-auto w-[210mm] min-h-[297mm] flex flex-col justify-between font-sans text-xs page-break">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-sm font-bold uppercase">
                    Laporan dan Evaluasi
                  </h2>
                  <h3 className="text-sm font-bold uppercase">
                    Penilaian Kinerja Guru Raudhatul Athfal (RA)
                  </h3>
                  <p className="text-xs font-semibold uppercase text-slate-800">
                    (Kepdirjen Pendis No. 1843 Tahun 2021)
                  </p>
                </div>

                <table className="w-full text-left mb-8">
                  <tbody>
                    <tr>
                      <td className="w-52 py-1.5 font-medium">Nama Guru</td>
                      <td className="w-4 py-1.5">:</td>
                      <td className="py-1.5 font-bold border-b border-black">{teacher.name}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">N I P / Nomor Seri Karpeg</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.nip || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Pangkat / Golongan Ruang</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.rankGrade}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Terhitung Mulai Tanggal</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.tmtTeacher}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">NUPTK/PegID / NRG</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.nuptk}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Tempat Tugas</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 font-semibold border-b border-black">{teacher.schoolName}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Alamat Tempat Tugas</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.schoolAddress}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Tanggal Mulai Bekerja di RA Ini</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 border-b border-black">{teacher.workStartDateAtSchool}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-medium">Periode Penilaian</td>
                      <td className="py-1.5">:</td>
                      <td className="py-1.5 font-semibold border-b border-black">{metadata.period}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Box Persetujuan */}
                <div className="border border-black p-4 text-center mt-6">
                  <h4 className="font-bold text-xs uppercase mb-1">Persetujuan</h4>
                  <p className="text-[11px] italic mb-3">
                    (Persetujuan ini harus ditandatangani oleh penilai dan guru yang dinilai)
                  </p>
                  <p className="text-[11px] leading-relaxed text-justify">
                    Penilai dan guru yang dinilai menyatakan telah membaca dan memahami semua aspek yang ditulis / dilaporkan dalam format ini dan menyatakan setuju.
                  </p>
                </div>
              </div>

              {/* Tanda Tangan */}
              <div>
                <p className="text-right mr-8 mb-4">{metadata.cityDate}</p>
                <div className="flex justify-between items-start px-8 mb-8">
                  <div className="text-center w-64">
                    <p className="mb-20">Guru yang dinilai,</p>
                    <p className="font-bold underline uppercase">{teacher.name}</p>
                    <p>NIP. {teacher.nip || '-'}</p>
                  </div>
                  <div className="text-center w-64">
                    <p className="mb-20">Penilai,</p>
                    <p className="font-bold underline uppercase">{metadata.assessorName}</p>
                    <p>NIP. {metadata.assessorNip || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* HALAMAN 15: REKAP HASIL PENILAIAN KINERJA GURU (RA)      */}
          {/* ======================================================== */}
          {(activePrintSection === 'all' || activePrintSection === 'summary') && (
            <div className="sheet-page bg-white text-black p-[18mm] border border-slate-300 shadow-md relative mx-auto w-[210mm] min-h-[297mm] flex flex-col justify-between font-sans text-xs page-break">
              <div>
                {/* Header Rekap */}
                <div className="border border-black p-2 text-center mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wide">
                    Rekap Hasil Penilaian Kinerja Guru Raudhatul Athfal (RA)
                  </h2>
                  <h3 className="text-xs font-bold uppercase">
                    (Kepdirjen Pendis No. 1843 Tahun 2021)
                  </h3>
                </div>

                {/* Identitas Format A & B */}
                <div className="text-[10px] space-y-1 mb-3">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="w-4 font-bold align-top">a.</td>
                        <td className="w-44 font-medium">N a m a</td>
                        <td className="w-3">:</td>
                        <td className="font-bold border-b border-black">{teacher.name}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">N I P</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.nip || '-'}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">NUPTK/PegID</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.nuptk || '-'}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Tempat, Tanggal Lahir</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.birthPlaceDate}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Jabatan / Pangkat / Gol. Ruang</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.position} / {teacher.rankGrade}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">TMT Sebagai Guru</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.tmtTeacher}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Masa Kerja</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.serviceYears}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Jenis Kelamin</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.gender}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Pendidikan Terakhir / Spesialisasi</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.lastEducation}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Tugas yang Diampu</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.teachingAssignment}</td>
                      </tr>

                      <tr>
                        <td className="font-bold align-top pt-1">b.</td>
                        <td className="font-medium pt-1">Tempat Tugas</td>
                        <td className="pt-1">:</td>
                        <td className="font-bold border-b border-black pt-1">{teacher.schoolName}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Telp. / Fax.</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolPhone}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Desa / Kelurahan</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolVillage}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Kecamatan</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolDistrict}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Kabupaten</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolCity}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Provinsi</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolProvince}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Sub-Header Periode & Jenis PKG */}
                <table className="w-full border-collapse border border-black text-[10px] mb-3 text-center">
                  <tbody>
                    <tr>
                      <td className="border border-black p-1 w-1/2 font-medium">
                        Periode Penilaian : {metadata.period}
                      </td>
                      <td className="border border-black p-1 w-24">PKG Awal</td>
                      <td className="border border-black p-1 w-12 font-bold">
                        {metadata.assessmentType === 'PKG Awal' ? '√' : ''}
                      </td>
                      <td className="border border-black p-1 w-20 font-medium">Tahun :</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 font-medium"></td>
                      <td className="border border-black p-1 font-semibold">PKG</td>
                      <td className="border border-black p-1 font-bold">
                        {metadata.assessmentType === 'PKG' ? '√' : ''}
                      </td>
                      <td className="border border-black p-1 font-bold">{metadata.year}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Tabel 15 Komponen */}
                <table className="w-full border-collapse border border-black text-[10px]">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-black">
                      <th className="border border-black p-1 w-8 text-center">No.</th>
                      <th className="border border-black p-1 text-center">K o m p e t e n s i</th>
                      <th className="border border-black p-1 w-20 text-center">Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Pedagogik */}
                    <tr className="font-bold">
                      <td className="border border-black p-1 text-center">A.</td>
                      <td className="border border-black p-1" colSpan={2}>Pedagogik</td>
                    </tr>
                    {PKG_COMPONENTS.filter((c) => c.competencyId === 1).map((comp) => {
                      const res = evaluation.componentResults.find((r) => r.componentId === comp.id);
                      return (
                        <tr key={comp.id}>
                          <td className="border border-black p-1 text-center">{comp.id}.</td>
                          <td className="border border-black p-1">{comp.title}</td>
                          <td className="border border-black p-1 text-center font-bold">{res?.componentValue}</td>
                        </tr>
                      );
                    })}

                    {/* Kepribadian */}
                    <tr className="font-bold">
                      <td className="border border-black p-1 text-center">B.</td>
                      <td className="border border-black p-1" colSpan={2}>Kepribadian</td>
                    </tr>
                    {PKG_COMPONENTS.filter((c) => c.competencyId === 2).map((comp) => {
                      const res = evaluation.componentResults.find((r) => r.componentId === comp.id);
                      return (
                        <tr key={comp.id}>
                          <td className="border border-black p-1 text-center">{comp.id}.</td>
                          <td className="border border-black p-1">{comp.title}</td>
                          <td className="border border-black p-1 text-center font-bold">{res?.componentValue}</td>
                        </tr>
                      );
                    })}

                    {/* Profesional */}
                    <tr className="font-bold">
                      <td className="border border-black p-1 text-center">C.</td>
                      <td className="border border-black p-1" colSpan={2}>Profesional</td>
                    </tr>
                    {PKG_COMPONENTS.filter((c) => c.competencyId === 3).map((comp) => {
                      const res = evaluation.componentResults.find((r) => r.componentId === comp.id);
                      return (
                        <tr key={comp.id}>
                          <td className="border border-black p-1 text-center">{comp.id}.</td>
                          <td className="border border-black p-1">{comp.title}</td>
                          <td className="border border-black p-1 text-center font-bold">{res?.componentValue}</td>
                        </tr>
                      );
                    })}

                    {/* Sosial */}
                    <tr className="font-bold">
                      <td className="border border-black p-1 text-center">D.</td>
                      <td className="border border-black p-1" colSpan={2}>Sosial</td>
                    </tr>
                    {PKG_COMPONENTS.filter((c) => c.competencyId === 4).map((comp) => {
                      const res = evaluation.componentResults.find((r) => r.componentId === comp.id);
                      return (
                        <tr key={comp.id}>
                          <td className="border border-black p-1 text-center">{comp.id}.</td>
                          <td className="border border-black p-1">{comp.title}</td>
                          <td className="border border-black p-1 text-center font-bold">{res?.componentValue}</td>
                        </tr>
                      );
                    })}

                    {/* Total Row */}
                    <tr className="font-bold bg-slate-100">
                      <td className="border border-black p-1 text-center" colSpan={2}>
                        Jumlah (Hasil Penilaian Kinerja Guru Raudhatul Athfal)
                      </td>
                      <td className="border border-black p-1 text-center font-extrabold text-xs">
                        {evaluation.totalComponentScore}
                      </td>
                    </tr>

                    {/* Konversi Row */}
                    <tr className="font-bold">
                      <td className="border border-black p-1" colSpan={2}>
                        Konversi nilai PK guru ke dalam skala 0 - 100 : Nilai PKG (skala 100) = (Nilai PKG / Nilai Tertinggi) x 100
                      </td>
                      <td className="border border-black p-1 text-center font-extrabold text-xs">
                        {evaluation.scale100Score}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tanda Tangan Bertiga */}
              <div className="pt-3">
                <p className="text-right mr-8 mb-2 text-[10px]">{metadata.cityDate}</p>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div>
                    <p className="mb-14">Guru yang dinilai,</p>
                    <p className="font-bold underline uppercase">{teacher.name}</p>
                    <p>NIP. {teacher.nip || '-'}</p>
                  </div>
                  <div>
                    <p className="mb-14">Penilai,</p>
                    <p className="font-bold underline uppercase">{metadata.assessorName}</p>
                    <p>NIP. {metadata.assessorNip || '-'}</p>
                  </div>
                  <div>
                    <p className="mb-14">Kepala RA,</p>
                    <p className="font-bold underline uppercase">{metadata.headmasterName}</p>
                    <p>NIP. {metadata.headmasterNip || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* HALAMAN 16: FORMAT PENGHITUNGAN ANGKA KREDIT             */}
          {/* ======================================================== */}
          {(activePrintSection === 'all' || activePrintSection === 'summary') && (
            <div className="sheet-page bg-white text-black p-[20mm] border border-slate-300 shadow-md relative mx-auto w-[210mm] min-h-[297mm] flex flex-col justify-between font-sans text-xs page-break">
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-sm font-bold uppercase">
                    Format Penghitungan Angka Kredit
                  </h2>
                  <h3 className="text-sm font-bold uppercase">
                    Penilaian Kinerja Guru Raudhatul Athfal (RA)
                  </h3>
                </div>

                {/* Identitas Guru Lengkap */}
                <div className="text-[11px] mb-6">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="w-5 font-bold align-top">a.</td>
                        <td className="w-48 font-medium">N a m a</td>
                        <td className="w-3">:</td>
                        <td className="font-bold border-b border-black">{teacher.name}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">N I P</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.nip || '-'}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">NUPTK/PegID</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.nuptk || '-'}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Tempat, Tanggal Lahir</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.birthPlaceDate}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Pangkat / Golongan Ruang</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.rankGrade}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Jabatan</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.position}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">TMT Sebagai Guru</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.tmtTeacher}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Masa Kerja</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.serviceYears}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Jenis Kelamin</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.gender}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Pendidikan Terakhir / Spesialisasi</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.lastEducation}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Tugas Yang Diampu</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.teachingAssignment}</td>
                      </tr>

                      <tr>
                        <td className="font-bold align-top pt-2">b.</td>
                        <td className="font-medium pt-2">Tempat Tugas</td>
                        <td className="pt-2">:</td>
                        <td className="font-bold border-b border-black pt-2">{teacher.schoolName}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Telp. / Fax.</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolPhone}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Desa / Kelurahan</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolVillage}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Kecamatan</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolDistrict}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Kabupaten</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolCity}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="font-medium">Provinsi</td>
                        <td>:</td>
                        <td className="border-b border-black">{teacher.schoolProvince}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tabel Perhitungan Angka Kredit */}
                <table className="w-full border-collapse border border-black text-xs">
                  <tbody>
                    <tr>
                      <td className="border border-black p-2 font-medium w-3/4">
                        Nilai PK Guru Raudhatul Athfal (RA)
                      </td>
                      <td className="border border-black p-2 text-center font-bold text-sm">
                        {evaluation.totalComponentScore}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-medium">
                        Konversi nilai PKG ke dalam skala 0 - 100 dengan rumus :
                        <div className="font-semibold mt-1">
                          Nilai PKG (skala 100) = (Nilai PKG / Nilai Tertinggi) x 100
                        </div>
                      </td>
                      <td className="border border-black p-2 text-center font-bold text-sm">
                        {evaluation.scale100Score}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-medium">
                        Berdasarkan hasil konversi ke dalam skala nilai sesuai dengan peraturan tersebut, selanjutnya ditetapkan sebutan dan persentase angka kreditnya
                      </td>
                      <td className="border border-black p-2 text-center font-bold">
                        <div>{evaluation.predicate}</div>
                        <div className="text-xs font-semibold">({evaluation.npkPercent}%)</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-medium">
                        Perolehan angka kredit (untuk pembelajaran) yang dihitung berdasarkan rumus berikut ini :
                        <div className="text-center font-bold mt-2">
                          Angka Kredit 1 Tahun = ((AKK - AKPKB - AKP) x (JM / JWM) x NPK) / 4
                        </div>
                      </td>
                      <td className="border border-black p-2 text-center font-extrabold text-base text-emerald-800">
                        {evaluation.annualCreditScore}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tanda Tangan */}
              <div>
                <p className="text-right mr-8 mb-4">{metadata.cityDate}</p>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div>
                    <p className="mb-20">Guru yang dinilai,</p>
                    <p className="font-bold underline uppercase">{teacher.name}</p>
                    <p>NIP. {teacher.nip || '-'}</p>
                  </div>
                  <div>
                    <p className="mb-20">Penilai,</p>
                    <p className="font-bold underline uppercase">{metadata.assessorName}</p>
                    <p>NIP. {metadata.assessorNip || '-'}</p>
                  </div>
                  <div>
                    <p className="mb-20">Kepala RA,</p>
                    <p className="font-bold underline uppercase">{metadata.headmasterName}</p>
                    <p>NIP. {metadata.headmasterNip || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
