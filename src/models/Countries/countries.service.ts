import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  // Return a list of available countries
  async avalaibleCountries() {
    const url = 'https://date.nager.at/api/v3/AvailableCountries';
    const response = await firstValueFrom(this.httpService.get(url));

    return response.data;
  }

  // Return detailed information about a specifig country
  async infoCountry(acronym: string) {
    const countryInformation = await this.getInfo(acronym);
    const population = await this.populationData(countryInformation.commonName);
    const flag = await this.getFlag(countryInformation.commonName);

    return {
      countryInformation,
      populationData: [population],
      flag,
    };
  }

  // Borders of the country
  private async getInfo(acronym: string) {
    try {
      const url = `https://date.nager.at/api/v3/CountryInfo/${acronym}`;
      const response = await firstValueFrom(this.httpService.get(url));

      return response.data;
    } catch {
      return 'Country not found!';
    }
  }

  // Population Data of the country
  private async populationData(nameCountry: string) {
    try {
      const url = 'https://countriesnow.space/api/v0.1/countries/population';
      const response = await firstValueFrom(this.httpService.get(url));

      if (response.data) {
        const countryData = response.data.data.find(
          (country) => country.country == nameCountry,
        );

        return countryData;
      }
    } catch {
      return 'Country not found!';
    }
  }

  private async getFlag(nameCountry: string) {
    try {
      const url = 'https://countriesnow.space/api/v0.1/countries/flag/images';
      const response = await firstValueFrom(this.httpService.get(url));

      if (response.data) {
        const flag = await response.data.data.find(
          (country) => country.name == nameCountry,
        );

        return flag.flag;
      }
    } catch {
      return 'Erro ao buscar bandeira';
    }
  }
}
