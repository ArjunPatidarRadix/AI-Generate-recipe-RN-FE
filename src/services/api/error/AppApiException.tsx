export class AppApiException {
  message: string = '';
  retry: boolean = false;
  code: string = '-1';

  constructor(msg: string, errorCode?: string) {
    this.message = msg || '';
    this.code = errorCode || '-1';
  }
}
