import { IUi } from './ui.interface';

export function uiInitialState(): IUi {
  return {
    language: '',
    isSidenavVisible: true,
  };
}
