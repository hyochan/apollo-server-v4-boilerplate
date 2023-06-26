import 'express';

import type {i18n} from 'i18next';

declare module 'express' {
  export interface Request extends i18n {
    appSecret: string;
    appSecretEtc: string;
  }
}
