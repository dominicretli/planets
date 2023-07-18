import {Component, OnInit} from '@angular/core';
import {PlanetService} from '../../services/planet-service/planet.service';
import {Planet} from '../../models/planet';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  planets: Planet[] = [];
  error: boolean = false;

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
    this.planetService.getPlanets()
      .subscribe({
        next: (res) => {
          this.planets = res.results.sort((p1, p2) => p1.name.localeCompare(p2.name));
          this.error = false;
        },
        error: (error) => {
          this.error = true;
        }
      })
  }

  getSurfaceAreaCoveredByWater(diameter: string, surfaceWater: string): string {
    if (diameter === 'unknown' || surfaceWater === 'unknown') {
      return 'unknown';
    }

    const radius: number = parseFloat(diameter) / 2;
    const surfaceArea: number = 4 * Math.PI * Math.pow(radius, 2);

    const surfaceWaterAsFractionalMultiplier: number = parseFloat(surfaceWater) / 100;
    const result: number = Math.round(surfaceArea * surfaceWaterAsFractionalMultiplier);

    return result.toString();
  }

}
