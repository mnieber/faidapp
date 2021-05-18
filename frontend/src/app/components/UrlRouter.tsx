import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createBrowserHistory } from 'history';
import { projectPageView } from 'src/projects/components'
import { milestoneListView } from 'src/milestones/components'

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/projectPage/">
          <ProjectPageView/>
        </Route>
        <Route path="/milestonelistview/">
          <MilestoneListView/>
        </Route>
      </Switch>
    </Router>
  );
});