import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ResourceView } from 'src/utils/components';
import { RST } from 'src/utils/RST';
import { ProjectT } from 'src/projects/types';
import { ProjectBanner, ProjectDescription } from 'src/projects/components';
import { MilestoneListView } from 'src/milestones/components';
import { Selection } from 'skandha-facets/Selection';
import { Highlight } from 'skandha-facets/Highlight';
import classnames from 'classnames';
import { HomeOutlined } from '@ant-design/icons';

import './ProjectView.scss';

type PropsT = {};

type DefaultPropsT = {
  project: ProjectT;
  milestonesSelection: Selection;
  milestonesHighlight: Highlight;
  projectRS: RST;
};

export const ProjectView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const projectAsMilestone = (
    <div
      key="projectAsMilestone"
      className={classnames('MilestoneListViewItem flex flex-row', {
        'MilestonesListViewItem--highlighted':
          props.milestonesHighlight.item === undefined,
      })}
      onMouseDown={action(() => {
        props.milestonesSelection.selectItem({ itemId: undefined });
      })}
    >
      <HomeOutlined className="MilestonesListViewItem__Icon" />
    </div>
  );

  const updatedDiv = (
    <div className="ProjectView flex flex-col w-full">
      <ProjectBanner className="mb-4" />
      <div className="ProjectView__body">
        <MilestoneListView
          prefixDivs={[projectAsMilestone]}
          className="justify-center"
        />
        <ProjectDescription />
      </div>
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
