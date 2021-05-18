import { setCallbacks } from 'aspiration';
import {
  facet,
  getm,
  cleanUpCtr,
  mapDataToFacet,
  facet,
  installPolicies,
  registerFacets,
  ClassMemberT as CMT,
} from 'skandha';
import { makeCtrObservable } from 'skandha-mobx';
import { getIds } from 'src/utils/ids';
import * as Facets from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';
import { Selection, SelectionCbs, handleSelectItem } from 'skandha-facets/Selection'
import { Highlight, HighlightCbs } from 'skandha-facets/Highlight'

import { MetricsStore } from 'src/metrics/MetricsStore';
import { Inputs } from 'src/metrics/MetricsState/facets/Inputs';
import { Outputs } from 'src/metrics/MetricsState/facets/Outputs';
import * as Policies from './policies';
import * as Handlers from './handlers';

type PropsT = {
  metricsStore: MetricsStore;
};

export class MetricsState {
  @facet inputs = new Inputs();
  @facet outputs = new Outputs();
  metrics = {
    selection: new Selection(),
    highlight: new Highlight(),
  };

  _setMetricsCallbacks(props: PropsT) {
    const ctr = this.metrics;
      setCallbacks(ctr.selection, {
      selectItem: {
        selectItem(this: SelectionCbs['selectItem']) {
          handleSelectItem(ctr.selection, this.selectionParams);
          FacetPolicies.highlightFollowsSelection(
            ctr.selection,
            this.selectionParams
          );
        }
      },
    } as SelectionCbs);
      setCallbacks(ctr.highlight, {
    } as HighlightCbs);
  }
  

  _applyMetricsPolicies(props: PropsT) {
    const Inputs_items = [Inputs, 'metrics', this] as CMT;
    const Outputs_display = [Outputs, 'metricsDisplay', this] as CMT;
    const Outputs_itemById = [Outputs, 'metricById', this] as CMT;


    const policies = [
      mapDataToFacet(Outputs_display, getm(Inputs_items)),
      // selection
      Facets.selectionUsesSelectableIds(getm(Outputs_display), getIds),
      Facets.selectionUsesItemLookUpTable(getm(Outputs_itemById)),
      // highlight
      Facets.highlightUsesItemLookUpTable(getm(Outputs_itemById)),
    ];

    installPolicies(policies, this.metrics);
  }


  destroy() {
    cleanUpCtr(this.metrics);
  }

  constructor(props: PropsT) {
    registerFacets(this, {});
    makeObservable(this);

    registerFacets(this.metrics, { name: 'Metrics' });
    this._setMetricsCallbacks(props);
    this._applyMetricsPolicies(props);
    makeCtrObservable(this.metrics);

  }
}