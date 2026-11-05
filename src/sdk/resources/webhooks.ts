// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../resource';
import * as UserAPI from './authentication';
import { getRequiredHeader, type HeadersLike } from '../internal/headers';
import { verifyWebhookSignature } from '../internal/webhook-verify';

export class Webhooks extends APIResource {
  unwrap(body: string, { headers, key }: { headers: HeadersLike; key?: string }): ParsedWebhookEvent {
    const keyStr: string | null = key === undefined ? this._client.webhookSecret : key;
    if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
    verifyWebhookSignature(body, headers, keyStr);
    return JSON.parse(body) as ParsedWebhookEvent;
  }

  /**
   * Verifies that `body` was signed with the webhook key, throwing when it was not.
   *
   * `key` defaults to the client's `webhookSecret`. A missing signature header throws too.
   */
  verifySignature(
    body: string,
    headers: HeadersLike,
    key: string | undefined | null = this._client.webhookSecret,
  ): void {
    const keyStr: string | null = key === undefined ? this._client.webhookSecret : key;
    if (keyStr === null)
      throw new Error(
        'The webhook secret must either be set using the env var, SCALAR_WEBHOOK_SECRET, on the client class, or passed to this function',
      );
    getRequiredHeader(headers, 'webhook-id');
    getRequiredHeader(headers, 'webhook-timestamp');
    getRequiredHeader(headers, 'webhook-signature');
    verifyWebhookSignature(body, headers, keyStr);
  }

  /**
   * Parses `body` into a typed event without verifying its signature.
   *
   * Only use this for a body whose signature was already verified, or in tests.
   */
  parseUnsafe(body: string): ParsedWebhookEvent {
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
     * @exclusiveMinimum 0
     */
    mass?: number;
    /**
     * Radius in Earth radii (must be greater than 0)
     * @format float
     * @exclusiveMinimum 0
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
     * @exclusiveMaximum 100
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
