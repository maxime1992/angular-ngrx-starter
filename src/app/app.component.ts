import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { LANGUAGES } from 'app/core/injection-tokens';
import { IStore } from 'app/shared/interfaces/store.interface';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import { getLanguage } from 'app/shared/states/ui/ui.selectors';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    @Inject(LANGUAGES) public languages,
    private store$: Store<IStore>
  ) {}

  ngOnInit() {
    const browserLanguage = this.translate.getBrowserLang();

    // if dev decided to use the browser language as default and if this language is handled by the app, use it
    const defaultLanguage =
      environment.useBrowserLanguageAsDefault &&
      this.languages.includes(browserLanguage)
        ? browserLanguage
        : this.languages[0];

    // default and fallback language
    // if a translation isn't found in a language,
    // it'll try to get it on the default language
    this.translate.setDefaultLang(defaultLanguage);
    this.store$.dispatch(
      new UiActions.SetLanguage({ language: defaultLanguage })
    );

    // when the language changes in store,
    // change it in translate provider
    this.store$
      .pipe(
        select(getLanguage),
        takeUntil(this.onDestroy$),
        filter(language => !!language),
        tap(language => this.translate.use(language))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
