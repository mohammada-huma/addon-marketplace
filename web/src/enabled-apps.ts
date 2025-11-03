import {
  bootstrapStandaloneApps,
  createParameterMiddleware,
  type ProvidableApp,
  withShellEnvironment,
  withShellMiddleware,
} from '@huma-engineering/app-kit';
import { PROGRAM_LIST_COMPONENT_LOADER } from '@huma-engineering/auth-kit/extensions';
import { includingMarketplace } from '@huma-engineering/portal-marketplace/app';
import { environment } from './environments/environment.development';

const apps: ProvidableApp[] = [includingMarketplace()];

import { inject } from '@angular/core';
import { ShellPortalManagerService } from '@huma-engineering/app-kit';
import { ProgramSelectorComponent } from '@huma-engineering/auth-kit/extensions';

/** */
export const programSelector = createParameterMiddleware(
  'programs',
  PROGRAM_LIST_COMPONENT_LOADER,
  // when middleware is activated:
  () =>
    inject(ShellPortalManagerService).setHeaderContextPortalContent(
      ProgramSelectorComponent,
    ),
  // when middleware is no longer active
  () => inject(ShellPortalManagerService).clearHeaderContextPortalContent(),
);

export const standaloneApps = bootstrapStandaloneApps(
  withShellEnvironment({
    hostUrl: environment.HOST_URL,
  }),
  withShellMiddleware([programSelector]),
  ...apps,
);
