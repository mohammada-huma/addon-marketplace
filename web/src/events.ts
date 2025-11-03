import { inject } from '@angular/core';
import { registerGlobalEventHandler } from '@huma-engineering/app-kit';
import { AuthenticationService } from '@huma-engineering/auth-kit';

export const shellEventsHandler = registerGlobalEventHandler({
  onLogout: () => inject(AuthenticationService).logout(),
});
