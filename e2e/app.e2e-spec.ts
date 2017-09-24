import { by, element } from 'protractor';

import { AngularNgrxStarterPage } from './app.po';

describe(`angular-ngrx-starter App`, () => {
  let page: AngularNgrxStarterPage;

  beforeEach(() => {
    page = new AngularNgrxStarterPage();
  });

  it(`should display a paragraph with "Some content"`, () => {
    page.navigateTo();

    expect(element(by.cssContainingText(`p`, `Some content`)).isPresent()).toBe(
      true
    );
  });
});
