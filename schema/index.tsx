import {User} from './UserSchema';
import {Outing} from './OutingSchema';
import {Task} from './TaskSchema';

export const realmConfig: Realm.Configuration = {
  schema: [User, Outing, Task],
};
