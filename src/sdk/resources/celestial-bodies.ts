// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import type { RequestOptions } from '../internal/request-options';
import type * as PlanetsAPI from './planets';
import type * as AuthenticationAPI from './authentication';

export class CelestialBodies extends APIResource {
  /**
   * Stars, moons, comets, the occasional rogue asteroid — if it glows or drifts through the void, you can add it here.
   *
   * @param {CelestialBodyCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<CelestialBody>} Celestial body created
   *
   * @example
   * ```ts
   * const celestialBody = await client.celestialBodies.create({
   *   name: 'Mars',
   * });
   * ```
   */
  create(body: CelestialBodyCreateParams, options?: RequestOptions): APIPromise<CelestialBody> {
    return this._client.post('/celestial-bodies', { body, ...options });
  }
}

/**
 * A celestial body which can be either a planet or a satellite
 */
export type CelestialBody = PlanetsAPI.Planet | CelestialBody.Satellite;

export namespace CelestialBody {
  export interface Satellite {
    name: string;
    /**
     * @format int64
     */
    id?: number;
    description?: string | null;
    /**
     * Diameter in kilometers
     * @format float
     */
    diameter?: number;
    type?: 'moon' | 'asteroid' | 'comet';
    orbit?: unknown;
  }
}

export type CelestialBodyCreateParams = PlanetsAPI.Planet | CelestialBodyCreateParams.Satellite;

export declare namespace CelestialBodyCreateParams {
  export interface Satellite {
    name: string;
    description?: string | null;
    /**
     * Diameter in kilometers
     * @format float
     */
    diameter?: number;
    type?: 'moon' | 'asteroid' | 'comet';
    orbit?: unknown;
  }
}
export declare namespace CelestialBodies {
  export { type CelestialBody as CelestialBody, type CelestialBodyCreateParams as CelestialBodyCreateParams };
}
