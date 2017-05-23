import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { LANGUAGES } from '../core/injection-tokens';
import { IStore } from '../shared/interfaces/store.interface';
import * as UiActions from './../shared/states/ui/ui.actions';
import { IUi } from 'app/shared/states/ui/ui.interface';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<void>();

  public ui$: Observable<IUi>;

  public language$: Observable<string>;
  public language: string;

  constructor(
    @Inject(LANGUAGES) public languages,
    private store$: Store<IStore>
  ) { }

  ngOnInit() {
    this.ui$ = this.store$.select(state => state.ui);

    this.language$ = this.store$.select(state => state.ui.language);

    this
      .language$
      .takeUntil(this.componentDestroyed$)
      .do(language => {
        this.language = language;
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
}
