import { TeacherRecord } from '../types/pkg';
import { PKG_COMPONENTS } from './pkgStructure';

// Default all 79 indicators with score (0 for blank, 2 for full)
export const createDefaultScores = (defaultVal = 0): Record<string, number> => {
  const scores: Record<string, number> = {};
  PKG_COMPONENTS.forEach((comp) => {
    comp.indicators.forEach((ind) => {
      scores[ind.code] = defaultVal;
    });
  });
  return scores;
};

// Blank clean template requested by user for sharing to other schools
export const BLANK_TEACHER_RECORD: TeacherRecord = {
  id: 'guru-1',
  updatedAt: new Date().toISOString(),
  teacher: {
    id: 'guru-1',
    name: '',
    nip: '',
    nuptk: '',
    birthPlaceDate: '',
    rankGrade: 'Guru Tetap Yayasan',
    position: 'Guru Kelas',
    teacherType: 'Guru Kelas',
    teachingAssignment: 'Guru Kelas RA',
    additionalDuty: '',
    tmtTeacher: '',
    serviceYears: '',
    gender: 'Perempuan',
    lastEducation: 'S1 PG-PAUD',
    foundationName: '',
    schoolName: '',
    nsm: '',
    npsn: '',
    schoolAddress: '',
    schoolVillage: '',
    schoolDistrict: '',
    schoolCity: '',
    schoolProvince: '',
    schoolPostalCode: '',
    schoolPhone: '',
    schoolEmail: '',
    schoolWebsite: '',
    schoolLogoUrl: 'kemenag',
    unitOfWork: '',
    workStartDateAtSchool: '',
    kemenagOfficeAddress: '',
    kemenagOfficeContact: ''
  },
  metadata: {
    period: 'Januari s/d Desember 2026',
    year: '2026',
    assessmentType: 'PKG',
    assessmentDate: '31 Desember 2026',
    cityDate: '31 Desember 2026',
    assessorName: '',
    assessorNip: '',
    assessorRank: '',
    assessorPosition: 'Pengawas Madrasah',
    supervisorName: '',
    supervisorNip: '',
    headmasterName: '',
    headmasterNip: ''
  },
  creditParams: {
    akk: 50,
    akpkb: 3,
    akp: 5,
    jm: 24,
    jwm: 24
  },
  scores: createDefaultScores(0)
};

export const DARUSYIFA_TEACHER_RECORD: TeacherRecord = {
  id: 'guru-1',
  updatedAt: new Date().toISOString(),
  teacher: {
    id: 'guru-1',
    name: 'Siti Aminah, S.Pd.I',
    nip: '-',
    nuptk: '-',
    birthPlaceDate: 'Cirebon, 12 Mei 1992',
    rankGrade: 'Guru Tetap',
    position: 'Guru Kelas',
    teacherType: 'Guru Kelas',
    teachingAssignment: 'Guru Kelas',
    additionalDuty: '',
    tmtTeacher: '01 Juli 2019',
    serviceYears: '6 Tahun',
    gender: 'Perempuan',
    lastEducation: 'S1 PG-PAUD',
    foundationName: 'YAYASAN PENDIDIKAN ISLAM DARUSYIFA',
    schoolName: 'RA Darusyifa Arjawinangun',
    nsm: '101232450001',
    npsn: '60716062',
    schoolAddress: 'Jl. Raya Arjawinangun No. 12',
    schoolVillage: 'Arjawinangun',
    schoolDistrict: 'Arjawinangun',
    schoolCity: 'Kabupaten Cirebon',
    schoolProvince: 'Jawa Barat',
    schoolPostalCode: '45162',
    schoolPhone: '',
    schoolEmail: 'ra.darusyifa@gmail.com',
    schoolWebsite: '',
    schoolLogoUrl: 'kemenag',
    unitOfWork: 'Kementerian Agama Kabupaten Cirebon',
    workStartDateAtSchool: '01 Juli 2019',
    kemenagOfficeAddress: 'Jalan Sunan Drajat No. 5 Komplek Perkantoran Sumber Cirebon – 45611',
    kemenagOfficeContact: 'e-mail : cirebon@kemenag.go.id , website : cirebon.kemenag.go.id'
  },
  metadata: {
    period: 'Januari s/d Desember 2026',
    year: '2026',
    assessmentType: 'PKG',
    assessmentDate: '31 Desember 2026',
    cityDate: '31 Desember 2026',
    assessorName: 'Pengawas Pembina',
    assessorNip: '-',
    assessorRank: 'Pembina / IV/a',
    assessorPosition: 'Pengawas Madrasah',
    supervisorName: 'Pengawas Pembina',
    supervisorNip: '-',
    headmasterName: 'Kepala RA Darusyifa',
    headmasterNip: '-'
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

export const INITIAL_TEACHER_RECORD: TeacherRecord = DARUSYIFA_TEACHER_RECORD;

// Sample demo record if user wants to test with 1 click
export const SAMPLE_TEACHERS: TeacherRecord[] = [
  DARUSYIFA_TEACHER_RECORD
];

