import { Injectable } from '@nestjs/common';
import { FileService } from './file.service';
import { PricingService } from './pricing.service';

export interface MatchedHospital {
  id: string;
  name: string;
  city: string;
  rating: number;
  address: string;
  doctors: string[];
  insuranceAccepted: string[];
  insuranceMatched: boolean;
  priceMin: number;
  priceMax: number;
}

@Injectable()
export class MatchingService {
  constructor(
    private readonly fileService: FileService,
    private readonly pricingService: PricingService,
  ) {}

  /**
   * Match hospitals for a user based on city, insurance, and service.
   *
   * Steps:
   * 1. Filter hospitals by city (case-insensitive).
   * 2. Look up the service's basePrice from app_services.json.
   * 3. Calculate price range per hospital using priceMultiplier.
   * 4. If insurance company provided → mark insuranceMatched.
   * 5. Sort: insurance-matched first, then by rating desc.
   * 6. Return top 5.
   */
  async matchHospitals(
    city: string,
    insuranceCompany: string | null,
    serviceId: string,
  ): Promise<MatchedHospital[]> {
    const [hospitals, services] = await Promise.all([
      this.fileService.readJsonFile<any[]>('hospitals.json'),
      this.fileService.readJsonFile<any[]>('app_services.json'),
    ]);

    // Find service record
    const service = services.find((s) => s.id === serviceId);
    const basePrice = service ? service.basePrice : 50000;

    // Filter by city
    const cityHospitals = hospitals.filter(
      (h) => h.city.toLowerCase() === city.toLowerCase(),
    );

    // Build result with pricing + insurance match
    const results: MatchedHospital[] = cityHospitals.map((h) => {
      const { min, max } = this.pricingService.calculateRange(
        basePrice,
        h.priceMultiplier || 1,
      );

      const insuranceMatched =
        !!insuranceCompany &&
        Array.isArray(h.insuranceAccepted) &&
        h.insuranceAccepted.some(
          (ins: string) =>
            ins.toLowerCase() === insuranceCompany.toLowerCase(),
        );

      return {
        id: h.id,
        name: h.name,
        city: h.city,
        rating: h.rating,
        address: h.address || '',
        doctors: h.doctors || [],
        insuranceAccepted: h.insuranceAccepted || [],
        insuranceMatched,
        priceMin: min,
        priceMax: max,
      };
    });

    // Sort: insurance-matched first, then by rating desc
    results.sort((a, b) => {
      if (a.insuranceMatched !== b.insuranceMatched) {
        return a.insuranceMatched ? -1 : 1;
      }
      return b.rating - a.rating;
    });

    return results.slice(0, 5);
  }

  /**
   * Compute the overall cost range across all matched hospitals.
   */
  computeOverallRange(matched: MatchedHospital[]): { min: number; max: number } {
    if (!matched.length) return { min: 0, max: 0 };
    return {
      min: Math.min(...matched.map((h) => h.priceMin)),
      max: Math.max(...matched.map((h) => h.priceMax)),
    };
  }
}
