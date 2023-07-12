import {Planet} from './planet';

export interface PlanetsApiResponse {
  count: number
  next: string
  previous: any
  results: Planet[]
}
