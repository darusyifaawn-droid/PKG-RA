import { TeacherRecord } from '../types/pkg';
import { PKG_COMPONENTS } from './pkgStructure';

// Default all 79 indicators with score 2 (Amat Baik) as popular starting point
export const createDefaultScores = (defaultVal = 2): Record<string, number> => {
  const scores: Record<string, number> = {};
  PKG_COMPONENTS.forEach((comp) => {
    comp.indicators.forEach((ind) => {
      scores[ind.code] = defaultVal;
    });
  });
  return scores;
};

export const INITIAL_TEACHER_RECORD: TeacherRecord = {
  id: 'guru-1',
  updatedAt: new Date().toISOString(),
  teacher: {
    id: 'guru-1',
    name: 'Siti Rohmah, S.Pd.I',
    nip: '19880415 201101 2 018',
    nuptk: '4538766667210082',
    birthPlaceDate: 'Cirebon, 15 April 1988',
    rankGrade: 'Penata Muda / III/a',
    position: 'Guru Pertama',
    teacherType: 'Guru Kelas',
    teachingAssignment: 'Guru Kelas RA',
    additionalDuty: 'Wali Kelas RA A',
    tmtTeacher: '01 Januari 2011',
    serviceYears: '15 Tahun 0 Bulan',
    gender: 'Perempuan',
    lastEducation: 'S1 PG-PAUD',
    foundationName: 'YAYASAN PENDIDIKAN ISLAM AL-IKHLAS',
    schoolName: 'RA Al-Ikhlas Sumber',
    nsm: '101232090123',
    npsn: '69781234',
    schoolAddress: 'Jl. Ki Bagus Rangin No. 24',
    schoolVillage: 'Sumber',
    schoolDistrict: 'Sumber',
    schoolCity: 'Cirebon',
    schoolProvince: 'Jawa Barat',
    schoolPostalCode: '45611',
    schoolPhone: '0231-321456',
    schoolEmail: 'ra.alikhlas.sumber@gmail.com',
    schoolWebsite: 'www.ra-alikhlas.sch.id',
    schoolLogoUrl: 'kemenag',
    unitOfWork: 'Kementerian Agama Kabupaten Cirebon',
    workStartDateAtSchool: '01 Juli 2015',
    kemenagOfficeAddress: 'Jalan Sunan Drajat No. 5 Komplek Perkantoran Sumber Cirebon – 45611',
    kemenagOfficeContact: 'e-mail : cirebon@kemenag.go.id , website : cirebon.kemenag.go.id'
  },
  metadata: {
    period: 'Januari s/d Desember 2026',
    year: '2026',
    assessmentType: 'PKG',
    assessmentDate: '31 Desember 2026',
    cityDate: 'Cirebon, 31 Desember 2026',
    assessorName: 'Drs. H. Ahmad Fauzi, M.Pd.I',
    assessorNip: '19750810 200003 1 004',
    assessorRank: 'Pembina / IV/a',
    assessorPosition: 'Pengawas Madrasah',
    supervisorName: 'Drs. H. Ahmad Fauzi, M.Pd.I',
    supervisorNip: '19750810 200003 1 004',
    headmasterName: 'Hj. Nurul Hidayah, M.Pd.',
    headmasterNip: '19800612 200501 2 007'
  },
  creditParams: {
    akk: 50,
    akpkb: 3,
    akp: 5,
    jm: 24,
    jwm: 24
  },
  scores: createDefaultScores(2)
};

export const SAMPLE_TEACHERS: TeacherRecord[] = [
  INITIAL_TEACHER_RECORD,
  {
    id: 'guru-2',
    updatedAt: new Date().toISOString(),
    teacher: {
      ...INITIAL_TEACHER_RECORD.teacher,
      id: 'guru-2',
      name: 'Fatimah Azzahra, S.Pd',
      nip: '19920310 201903 2 021',
      nuptk: '7645123489001243',
      birthPlaceDate: 'Cirebon, 10 Maret 1992',
      rankGrade: 'Penata Muda / III/a',
      position: 'Guru Pertama',
      teachingAssignment: 'Guru Kelas RA',
      additionalDuty: 'Wali Kelas RA B',
      serviceYears: '7 Tahun 0 Bulan'
    },
    metadata: { ...INITIAL_TEACHER_RECORD.metadata },
    creditParams: { ...INITIAL_TEACHER_RECORD.creditParams },
    scores: createDefaultScores(2)
  },
  {
    id: 'guru-3',
    updatedAt: new Date().toISOString(),
    teacher: {
      ...INITIAL_TEACHER_RECORD.teacher,
      id: 'guru-3',
      name: 'Nur Aini, S.Pd.I',
      nip: '-',
      nuptk: '2345678901234567',
      birthPlaceDate: 'Kuningan, 22 Agustus 1995',
      rankGrade: 'Guru Tetap Yayasan',
      position: 'Guru Kelas',
      teachingAssignment: 'Guru Kelas RA',
      additionalDuty: 'Koordinator Kurikulum',
      serviceYears: '5 Tahun 0 Bulan'
    },
    metadata: { ...INITIAL_TEACHER_RECORD.metadata },
    creditParams: {
      akk: 50,
      akpkb: 3,
      akp: 5,
      jm: 24,
      jwm: 24
    },
    // slightly varied scores
    scores: (() => {
      const s = createDefaultScores(2);
      s['1.2'] = 1;
      s['2.3'] = 1;
      s['5.2'] = 1;
      return s;
    })()
  }
];
