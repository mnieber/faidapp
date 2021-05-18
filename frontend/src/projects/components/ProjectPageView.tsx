import React from 'react';
import { observer } from 'mobx-react-lite';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ResourceView } from 'src/utils/components';
import { RST } from 'src/utils/RST';
import { ProjectPageT } from 'src/projects/types'

type PropsT = {
};

type DefaultPropsT = {
  projectPage: ProjectPageT
  projectPageRS: RST
};

export const ProjectPageView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const updatedDiv = (
    <div className="ProjectPageView flex flex-col w-full">
      To do: show projectPage with name {props.projectPage.name}
    </div>
  );

  return (
    <ResourceView
      rs={props.projectPageRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="text-white">{message}</div>;
      }}
    />
  );
});