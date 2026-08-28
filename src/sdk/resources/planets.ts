// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import type { RequestOptions } from '../internal/request-options';
import { buildHeaders } from '../internal/headers';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path as __scalarPath } from '../internal/utils/path';
import type { Uploadable } from '../core/uploads';
import type * as AuthenticationAPI from './authentication';

export class Planets extends APIResource {
  /**
   * It's easy to say you know them all, but do you really? Retrieve all the planets and check whether you missed one.
   *
   * @param {PlanetListAllDataParams} [query] - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<PlanetListAllDataResponse>} OK
   *
   * @example
   * ```ts
   * const planet = await client.planets.listAllData({
   *   limit: 10,
   *   offset: 0,
   * });
   * ```
   */
  listAllData(
    query: PlanetListAllDataParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PlanetListAllDataResponse> {
    return this._client.get('/planets', { query, ...options });
  }

  /**
   * Time to play god and create a new planet. What do you think? Ah, don't think too much. What could go wrong anyway?
   *
   * @param {PlanetCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Planet>} Created
   *
   * @example
   * ```ts
   * const planet = await client.planets.create({
   *   name: 'Mars',
   * });
   * ```
   */
  create(body: PlanetCreateParams, options?: RequestOptions): APIPromise<Planet> {
    return this._client.post('/planets', { body, ...options });
  }

  /**
   * You'll better learn a little bit more about the planets. It might come in handy once space travel is available for everyone.
   *
   * @param {number} planetID - The ID of the planet to get
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Planet>} Planet Found
   *
   * @example
   * ```ts
   * const planet = await client.planets.retrieve(1);
   * ```
   */
  retrieve(planetID: number, options?: RequestOptions): APIPromise<Planet> {
    return this._client.get(__scalarPath`/planets/${planetID}`, options);
  }

  /**
   * Sometimes you make mistakes, that's fine. No worries, you can update all planets.
   *
   * @param {number} planetID - The ID of the planet to get
   * @param {PlanetUpdateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Planet>} Planet updated successfully
   *
   * @example
   * ```ts
   * const planet = await client.planets.update(1, {
   *   name: 'Mars',
   * });
   * ```
   */
  update(planetID: number, body: PlanetUpdateParams, options?: RequestOptions): APIPromise<Planet> {
    return this._client.put(__scalarPath`/planets/${planetID}`, { body, ...options });
  }

  /**
   * This endpoint was used to delete planets. Unfortunately, that caused a lot of trouble for planets with life. So, this endpoint is now deprecated and should not be used anymore.
   *
   * @param {number} planetID - The ID of the planet to get
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns No Content
   *
   * @example
   * ```ts
   * await client.planets.delete(1);
   * ```
   */
  delete(planetID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(__scalarPath`/planets/${planetID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Got a crazy good photo of a planet? Share it with the world!
   *
   * @param {number} planetID - The ID of the planet to get
   * @param {PlanetDelteImageParams} [body] - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<PlanetDelteImageResponse>} Image uploaded
   *
   * @example
   * ```ts
   * const planet = await client.planets.delteImage(1);
   * ```
   */
  delteImage(
    planetID: number,
    body: PlanetDelteImageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PlanetDelteImageResponse> {
    return this._client.post(
      __scalarPath`/planets/${planetID}/image`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

/**
 * A planet in the Scalar Galaxy
 */
export interface Planet {
  /**
   * @format int64
   */
  id: number;
  name: string;
  description?: string | null;
  type?: 'terrestrial' | 'gas_giant' | 'ice_giant' | 'dwarf' | 'super_earth';
  /**
   * A score from 0 to 1 indicating potential habitability
   * @format float
   * @minimum 0
   * @maximum 1
   */
  habitabilityIndex?: number;
  physicalProperties?: Planet.PhysicalProperties;
  /**
   * Atmospheric composition
   */
  atmosphere?: Array<Planet.Atmosphere>;
  /**
   * @format date-time
   */
  discoveredAt?: string;
  image?: string | null;
  satellites?: Array<unknown>;
  /**
   * A user
   */
  creator?: AuthenticationAPI.User;
  tags?: Array<string>;
  /**
   * @format date-time
   */
  lastUpdated?: string;
  /**
   * URL which gets invoked upon a successful operation
   * @format uri
   */
  successCallbackUrl?: string;
  /**
   * URL which gets invoked upon a failed operation
   * @format uri
   */
  failureCallbackUrl?: string;
}

export namespace Planet {
  export interface PhysicalProperties {
    /**
     * Mass in Earth masses (must be greater than 0)
     * @format float
     */
    mass?: number;
    /**
     * Radius in Earth radii (must be greater than 0)
     * @format float
     */
    radius?: number;
    /**
     * Surface gravity in Earth g
     * @format float
     */
    gravity?: number;
    temperature?: PhysicalProperties.Temperature;
  }

  export namespace PhysicalProperties {
    export interface Temperature {
      /**
       * Minimum temperature in Kelvin
       * @format float
       */
      min?: number;
      /**
       * Maximum temperature in Kelvin
       * @format float
       */
      max?: number;
      /**
       * Average temperature in Kelvin
       * @format float
       */
      average?: number;
    }
  }

  export interface Atmosphere {
    compound?: string;
    /**
     * @format float
     */
    percentage?: number;
  }
}

export interface PlanetListAllDataParams {
  /**
   * The number of items to return
   * @default 10
   * @format int64
   */
  limit?: number;
  /**
   * The number of items to skip before starting to collect the result set
   * @default 0
   * @format int64
   */
  offset?: number;
}

export interface PlanetListAllDataResponse {
  data?: Array<unknown>;
  meta?: PlanetListAllDataResponse.Meta;
}

export namespace PlanetListAllDataResponse {
  export interface Meta {
    /**
     * @format int64
     */
    limit?: number;
    /**
     * @format int64
     */
    offset?: number;
    /**
     * @format int64
     */
    total?: number;
    next?: string | null;
  }
}

export interface PlanetCreateParams {
  name: string;
  description?: string | null;
  type?: 'terrestrial' | 'gas_giant' | 'ice_giant' | 'dwarf' | 'super_earth';
  /**
   * A score from 0 to 1 indicating potential habitability
   * @format float
   * @minimum 0
   * @maximum 1
   */
  habitabilityIndex?: number;
  physicalProperties?: PlanetCreateParams.PhysicalProperties;
  /**
   * Atmospheric composition
   */
  atmosphere?: Array<PlanetCreateParams.Atmosphere>;
  /**
   * @format date-time
   */
  discoveredAt?: string;
  image?: string | null;
  satellites?: Array<PlanetCreateParams.Satellite>;
  /**
   * A user
   */
  creator?: AuthenticationAPI.User;
  tags?: Array<string>;
  /**
   * URL which gets invoked upon a successful operation
   * @format uri
   */
  successCallbackUrl?: string;
  /**
   * URL which gets invoked upon a failed operation
   * @format uri
   */
  failureCallbackUrl?: string;
}

export namespace PlanetCreateParams {
  export interface PhysicalProperties {
    /**
     * Mass in Earth masses (must be greater than 0)
     * @format float
     */
    mass?: number;
    /**
     * Radius in Earth radii (must be greater than 0)
     * @format float
     */
    radius?: number;
    /**
     * Surface gravity in Earth g
     * @format float
     */
    gravity?: number;
    temperature?: PhysicalProperties.Temperature;
  }

  export namespace PhysicalProperties {
    export interface Temperature {
      /**
       * Minimum temperature in Kelvin
       * @format float
       */
      min?: number;
      /**
       * Maximum temperature in Kelvin
       * @format float
       */
      max?: number;
      /**
       * Average temperature in Kelvin
       * @format float
       */
      average?: number;
    }
  }

  export interface Atmosphere {
    compound?: string;
    /**
     * @format float
     */
    percentage?: number;
  }

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

export interface PlanetUpdateParams {
  name: string;
  description?: string | null;
  type?: 'terrestrial' | 'gas_giant' | 'ice_giant' | 'dwarf' | 'super_earth';
  /**
   * A score from 0 to 1 indicating potential habitability
   * @format float
   * @minimum 0
   * @maximum 1
   */
  habitabilityIndex?: number;
  physicalProperties?: PlanetUpdateParams.PhysicalProperties;
  /**
   * Atmospheric composition
   */
  atmosphere?: Array<PlanetUpdateParams.Atmosphere>;
  /**
   * @format date-time
   */
  discoveredAt?: string;
  image?: string | null;
  satellites?: Array<PlanetUpdateParams.Satellite>;
  /**
   * A user
   */
  creator?: AuthenticationAPI.User;
  tags?: Array<string>;
  /**
   * URL which gets invoked upon a successful operation
   * @format uri
   */
  successCallbackUrl?: string;
  /**
   * URL which gets invoked upon a failed operation
   * @format uri
   */
  failureCallbackUrl?: string;
}

export namespace PlanetUpdateParams {
  export interface PhysicalProperties {
    /**
     * Mass in Earth masses (must be greater than 0)
     * @format float
     */
    mass?: number;
    /**
     * Radius in Earth radii (must be greater than 0)
     * @format float
     */
    radius?: number;
    /**
     * Surface gravity in Earth g
     * @format float
     */
    gravity?: number;
    temperature?: PhysicalProperties.Temperature;
  }

  export namespace PhysicalProperties {
    export interface Temperature {
      /**
       * Minimum temperature in Kelvin
       * @format float
       */
      min?: number;
      /**
       * Maximum temperature in Kelvin
       * @format float
       */
      max?: number;
      /**
       * Average temperature in Kelvin
       * @format float
       */
      average?: number;
    }
  }

  export interface Atmosphere {
    compound?: string;
    /**
     * @format float
     */
    percentage?: number;
  }

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

export interface PlanetDelteImageParams {
  /**
   * The image file to upload
   * @format binary
   */
  image?: Uploadable;
}

export interface PlanetDelteImageResponse {
  message?: string;
  /**
   * The URL where the uploaded image can be accessed
   */
  imageUrl?: string;
  /**
   * Timestamp when the image was uploaded
   * @format date-time
   */
  uploadedAt?: string;
  /**
   * Size of the uploaded image in bytes
   */
  fileSize?: number;
  /**
   * The content type of the uploaded image
   */
  mimeType?: string;
}
export declare namespace Planets {
  export {
    type Planet as Planet,
    type PlanetListAllDataResponse as PlanetListAllDataResponse,
    type PlanetDelteImageResponse as PlanetDelteImageResponse,
    type PlanetListAllDataParams as PlanetListAllDataParams,
    type PlanetCreateParams as PlanetCreateParams,
    type PlanetUpdateParams as PlanetUpdateParams,
    type PlanetDelteImageParams as PlanetDelteImageParams,
  };
}
