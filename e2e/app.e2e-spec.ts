import { TechnicalSupportAngularPage } from './app.po';

describe('technical-support-angular App', () => {
  let page: TechnicalSupportAngularPage;

  beforeEach(() => {
    page = new TechnicalSupportAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
