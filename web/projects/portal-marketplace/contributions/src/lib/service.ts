import { HttpClient, httpResource } from '@angular/common/http';

import { effect, inject, Injectable, signal } from '@angular/core';
import {
  ShellEnvironmentService,
  ShellMiddlewareManagerService,
} from '@huma-engineering/app-kit';
import { Observable } from 'rxjs';
import { InstallPluginRequest, MarketplaceResponse, Program } from './types';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  private readonly _middlewareManager = inject(ShellMiddlewareManagerService);
  private readonly _shellEnv = inject(ShellEnvironmentService);
  private readonly _programId = signal<number | null>(null);
  private readonly _http = inject(HttpClient);

  /**
   *
   */
  constructor() {
    effect(() => {
      const middleware =
        this._middlewareManager.latestActiveParameterMiddleware();
      if (middleware && middleware.name === 'programs') {
        this._programId.set(Number(middleware.param));
      }
    });
  }

  readonly marketplaceResource = httpResource<MarketplaceResponse | undefined>(
    () => {
      const programId = this._programId();
      if (!programId) return undefined;

      return `${this._shellEnv.hostUrl}/api/v1/programs/${programId}/marketplace/`;
    },
  );

  readonly installPlugin = (
    pluginId: string,
    data: Record<string, unknown> = {},
  ): Observable<Program> => {
    const programId = this._programId();
    if (!programId) throw Error('Program ID is not set');

    const request: InstallPluginRequest = {
      type: pluginId,
      data,
      ignoreIfExists: false,
    };
    return this._http.post<Program>(
      `${this._shellEnv.hostUrl}/api/v1/programs/${programId}/plugins/`,
      request,
    );
  };

  readonly uninstallPlugin = (pluginId: string): Observable<unknown> => {
    const programId = this._programId();
    if (!programId) throw Error('Program ID is not set');

    return this._http.delete<unknown>(
      `${this._shellEnv.hostUrl}/api/v1/programs/${programId}/plugins/${pluginId}/`,
    );
  };
}
