import { PKG_COMPONENTS } from '../data/pkgStructure';
import {
  CreditScoreParams,
  FullEvaluationResult,
  ComponentCalculation
} from '../types/pkg';

export function calculateComponentScore(
  componentId: number,
  scores: Record<string, number>
): ComponentCalculation {
  const component = PKG_COMPONENTS.find((c) => c.id === componentId);
  if (!component) {
    return {
      componentId,
      totalScore: 0,
      maxScore: 0,
      percentage: 0,
      componentValue: 0
    };
  }

  const maxScore = component.indicators.length * 2;
  let totalScore = 0;

  component.indicators.forEach((ind) => {
    const val = scores[ind.code] ?? 0;
    totalScore += val;
  });

  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  // Rumus Kepdirjen Pendis 1843/2021:
  // 0% < X ≤ 25% = 1
  // 25% < X ≤ 50% = 2
  // 50% < X ≤ 75% = 3
  // 75% < X ≤ 100% = 4
  let componentValue = 0;
  if (percentage === 0) {
    // If not answered yet or zero, set to 0
    componentValue = totalScore > 0 ? 1 : 0;
  } else if (percentage <= 25) {
    componentValue = 1;
  } else if (percentage <= 50) {
    componentValue = 2;
  } else if (percentage <= 75) {
    componentValue = 3;
  } else {
    componentValue = 4;
  }

  return {
    componentId,
    totalScore,
    maxScore,
    percentage: Math.round(percentage * 100) / 100,
    componentValue
  };
}

export function evaluatePKG(
  scores: Record<string, number>,
  creditParams: CreditScoreParams
): FullEvaluationResult {
  const componentResults: ComponentCalculation[] = PKG_COMPONENTS.map((c) =>
    calculateComponentScore(c.id, scores)
  );

  const totalComponentScore = componentResults.reduce(
    (sum, res) => sum + res.componentValue,
    0
  );
  const maxComponentScore = 60; // 15 components * 4

  const scale100Score =
    maxComponentScore > 0
      ? Math.round(((totalComponentScore / maxComponentScore) * 100) * 100) / 100
      : 0;

  let predicate = 'Kurang';
  let npkPercent = 25;

  if (scale100Score >= 91) {
    predicate = 'Amat Baik';
    npkPercent = 125;
  } else if (scale100Score >= 76) {
    predicate = 'Baik';
    npkPercent = 100;
  } else if (scale100Score >= 61) {
    predicate = 'Cukup';
    npkPercent = 75;
  } else if (scale100Score >= 51) {
    predicate = 'Sedang';
    npkPercent = 50;
  } else {
    predicate = 'Kurang';
    npkPercent = 25;
  }

  // Rumus Permen PAN-RB 16/2009:
  // Angka Kredit 1 Tahun = ((AKK - AKPKB - AKP) * (JM / JWM) * NPK) / 4
  const jmRatio =
    creditParams.jwm > 0
      ? Math.min(1, creditParams.jm / creditParams.jwm)
      : 1;

  const targetKredit = creditParams.akk - creditParams.akpkb - creditParams.akp;
  const annualCreditScore =
    Math.round(
      (((targetKredit * jmRatio * (npkPercent / 100)) / 4) * 1000)
    ) / 1000;

  return {
    componentResults,
    totalComponentScore,
    maxComponentScore,
    scale100Score,
    predicate,
    npkPercent,
    annualCreditScore: Math.max(0, annualCreditScore)
  };
}

export const GOLONGAN_PRESETS: Record<
  string,
  { name: string; rank: string; akk: number; akpkb: number; akp: number }
> = {
  'III/a': {
    name: 'Penata Muda, III/a ke III/b',
    rank: 'Penata Muda / III/a',
    akk: 50,
    akpkb: 3,
    akp: 5
  },
  'III/b': {
    name: 'Penata Muda Tingkat I, III/b ke III/c',
    rank: 'Penata Muda Tingkat I / III/b',
    akk: 50,
    akpkb: 7,
    akp: 5
  },
  'III/c': {
    name: 'Penata, III/c ke III/d',
    rank: 'Penata / III/c',
    akk: 100,
    akpkb: 9,
    akp: 10
  },
  'III/d': {
    name: 'Penata Tingkat I, III/d ke IV/a',
    rank: 'Penata Tingkat I / III/d',
    akk: 100,
    akpkb: 12,
    akp: 10
  },
  'IV/a': {
    name: 'Pembina, IV/a ke IV/b',
    rank: 'Pembina / IV/a',
    akk: 150,
    akpkb: 16,
    akp: 15
  },
  'IV/b': {
    name: 'Pembina Tingkat I, IV/b ke IV/c',
    rank: 'Pembina Tingkat I / IV/b',
    akk: 150,
    akpkb: 16,
    akp: 15
  },
  'NON-PNS': {
    name: 'Guru Non-PNS / Yayasan / PPPK',
    rank: 'Guru Tetap Yayasan',
    akk: 50,
    akpkb: 3,
    akp: 5
  }
};
