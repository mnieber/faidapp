import { HomeOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import { Highlight } from 'skandha-facets/Highlight';
import { Selection } from 'skandha-facets/Selection';
import { MilestoneListView } from 'src/milestones/components';
import { ProjectBanner, ProjectDescription } from 'src/projects/components';
import { ProjectT } from 'src/projects/types';
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

  const resourceView = getResourceView({ resUrl: props.projectResUrl });
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
