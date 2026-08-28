// File generated from our OpenAPI spec by Scalar. See README.md for details.

import type { Galaxy } from './client';

export abstract class APIResource {
  protected _client: Galaxy;

  constructor(client: Galaxy) {
    this._client = client;
  }
}
