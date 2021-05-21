import { observer } from 'mobx-react-lite';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ResourceView } from 'src/utils/components';
import { RST } from 'src/utils/RST';
import { ProjectT } from 'src/projects/types';
import { ProjectBanner } from 'src/projects/components';
import { MilestoneListView } from 'src/milestones/components';

type PropsT = {};

type DefaultPropsT = {
  project: ProjectT;
  projectRS: RST;
};

export const ProjectView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const updatedDiv = (
    <div className="ProjectView flex flex-col w-full">
      <ProjectBanner />
      <MilestoneListView />
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
