export const EMISSION_FACTORS: Record<string, number> = {
  한국전력: 0.456,
  플라스틱1: 2.3,
  플라스틱2: 3.2,
  트럭: 3.5,
};

export const EMISSION_UNIT: Record<string, string> = {
  전기: "kWh",
  플라스틱1: "kg",
  플라스틱2: "kg",
  운송: "ton-km",
};
