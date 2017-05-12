import { AngularNgrxStarterPage } from './app.po';

describe('angular-ngrx-starter App', () => {
  let page: AngularNgrxStarterPage;

  beforeEach(() => {
    page = new AngularNgrxStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
