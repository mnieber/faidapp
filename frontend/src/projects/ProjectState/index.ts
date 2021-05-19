import { setCallbacks } from 'aspiration';
import {
  facet,
  getm,
  cleanUpCtr,
  mapDataToFacet,
  installPolicies,
  registerFacets,
  ClassMemberT as CMT,
} from 'skandha';
import { makeCtrObservable } from 'skandha-mobx';
import { getIds } from 'src/utils/ids';
import * as Facets from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';

import { Inputs } from 'src/projects/ProjectState/facets/Inputs';
import { Outputs } from 'src/projects/ProjectState/facets/Outputs';
import * as Policies from './policies';
import * as Handlers from './handlers';

type PropsT = {};

export class ProjectState {
  @facet inputs = new Inputs();
  @facet outputs = new Outputs();

  destroy() {}

  constructor(props: PropsT) {
    registerFacets(this, {});
    makeObservable(this);
  }
}
