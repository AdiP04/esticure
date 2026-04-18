import { Injectable } from '@nestjs/common';

export interface PriceRange {
  min: number;
  max: number;
}

@Injectable()
export class PricingService {
  /**
   * Calculate the final price range for a hospital+service combination.
   *
   * Formula:
   *  finalBase = service.basePrice * hospital.priceMultiplier
   *  min = finalBase * 0.80  (−20%)
   *  max = finalBase * 1.20  (+20%)
   *
   * Values are rounded to nearest 500 for display.
   */
  calculateRange(basePrice: number, priceMultiplier: number): PriceRange {
    const finalBase = basePrice * priceMultiplier;
    const min = Math.round((finalBase * 0.8) / 500) * 500;
    const max = Math.round((finalBase * 1.2) / 500) * 500;
    return { min, max };
  }

  /**
   * Format a number as INR with ₹ symbol and comma separation.
   */
  formatINR(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}
