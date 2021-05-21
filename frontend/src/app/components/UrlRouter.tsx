import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createBrowserHistory } from 'history';
import { ProjectView, LoadProjectEffect } from 'src/projects/components';
import { ProjectStateProvider } from 'src/projects/components';
import { MilestonesStateProvider } from 'src/milestones/components';

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <Switch>
        <ProjectStateProvider>
          <MilestonesStateProvider>
            <Route path="/projects/:projectSlug">
              <LoadProjectEffect />
              <ProjectView />
            </Route>
          </MilestonesStateProvider>
        </ProjectStateProvider>
      </Switch>
    </Router>
  );
});
