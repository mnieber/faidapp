export function listToItemById(qsList: Array<any>, key: string = 'id') {
  const result: any = {};
  qsList.forEach((item) => {
    result[item[key]] = item;
  });
  return result;
}

export function getIds(x: Array<any>): Array<string> {
  return x.map((x) => x.id);
}

export const lookUp = (keys: Array<any>, obj: any): Array<any> => {
  return keys.map((x) => obj[x]);
};
