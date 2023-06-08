import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const data: API.CalculationRequest = await request.json().catch(() => ({}));

  const {
    bloodSugar,
    plannedCarbGrams,
    target = 100,
    dailyInsulinAverage = 54.45,
    algorithm = 1.8,
  } = data;

  if (!bloodSugar || !plannedCarbGrams) {
    return NextResponse.json(
      {
        error: 'Missing required query parameters',
      },
      { status: 400 }
    );
  }

  const insulinSensitivityFactor = roundNumberSafe(1800 / dailyInsulinAverage);
  const pumpRatio = roundNumberSafe(10 / algorithm, 1);
  const correctionDose =
    bloodSugar > target + insulinSensitivityFactor
      ? roundNumberSafe((bloodSugar - target) / insulinSensitivityFactor)
      : 0;
  const carbDose = roundNumberSafe(plannedCarbGrams / pumpRatio);

  const totalDose = roundNumberSafe(correctionDose + carbDose, 1);

  return NextResponse.json<API.CalculationResponse>({
    sugar: {
      current: bloodSugar,
      target,
      correctionDose,
    },
    meal: {
      plannedCarbGrams,
      carbDose,
    },
    _calculation: {
      dailyInsulinAverage,
      insulinSensitivityFactor,
      algorithm,
      pumpRatio,
    },
    totalDose,
  });
};

const roundNumberSafe = (num: number, decimalPlaces: number = 5) => {
  const exponent = Math.pow(10, decimalPlaces);
  const rounded = Math.round((num + Number.EPSILON) * exponent) / exponent;
  return Number(rounded.toFixed(decimalPlaces));
};
