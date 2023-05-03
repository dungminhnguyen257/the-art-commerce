import { prismaMock } from '@db/client-mock';
import { faker } from '@faker-js/faker';
import * as dao from '@lib/admin/dao';
import cuid from 'cuid';
/* -------------------------------- stub data ------------------------------- */

const lastName = faker.name.lastName();
const firstName = faker.name.firstName();
const email = faker.internet.email();
const phone = faker.phone.number();
const time = new Date();

/* ---------------------------------- Test ---------------------------------- */

test('should create new admin', async () => {
  const id = cuid();
  const admin = {
    id,
    firstName,
    lastName,
    email,
    phone,
    createdAt: time,
    updatedAt: time,
    deletedAt: time,
  };

  prismaMock.admin.create.mockResolvedValue(admin);

  await expect(dao.createAdmin(admin)).resolves.toEqual(admin);
});
