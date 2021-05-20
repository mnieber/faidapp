import { Api } from 'src/api/Api';

export const storeConnectsToApi = (store: any, api: Api) => {
  api.signal.add((event) => {
    store.onLoadData(event);
  });
};
