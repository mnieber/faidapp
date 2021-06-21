import { Api } from 'src/api/Api';

export const storeConnectsToApi = (store: any, api: Api) => {
  api.signal.add((event) => {
    const [, queryName] = event.topic.split('.');
    store.onLoadData(event, event.state, queryName);
  });
};
