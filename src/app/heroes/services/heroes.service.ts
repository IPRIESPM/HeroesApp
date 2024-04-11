import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({
	providedIn: 'root',
})
export class HeroesService {
	private readonly baseUrl: string = environment.baseUrl;

	constructor(private readonly httpClient: HttpClient) {}

	getHeroes(): Observable<Hero[]> {
		return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
	}
}
