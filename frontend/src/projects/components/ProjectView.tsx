import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ResourceView } from 'src/utils/components';
import { RST } from 'src/utils/RST';
import { ProjectT } from 'src/projects/types';
import { ProjectBanner, ProjectDescription } from 'src/projects/components';
import { MilestoneListView } from 'src/milestones/components';
import { Selection } from 'skandha-facets/Selection';
import classnames from 'classnames';
import { HomeOutlined } from '@ant-design/icons';

type PropsT = {};

type DefaultPropsT = {
  project: ProjectT;
  milestonesSelection: Selection;
  projectRS: RST;
};

export const ProjectView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const projectAsMilestone = (
    <div
      key="projectAsMilestone"
      className={classnames('MilestoneListViewItem flex flex-row mb-2')}
      onMouseDown={action(() => {
        props.milestonesSelection.selectItem({ itemId: undefined });
      })}
    >
      <HomeOutlined className="MilestonesListViewItem__Icon" />
    </div>
  );

  const updatedDiv = (
    <div className="ProjectView flex flex-col w-full">
      <ProjectBanner className="mb-2" />
      <MilestoneListView prefixDivs={[projectAsMilestone]} />
      <ProjectDescription />
    </div>
  );

  return (
    <ResourceView
      rs={props.projectRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="">{message}</div>;
      }}
    />
  );
});
