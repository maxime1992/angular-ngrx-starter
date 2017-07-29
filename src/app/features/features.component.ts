import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IUi } from 'app/shared/states/ui/ui.interface';
import { LANGUAGES } from '../core/injection-tokens';
import { IStore } from '../shared/interfaces/store.interface';
import * as UiActions from './../shared/states/ui/ui.actions';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<void>();

  public ui$: Observable<IUi>;

  public language$: Observable<string>;
  public language: string;

  public isSidenavOpened: boolean;
  public sidenavType: 'over' | 'side';

  constructor(
    @Inject(LANGUAGES) public languages,
    private store$: Store<IStore>,
    private media: ObservableMedia
  ) {}

  ngOnInit() {
    this.ui$ = this.store$.select(state => state.ui);

    this.language$ = this.store$.select(state => state.ui.language);

    this.language$
      .takeUntil(this.componentDestroyed$)
      .do(language => {
        this.language = language;
      })
      .subscribe();

    this.media
      .asObservable()
      .takeUntil(this.componentDestroyed$)
      .map((change: MediaChange) => change.mqAlias as 'xs' | 'sm' | 'md' | 'lg')
      .distinctUntilChanged()
      .do(size => {
        if (size === 'xs' || size === 'sm') {
          this.closeSidenav();
          this.sidenavType = 'over';
        } else {
          this.isSidenavOpened = true;
          this.openSidenav();
          this.sidenavType = 'side';
        }
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
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

  isSmallScreen() {
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      return true;
    }

    return false;
  }
}
