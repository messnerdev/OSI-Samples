// osiconfiguration.service.ts
//
// Copyright 2019 OSIsoft, LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// <http://www.apache.org/licenses/LICENSE-2.0>
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable } from '@angular/core';
import { AdalConfig } from './adal/adaljs'


export interface ISdsConfigSet {
  ClientID: string;
  ClientKey: string;
  Resource: string;
  TenantId: string;
  NamespaceId: string;
  ApiVersion: string;
}


@Injectable()
export class ConfigurationService {

  private ambientConfiguration: ISdsConfigSet = null;


  public get AmbientConfiguration(): ISdsConfigSet {
        return this.ambientConfiguration;
    }

  public set  AmbientConfiguration(subscription: ISdsConfigSet) {
    this.ambientConfiguration = subscription;
  }

  public get adalConfig(): AdalConfig {

    const config: ISdsConfigSet = this.ambientConfiguration;

    return {
         tenant: 'common',
         clientId: config.ClientID,
         endpoints: [ { endpointURL: config.Resource, endpointResourceURI : config.Resource },
                    ],

         redirectUri: window.location.origin + '/',
         postLogoutRedirectUri: window.location.origin + '/'
      }
    }

  }
