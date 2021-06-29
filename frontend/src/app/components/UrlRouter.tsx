import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { LoadProjectEffect } from 'src/api/components';
import { MilestonesStateProvider } from 'src/milestones/components';
import { ProjectStateProvider, ProjectView } from 'src/projects/components';

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
