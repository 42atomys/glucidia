namespace API {
  export interface Error {
    error: string;
  }

  export interface CalculationRequest {
    bloodSugar: number;
    plannedCarbGrams: number;
    target?: number;
    dailyInsulinAverage?: number;
    algorithm?: number;
  }

  export interface CalculationResponse {
    sugar: {
      current: number;
      target: number;
      correctionDose: number;
    };
    meal: {
      plannedCarbGrams: number;
      carbDose: number;
    };
    _calculation: {
      dailyInsulinAverage: number;
      insulinSensitivityFactor: number;
      algorithm: number;
      pumpRatio: number;
    };
    totalDose: number;
  }
}
