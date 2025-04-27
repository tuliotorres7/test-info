export class VehicleQueryParams {
  id?: number;
  placa?: string;
  chassi?: string;
  renavam?: string;
  modelo?: string;
  marca?: string;
  ano?: number;
}

export function isLicensePlateValid(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  const licensePlateRegex = /^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
  return licensePlateRegex.test(value);
}