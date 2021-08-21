import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { LoadProjectBySlugEffect } from 'src/api/components';
import { AuthSwitch } from 'src/auth/components';
import { ProjectStateProvider, ProjectView } from 'src/projects/components';

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <AuthSwitch />
      <Route path="/projects/:projectSlug">
        <ProjectStateProvider>
          <LoadProjectBySlugEffect />
          <ProjectView />
        </ProjectStateProvider>
      </Route>
    </Router>
  );
});
