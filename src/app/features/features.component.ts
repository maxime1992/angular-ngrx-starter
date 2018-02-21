import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { LANGUAGES } from 'app/core/injection-tokens';
import { IStore } from 'app/shared/interfaces/store.interface';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import { IUi } from 'app/shared/states/ui/ui.interface';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public ui$: Observable<IUi>;

  public language$: Observable<string>;
  public language: string;

  public isSidenavOpened: boolean;
  public sidenavType: 'over' | 'side';

  constructor(
    @Inject(LANGUAGES) public languages,
    private store$: Store<IStore>,
    private media: ObservableMedia
  ) {
    // if we move this block into ngOnInit, it doesn't get fired the first time
    // this is probably an issue with flexLayout
    this.media
      .asObservable()
      .pipe(
        takeUntil(this.onDestroy$),
        map(
          (change: MediaChange) => change.mqAlias as 'xs' | 'sm' | 'md' | 'lg'
        ),
        distinctUntilChanged(),
        tap(size => {
          if (size === 'xs' || size === 'sm') {
            this.closeSidenav();
            this.sidenavType = 'over';
          } else {
            this.isSidenavOpened = true;
            this.openSidenav();
            this.sidenavType = 'side';
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.ui$ = this.store$.pipe(select(state => state.ui));

    this.language$ = this.store$.pipe(select(state => state.ui.language));

    this.language$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(language => (this.language = language))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openSidenav() {
    this.store$.dispatch(new UiActions.OpenSidenav());
  }

  closeSidenav() {
    this.store$.dispatch(new UiActions.CloseSidenav());
  }

  toggleSidenav() {
    this.store$.dispatch(new UiActions.ToggleSidenav());
  }

  setLanguage(language: string) {
    this.store$.dispatch(new UiActions.SetLanguage({ language }));
  }
}
