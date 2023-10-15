import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GIPHY } from '../constants/giphy.const';
import { GiphyArrayResponse, GiphyObjectResponse } from '../interfaces/giphy.interface';

@Injectable({
    providedIn: 'root'
})
export class GiphyService {
    constructor(private http: HttpClient) { }

    getTrending(pageIndex = 0): Observable<GiphyArrayResponse> {
        const url = `${GIPHY.API_URL}${GIPHY.TRENDING}?api_key=${GIPHY.API_KEY}`;
        const params = this.fromObjectToParams({
            ...GIPHY.TRENDING_PARAMS,
            offset: pageIndex * GIPHY.TRENDING_PARAMS.limit
        });
        return this.http.get<GiphyArrayResponse>(`/assets/mocks/trending-${pageIndex}.mock.json`);
        //return this.http.get<GiphyArrayResponse>(url, { params: params });
    }

    search(searchQuery: string, pageIndex = 0): Observable<GiphyArrayResponse> {
        const url = `${GIPHY.API_URL}${GIPHY.SEARCH}?api_key=${GIPHY.API_KEY}`;
        const params = this.fromObjectToParams({
            ...GIPHY.SEARCH_PARAMS,
            q: searchQuery,
            offset: pageIndex * GIPHY.SEARCH_PARAMS.limit
        });
        return this.http.get<GiphyArrayResponse>(url, { params });
    }

    getById(id: string): Observable<GiphyObjectResponse> {
        const url = `${GIPHY.API_URL}/${id}?api_key=${GIPHY.API_KEY}`;
        const params = this.fromObjectToParams(GIPHY.GET_BY_ID_PARAMS);
        return this.http.get<GiphyObjectResponse>(url, { params });
    }


    /* UTIL */
    private fromObjectToParams(obj: Record<string, any>): HttpParams {
        const params = new HttpParams({
            fromObject: obj
        });
        return params;
    }
}
