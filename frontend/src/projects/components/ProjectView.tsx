import React from 'react';
import { observer } from 'mobx-react-lite';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ResourceView } from 'src/utils/components';
import { RST } from 'src/utils/RST';
import { ProjectT } from 'src/projects/types';

type PropsT = {};

type DefaultPropsT = {
  project: ProjectT;
  projectRS: RST;
};

export const ProjectView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const updatedDiv = (
    <div className="ProjectView flex flex-col w-full">
      To do: show project with name {props.project?.name}
    </div>
  );

  return (
    <ResourceView
      rs={props.projectRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="text-white">{message}</div>;
      }}
    />
  );
});
