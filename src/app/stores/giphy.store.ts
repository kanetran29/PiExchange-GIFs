import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { switchMap, tap } from 'rxjs';
import { GiphyArrayResponse, GiphyGif, GiphyObjectResponse } from '../interfaces/giphy.interface';
import { GiphyService } from '../services/giphy.service';
import { ApiStatus } from '../types/api-status.type';

interface GiphyFormState {
    trendingGIFs: GiphyGif[];
    searchedGIFs: GiphyGif[];
    selectedGIF?: GiphyGif;
    // api status
    getTrendingGIFsApiStatus: ApiStatus;
    searchGIFsApiStatus: ApiStatus;
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
    readonly getSearchGIFsApiStatus$ = this.select(({ searchGIFsApiStatus }) => searchGIFsApiStatus);

    readonly getSelectedGIF$ = this.select(({ selectedGIF }) => selectedGIF);
    readonly getSelectedGIFApiStatus$ = this.select(({ getSelectedGIFApiStatus }) => getSelectedGIFApiStatus);
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
                    searchGIFsApiStatus: 'loading',
                });
            }),
            switchMap((searchQuery: string) => this.GiphyService.search(searchQuery)),
            tapResponse(
                (res: GiphyArrayResponse) => {
                    this.patchState({
                        searchedGIFs: res.data,
                        searchGIFsApiStatus: 'succeeded',
                    });
                },
                (err: HttpErrorResponse) => {
                    this.patchState({
                        searchGIFsApiStatus: 'failed',
                    });
                    console.error(err);
                }
            )
        )
    );

    readonly getSelectedGIF = this.effect<string>((event$) =>
        event$.pipe(
            tap(() => {
                this.patchState({
                    getSelectedGIFApiStatus: 'loading',
                });
            }),
            switchMap((id: string) => this.GiphyService.getById(id)),
            tapResponse(
                (res: GiphyObjectResponse) => {
                    this.patchState({
                        selectedGIF: res.data,
                        getSelectedGIFApiStatus: 'succeeded',
                    });
                },
                (err: HttpErrorResponse) => {
                    this.patchState({
                        getSelectedGIFApiStatus: 'failed',
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
            searchGIFsApiStatus: null,
            getSelectedGIFApiStatus: null,
        });
    }
}
