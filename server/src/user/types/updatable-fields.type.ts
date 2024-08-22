import { UserDocument } from '../schemas/users.schema';

export type UpdatableFields = Partial<
  Pick<UserDocument, 'profilePicture' | 'name'>
>;
