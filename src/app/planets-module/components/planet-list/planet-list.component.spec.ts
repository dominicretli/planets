import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetListComponent } from './planet-list.component';
import {PlanetService} from '../../services/planet-service/planet.service';
import {of, throwError} from 'rxjs';
import {PlanetsApiResponse} from '../../models/planetsApiResponse';
import {Planet} from '../../models/planet';
import {UnknownToQuestionMarkPipe} from '../../pipes/unknown-to-question-mark.pipe';
import {DecimalSpacePipe} from '../../pipes/decimal-space.pipe';
import {DecimalPipe} from '@angular/common';
import {By} from '@angular/platform-browser';

describe('PlanetListComponent', () => {
  let component: PlanetListComponent;
  let fixture: ComponentFixture<PlanetListComponent>;

  const planetServiceSpy = jasmine.createSpyObj('PlanetService', ['getPlanets']);
  planetServiceSpy.getPlanets.and.returnValue(throwError(() => new Error('errorMessage')));

  const setup = () => {
    TestBed.configureTestingModule({
      declarations: [ PlanetListComponent, UnknownToQuestionMarkPipe, DecimalSpacePipe ],
      providers: [
        { provide: PlanetService, useValue: planetServiceSpy },
        DecimalPipe
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PlanetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  const planet1: Planet = {
    name: 'planet1',
    rotation_period: '36',
    orbital_period: '412',
    diameter: '4200',
    climate: 'hot',
    gravity: '1 standard',
    terrain: 'volcanoes, lava rivers, mountains, caves',
    surface_water: '100',
    population: '20000',
    residents: [],
    films: [],
    created: '2014-12-10T12:50:16.526000Z',
    edited: '2014-12-20T20:58:18.440000Z',
    url: 'https://swapi.dev/api/planets/13/'
}

  const planet2: Planet = {
    name: 'planet2',
    rotation_period: '36',
    orbital_period: '412',
    diameter: '4200',
    climate: 'hot',
    gravity: '1 standard',
    terrain: 'volcanoes, lava rivers, mountains, caves',
    surface_water: '0',
    population: '20000',
    residents: [],
    films: [],
    created: '2014-12-10T12:50:16.526000Z',
    edited: '2014-12-20T20:58:18.440000Z',
    url: 'https://swapi.dev/api/planets/13/'
  }

  describe('ngOnInit', () => {
    it('should set planets from getPlanets response body sorted by planet name ascending', () => {
      const response: PlanetsApiResponse = {
        count: 2,
        next: '',
        previous: '',
        results: [planet2, planet1]
      } as PlanetsApiResponse;

      planetServiceSpy.getPlanets.and.returnValue(of(response));

      setup();

      expect(component.planets.length).toEqual(2);
      expect(component.planets).toEqual([planet1, planet2]);
    });

    it('should set error to true if call to getPlanets returns error', () => {
      planetServiceSpy.getPlanets.and.returnValue(throwError(() => new Error('errorMessage')));

      setup();

      expect(component.error).toBeTrue()
    });
  });

  describe('getSurfaceAreaCoveredByWater', () => {
    it('should return unknown if surface_water is unknown', () => {
      setup();

      const diameter = '1';
      const surface_water = 'unknown';
      const surfaceArea = component.getSurfaceAreaCoveredByWater(diameter, surface_water);

      expect(surfaceArea).toEqual('unknown');
    });

    it('should calculate surface area rounded to nearest whole number if surface_water is valid number', () => {
      setup();

      const diameter = '100';
      const surface_water = '50';
      const surfaceArea = component.getSurfaceAreaCoveredByWater(diameter, surface_water);

      expect(surfaceArea).toEqual('15708');
    });
  });

  describe('template tests', () => {
    it('should render a table row for each planet', () => {
      setup();
      component.error = false;
      component.planets = [planet1, planet2];
      fixture.detectChanges();

      const table = fixture.debugElement.query(By.css('table'));
      const rows = table.queryAll(By.css('tr'));
      const planet1Row = rows[1];

      const planet1RowCells = planet1Row.queryAll(By.css('td'));

      expect(rows.length).toEqual(3);

      //check planet1 table row values
      expect(planet1RowCells[0].nativeElement.innerText).toEqual(planet1.name);
      expect(planet1RowCells[0].query(By.css('a')).nativeElement.href).toEqual(planet1.url);
      expect(planet1RowCells[1].nativeElement.innerText).toEqual(planet1.climate);
      expect(planet1RowCells[2].nativeElement.innerText).toEqual(planet1.residents.length.toString());
      expect(planet1RowCells[3].nativeElement.innerText).toEqual(planet1.terrain);
      expect(planet1RowCells[4].nativeElement.innerText).toEqual('20 000');
      expect(planet1RowCells[5].nativeElement.innerText).toEqual('55 417 694');
    });

    it('should display table when planet data is present and there is no error', () => {
      setup();
      component.error = false;
      component.planets = [planet1];
      fixture.detectChanges();

      const table = fixture.debugElement.query(By.css('table'));

      expect(table).toBeTruthy()
    });

    it('should not display table when no planet data is present', () => {
      setup();
      component.error = false;
      component.planets = [];
      fixture.detectChanges();

      const table = fixture.debugElement.query(By.css('table'));

      expect(table).toBeNull()
    });

    it('should not display table when error is present', () => {
      setup();
      component.error = true;
      component.planets = [{} as Planet];
      fixture.detectChanges();

      const table = fixture.debugElement.query(By.css('table'));

      expect(table).toBeNull()
    });

    it('should display error message when error is true, table and loading should not be displayed', () => {
      setup();
      component.error = true;
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.error-container'));
      const table = fixture.debugElement.query(By.css('table'));
      const loading = fixture.debugElement.query(By.css('.loading-container'));

      expect(error).toBeTruthy()
      expect(table).toBeNull()
      expect(loading).toBeNull()
    });

    it('should display loading message when no planets are present and there is no error', () => {
      setup();
      component.error = false;
      component.planets = [];
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.error-container'));
      const table = fixture.debugElement.query(By.css('table'));
      const loading = fixture.debugElement.query(By.css('.loading-container'));

      expect(error).toBeNull()
      expect(table).toBeNull()
      expect(loading).toBeTruthy()
    });

    it('should not display loading message when planets are present', () => {
      setup();
      component.error = false;
      component.planets = [planet1];
      fixture.detectChanges();

      const loading = fixture.debugElement.query(By.css('.loading-container'));

      expect(loading).toBeNull();
    });

    it('should not display loading message when there is an error', () => {
      setup();
      component.error = true;
      component.planets = [];
      fixture.detectChanges();

      const loading = fixture.debugElement.query(By.css('.loading-container'));

      expect(loading).toBeNull();
    });
  });
});
