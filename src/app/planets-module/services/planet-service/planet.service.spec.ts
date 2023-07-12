import { TestBed } from '@angular/core/testing';

import { PlanetService } from './planet.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PlanetsApiResponse} from '../../models/planetsApiResponse';

describe('PlanetService', () => {
  let service: PlanetService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlanetService);
  });

  it('should make GET request to planets endpoint and return success response', () => {
    const response: PlanetsApiResponse = {
      count: 1,
      results: []
    } as unknown as PlanetsApiResponse;

    service.getPlanets().subscribe(res => {
      expect(res).toEqual(response);
    });

    const request = httpTestingController.expectOne('https://swapi.dev/api/planets/');
    expect(request.request.method).toEqual('GET');
    request.flush(response);
    httpTestingController.verify();
  });

  it('should make GET request to planets endpoint and return error response', () => {
    const errorMessage = 'some error message';

    service.getPlanets().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(errorMessage);
      },
    });

    const request = httpTestingController.expectOne('https://swapi.dev/api/planets/');
    expect(request.request.method).toEqual('GET');
    request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    httpTestingController.verify();
  });
});
