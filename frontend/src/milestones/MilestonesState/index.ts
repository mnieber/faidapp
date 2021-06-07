import { setCallbacks } from 'aspiration';
import {
  facet,
  getm,
  mapDataToFacet,
  installPolicies,
  registerFacets,
  ClassMemberT as CMT,
} from 'skandha';
import { cleanUpCtr } from 'react-default-props-context';
import { makeCtrObservable } from 'skandha-mobx';
import { getIds } from 'src/utils/ids';
import * as Facets from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';
import {
  Selection,
  SelectionCbs,
  handleSelectItem,
} from 'skandha-facets/Selection';
import { Highlight, HighlightCbs } from 'skandha-facets/Highlight';

import { MilestonesStore } from 'src/milestones/MilestonesStore';
import { Inputs } from 'src/milestones/MilestonesState/facets/Inputs';
import { Outputs } from 'src/milestones/MilestonesState/facets/Outputs';

type PropsT = {
  milestonesStore: MilestonesStore;
};

export class MilestonesState {
  @facet inputs = new Inputs();
  @facet outputs = new Outputs();
  milestones = {
    selection: new Selection(),
    highlight: new Highlight(),
  };

  _setMilestonesCallbacks(props: PropsT) {
    const ctr = this.milestones;
    setCallbacks(ctr.selection, {
      selectItem: {
        selectItem(this: SelectionCbs['selectItem']) {
          handleSelectItem(ctr.selection, this.selectionParams);
          FacetPolicies.highlightFollowsSelection(
            ctr.selection,
            this.selectionParams
          );
        },
      },
    } as SelectionCbs);
    setCallbacks(ctr.highlight, {} as HighlightCbs);
  }

  _applyMilestonesPolicies(props: PropsT) {
    const Inputs_items = [Inputs, 'milestones', this] as CMT;
    const Outputs_display = [Outputs, 'milestonesDisplay', this] as CMT;
    const Outputs_itemById = [Outputs, 'milestoneById', this] as CMT;

    const policies = [
      mapDataToFacet(Outputs_display, getm(Inputs_items)),
      // selection
      Facets.selectionUsesSelectableIds(getm(Outputs_display), getIds),
      Facets.selectionUsesItemLookUpTable(getm(Outputs_itemById)),
      // highlight
      Facets.highlightUsesItemLookUpTable(getm(Outputs_itemById)),
    ];

    installPolicies(policies, this.milestones);
  }

  destroy() {
    cleanUpCtr(this.milestones);
  }

  constructor(props: PropsT) {
    registerFacets(this, {});

    registerFacets(this.milestones, { name: 'Milestones' });
    this._setMilestonesCallbacks(props);
    this._applyMilestonesPolicies(props);
    makeCtrObservable(this.milestones);

    // Finally, make this container observable
    makeCtrObservable(this);
  }
}
