import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { merge } from 'lodash/fp';

import { useSearchParams } from 'src/utils/useSearchParams';
import { ObjT } from 'src/utils/types';

interface IProps<ArgsT> {
  f: (args: ArgsT) => void | (() => void);
  getArgs: (args: ObjT) => ArgsT;
}

export const Effect: <ArgsT>(props: IProps<ArgsT>) => React.ReactElement =
  observer(({ f, getArgs }) => {
    const params = useParams();
    const { all: search_params } = useSearchParams();
    const args = getArgs(merge(params, search_params));

    useDeepCompareEffect(() => {
      const cleanUpFunction = f(args);
      return cleanUpFunction;
    }, [f, args]);
    return <React.Fragment />;
  });

export const EffectWithoutArgs: (props: {
  f: () => void;
}) => React.ReactElement = observer(({ f }) => {
  useDeepCompareEffect(() => {
    const cleanUpFunction = f();
    return cleanUpFunction;
  }, [f]);
  return <React.Fragment />;
});
