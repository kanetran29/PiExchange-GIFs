import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GIPHY } from '../constants/giphy.const';
import { GiphyArrayResponse } from '../interfaces/giphy.interface';

@Injectable({
    providedIn: 'root'
})
export class GiphyService {
    constructor(private http: HttpClient) { }

    /**
     * The function `getTrending` retrieves trending Giphy images from the Giphy API based on the
     * specified page index.
     * @param [pageIndex=0] - pageIndex is the index of the page of trending GIFs that you want to
     * retrieve. It is used to calculate the offset for the API request. The offset determines the
     * starting position of the GIFs to be returned in the response.
     * @returns an Observable of type GiphyArrayResponse.
     */
    getTrending(pageIndex = 0): Observable<GiphyArrayResponse> {
        const url = `${GIPHY.API_URL}${GIPHY.TRENDING}?api_key=${GIPHY.API_KEY}`;
        const params = this.fromObjectToParams({
            ...GIPHY.TRENDING_PARAMS,
            offset: pageIndex * GIPHY.TRENDING_PARAMS.limit
        });
        //return this.http.get<GiphyArrayResponse>(`/assets/mocks/trending-${pageIndex}.mock.json`);
        return this.http.get<GiphyArrayResponse>(url, { params: params });
    }
    // TODO: Implement cached search
    /**
     * The function performs a search query using the GIPHY API and returns an Observable of type
     * GiphyArrayResponse.
     * @param {string} searchQuery - The search query is the term or phrase that you want to search for
     * in the Giphy API. It can be any string value.
     * @param [pageIndex=0] - The pageIndex parameter is used to specify the page number of the search
     * results. It is an optional parameter with a default value of 0. By multiplying the pageIndex
     * with the limit parameter, it determines the offset of the search results.
     * @returns an Observable of type GiphyArrayResponse.
     */
    search(searchQuery: string, pageIndex = 0): Observable<GiphyArrayResponse> {
        const url = `${GIPHY.API_URL}${GIPHY.SEARCH}?api_key=${GIPHY.API_KEY}`;
        const params = this.fromObjectToParams({
            ...GIPHY.SEARCH_PARAMS,
            q: searchQuery,
            offset: pageIndex * GIPHY.SEARCH_PARAMS.limit
        });
        return this.http.get<GiphyArrayResponse>(url, { params });
    }


    /* UTIL */
    /**
     * The function converts an object into HttpParams for use in an HTTP request.
     * @param obj - A JavaScript object that contains key-value pairs.
     * @returns an instance of the HttpParams class.
     */
    private fromObjectToParams(obj: Record<string, any>): HttpParams {
        const params = new HttpParams({
            fromObject: obj
        });
        return params;
    }
}
