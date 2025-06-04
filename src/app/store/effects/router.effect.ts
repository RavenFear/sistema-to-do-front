import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import {Actions, ofType, createEffect} from "@ngrx/effects";
import * as RouterActions from "./../actions/router.action";

import {map, tap} from "rxjs/operators";

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private location: Location,
        private router: Router
    ) {
    }

    // @Effect({ dispatch: false })
    // navigate$ = this.actions$.pipe(
    //     ofType(RouterActions.GO),
    //     map((action: RouterActions.Go) => action.payload),
    //     tap(({ path, query: queryParams, extras }) => {
    //         this.router.navigate(path, { queryParams, ...extras });
    //     })
    // );

    navigate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.GO),
                map((action: RouterActions.Go) => action.payload),
                tap(({path, query: queryParams, extras}) => {
                    this.router.navigate(path, {queryParams, ...extras});
                })
            ),
        {dispatch: false}
    );

    //   @Effect({ dispatch: false })
    //   navigateBack$ = this.actions$.pipe(
    //     ofType(RouterActions.BACK),
    //     tap(() => this.location.back())
    //   );

    navigateBack$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.BACK),
                tap(() => this.location.back())
            ),
        {dispatch: false}
    );

    //   @Effect({ dispatch: false })
    //   navigateForward$ = this.actions$.pipe(
    //     ofType(RouterActions.FORWARD),
    //     tap(() => this.location.forward())
    //   );

    navigateForward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.FORWARD),
                tap(() => this.location.forward())
            ),
        {dispatch: false}
    );
}
