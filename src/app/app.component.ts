import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import * as UiActions from 'app/shared/states/ui/ui.actions';
import { IStore } from 'app/shared/interfaces/store.interface';
import { LANGUAGES } from 'app/core/injection-tokens';
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
      .select(state => state.ui.language)
      .takeUntil(this.onDestroy$)
      .filter(language => !!language)
      .do(language => this.translate.use(language))
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
