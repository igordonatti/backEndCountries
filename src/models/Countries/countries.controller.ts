import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('AvailableCountries')
  avaliableCountries() {
    return this.countriesService.avalaibleCountries();
  }

  @Get('countryInfo/:acronym')
  countryInfo(@Param('acronym') acronym: string) {
    return this.countriesService.infoCountry(acronym);
  }
}
