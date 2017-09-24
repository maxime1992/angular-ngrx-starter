import { IUi } from 'app/shared/states/ui/ui.interface';

export function uiInitialState(): IUi {
  return {
    language: '',
    isSidenavVisible: true,
  };
}
