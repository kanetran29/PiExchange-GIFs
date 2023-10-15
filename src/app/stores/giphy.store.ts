import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { switchMap, tap } from 'rxjs';
import { GiphyArrayResponse, GiphyGif } from '../interfaces/giphy.interface';
import { GiphyService } from '../services/giphy.service';
import { ApiStatus } from '../types/api-status.type';

interface GiphyFormState {
    trendingGIFs: GiphyGif[];
    searchedGIFs: GiphyGif[];
    selectedGIF?: GiphyGif;
    // api status
    getTrendingGIFsApiStatus: ApiStatus;
    searchedGIFsApiStatus: ApiStatus;
    getSelectedGIFApiStatus: ApiStatus;
}

@Injectable({
    providedIn: 'root'
})
export class GiphyStore extends ImmerComponentStore<GiphyFormState> {
    // #region Selector
    readonly getTrendingGIFs$ = this.select(({ trendingGIFs }) => trendingGIFs);
    readonly getTrendingGIFsApiStatus$ = this.select(({ getTrendingGIFsApiStatus }) => getTrendingGIFsApiStatus);

    readonly getSearchedGIFs$ = this.select(({ searchedGIFs }) => searchedGIFs);
    readonly getSearchedGIFsApiStatus$ = this.select(({ searchedGIFsApiStatus }) => searchedGIFsApiStatus);
    // #endregion

    // #region Effect
    readonly getTrendingGIFs = this.effect<number>((event$) =>
        event$.pipe(
            tap(() => {
                this.patchState({
                    getTrendingGIFsApiStatus: 'loading',
                });
            }),
            switchMap((pageIndex: number) => this.GiphyService.getTrending(pageIndex)),
            tapResponse(
                (res: GiphyArrayResponse) => {
                    this.patchState({
                        trendingGIFs: this.get().trendingGIFs.concat(res.data),
                        getTrendingGIFsApiStatus: 'succeeded',
                    });
                },
                (err: HttpErrorResponse) => {
                    this.patchState({
                        getTrendingGIFsApiStatus: 'failed',
                    });
                    console.error(err);
                }
            )
        )
    );

    readonly searchGIFs = this.effect<string>((event$) =>
        event$.pipe(
            tap(() => {
                this.patchState({
                    searchedGIFsApiStatus: 'loading',
                });
            }),
            switchMap((searchQuery) => this.GiphyService.search(searchQuery)),
            tapResponse(
                (res: GiphyArrayResponse) => {
                    this.patchState({
                        searchedGIFs: res.data,
                        searchedGIFsApiStatus: 'succeeded',
                    });
                },
                (err: HttpErrorResponse) => {
                    this.patchState({
                        searchedGIFsApiStatus: 'failed',
                    });
                    console.error(err);
                }
            )
        )
    );

    readonly loadSearchedGIFsNextPage = this.effect<{ searchQuery: string; pageIndex: number }>((event$) =>
        event$.pipe(
            tap(() => {
                this.patchState({
                    searchedGIFsApiStatus: 'loading',
                });
            }),
            switchMap(({ searchQuery, pageIndex }) => this.GiphyService.search(searchQuery, pageIndex)),
            tapResponse(
                (res: GiphyArrayResponse) => {
                    this.patchState({
                        searchedGIFs: this.get().searchedGIFs.concat(res.data),
                        searchedGIFsApiStatus: 'succeeded',
                    });
                },
                (err: HttpErrorResponse) => {
                    this.patchState({
                        searchedGIFsApiStatus: 'failed',
                    });
                    console.error(err);
                }
            )
        )
    );

    // #endregion

    constructor(
        private GiphyService: GiphyService,
    ) {
        super({
            trendingGIFs: [],
            searchedGIFs: [],
            selectedGIF: undefined,
            // api status
            getTrendingGIFsApiStatus: null,
            searchedGIFsApiStatus: null,
            getSelectedGIFApiStatus: null,
        });
    }
}
