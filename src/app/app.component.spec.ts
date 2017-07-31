import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LANGUAGES } from 'app/core/injection-tokens';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
          { provide: TranslateService, useClass: TranslateMockService },
          { provide: LANGUAGES, useValue: ['en', 'fr'] },
          { provide: Store, useClass: StoreMockService },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(
    async(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    })
  );

  it(
    'should set the lang by using the one from the browser if the environment variable for that is true',
    inject(
      [TranslateService, Store],
      (translateService: TranslateMockService, store: StoreMockService) => {
        spyOn(translateService, 'getBrowserLang').and.callThrough();
        spyOn(translateService, 'setDefaultLang');
        spyOn(translateService, 'use');
        spyOn(store, 'dispatch');
        spyOn(store, 'select').and.callThrough();

        // simulate that the browser is set to english by default
        translateService.browserLang = 'en';

        store.updateStore({
          ui: { language: 'en' },
        });

        // calling detectChanges for the first time will trigger the ngOnInit
        fixture.detectChanges();

        expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
        expect(store.dispatch).toHaveBeenCalledWith(
          new UiActions.SetLanguage({ language: 'en' })
        );

        expect(store.select).toHaveBeenCalled();
        expect(translateService.use).toHaveBeenCalledWith('en');
      }
    )
  );
});

@Injectable()
export class TranslateMockService {
  browserLang: string;

  getBrowserLang() {
    return this.browserLang;
  }

  setDefaultLang(defaultLang: string) {}

  use(lang: string) {}
}

@Injectable()
export class StoreMockService extends BehaviorSubject<any> {
  value: any;

  // as we extend BehaviorSubject, we have access to the `value` property
  constructor() {
    super(null);
  }

  dispatch(action: any) {}

  select(fn) {
    return this.map(fn);
  }

  updateStore(state) {
    this.next(state);
  }
}
