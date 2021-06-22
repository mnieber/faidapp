import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ProjectT } from 'src/projects/types';
import { ProjectBanner, ProjectDescription } from 'src/projects/components';
import { MilestoneListView } from 'src/milestones/components';
import { Selection } from 'skandha-facets/Selection';
import { Highlight } from 'skandha-facets/Highlight';
import classnames from 'classnames';
import { HomeOutlined } from '@ant-design/icons';
import { getResourceView } from 'src/utils/components/getResourceView';

import './ProjectView.scss';

type PropsT = {};

type DefaultPropsT = {
  project: ProjectT;
  projectResUrl: string;
  milestonesSelection: Selection;
  milestonesHighlight: Highlight;
};

export const ProjectView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const resourceView = getResourceView({ resourceUrl: props.projectResUrl });
  if (resourceView) return resourceView;

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

  return (
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
});
