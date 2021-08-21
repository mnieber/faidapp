import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { concat } from 'ramda';
import React from 'react';
import { FC, useDefaultProps } from 'react-default-props-context';
import Slider from 'react-slick';
import { Highlight } from 'skandha-facets/Highlight';
import { Selection } from 'skandha-facets/Selection';
import { ContentView } from 'src/content/components';
import { MilestoneT } from 'src/milestones/types';
import { ProjectT } from 'src/projects/types';
import { useSyncCarouselHeader } from 'src/utils/useSyncCarouselHeader';
import './ProjectDescriptionView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  project?: ProjectT;
  milestones: MilestoneT[];
  milestonesSelection: Selection;
  milestonesHighlight: Highlight;
};

export const ProjectDescriptionView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const [showExpanded, setShowExpanded] = React.useState(false);
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);
    const slider = React.useRef(null);
    const project = props.project;

    if (!project) {
      return <div />;
    }

    const idx =
      props.milestonesSelection.selectableIds && props.milestonesHighlight.id
        ? 1 +
          props.milestonesSelection.selectableIds.indexOf(
            props.milestonesHighlight.id
          )
        : 0;

    useSyncCarouselHeader(slider, idx);

    const onScroll: React.UIEventHandler<HTMLDivElement> = () => {
      setShowExpanded(true);
    };

    const descriptions = concat([undefined], props.milestones).map(
      (milestone, idx) => {
        const rawContent =
          milestone === undefined ? project.content : milestone.content;

        const content = JSON.parse(rawContent);
        return <ContentView key={idx} content={content.description} />;
      }
    );
    // TODO: Implement ProjectDescription
    return (
      <div
        className={classnames(
          'ProjectDescription flex flex-col w-full',
          { 'ProjectDescription--expanded': showExpanded },
          props.className
        )}
        onScroll={onScroll}
      >
        <Slider
          arrows={false}
          dots={false}
          fade={true}
          infinite={false}
          speed={500}
          draggable={false}
          slidesToShow={1}
          slidesToScroll={1}
          ref={slider}
        >
          {descriptions}
        </Slider>
      </div>
    );
  }
);
