import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import * as UiActions from 'app/shared/states/ui/ui.actions';
import { IStore } from 'app/shared/interfaces/store.interface';
import { LANGUAGES } from 'app/core/injection-tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(
    private _translate: TranslateService,
    @Inject(LANGUAGES) public languages,
    private _store$: Store<IStore>
  ) { }

  ngOnInit() {
    // default and fallback language
    // if a translation isn't found in a language,
    // it'll try to get it on the default language
    // by default here, we take the first of the array
    this._translate.setDefaultLang(this.languages[0]);
    this._store$.dispatch(new UiActions.SetLanguage({ language: this.languages[0] }));

    // when the language changes in store,
    // change it in translate provider
    this._store$
      .select(state => state.ui.language)
      .takeUntil(this.onDestroy$)
      .filter(language => !!language)
      .do(language => this._translate.use(language))
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
