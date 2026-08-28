// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../resource';
import * as UserAPI from './authentication';
import { Webhook } from 'standardwebhooks';

export class Webhooks extends APIResource {
  unwrap(
    body: string,
    { headers, key }: { headers: Record<string, string>; key?: string },
  ): ParsedWebhookEvent {
    if (headers !== undefined) {
      const keyStr: string | null = key === undefined ? this._client.webhookSecret : key;
      if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
      const wh = new Webhook(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body) as ParsedWebhookEvent;
  }
}

export interface NewPlanetWebhookEvent {
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
  physicalProperties?: NewPlanetWebhookEvent.PhysicalProperties;
  /**
   * Atmospheric composition
   */
  atmosphere?: Array<NewPlanetWebhookEvent.Atmosphere>;
  /**
   * @format date-time
   */
  discoveredAt?: string;
  image?: string | null;
  satellites?: Array<NewPlanetWebhookEvent.Satellite>;
  /**
   * A user
   */
  creator?: UserAPI.User;
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

export namespace NewPlanetWebhookEvent {
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

export type ParsedWebhookEvent = NewPlanetWebhookEvent;

export declare namespace Webhooks {
  export {
    type NewPlanetWebhookEvent as NewPlanetWebhookEvent,
    type ParsedWebhookEvent as ParsedWebhookEvent,
  };
}
