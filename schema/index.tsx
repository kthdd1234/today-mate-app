import {User} from './UserSchema';
import {Outing} from './OutingSchema';
import {Task} from './TaskSchema';
import {Realm} from '@realm/react';

export const realmConfig: Realm.Configuration = {
  schema: [User, Outing, Task],
  deleteRealmIfMigrationNeeded: true,
};
