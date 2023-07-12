import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlanetsApiResponse} from '../../models/planetsApiResponse';
import {GET_PLANETS_ENDPOINT_URL} from '../../planet-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private httpClient: HttpClient) { }

  public getPlanets(): Observable<PlanetsApiResponse> {
    return this.httpClient.get<PlanetsApiResponse>(GET_PLANETS_ENDPOINT_URL);
  }
}
