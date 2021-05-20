import { Signal } from 'micro-signals';
import { erroredRS, loadingRS, updatedRS } from 'src/utils/RST';

export class ApiBase {
  signal: Signal<any> = new Signal();

  _dispatchLoading(topic: string) {
    this.signal.dispatch({
      topic,
      payload: {
        rs: loadingRS(),
      },
    });
    return Promise.resolve();
  }

  _dispatchPayload(topic: string, payload: any) {
    this.signal.dispatch({
      topic,
      payload: {
        ...payload,
        rs: updatedRS(),
      },
    });
  }

  _dispatchError(topic: string, error: string) {
    this.signal.dispatch({
      topic,
      payload: {
        rs: erroredRS(error),
      },
    });
  }
}
