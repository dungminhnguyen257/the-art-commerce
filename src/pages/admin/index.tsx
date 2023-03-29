import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
}
const AdminDashboard = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: unknown) =>
    console.log(data);

  return (
    <>
      <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
        <h1>Admin dashboard works!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>First Name</label>
          <input {...register('firstName')} />
          <label>Gender Selection</label>
          <select {...register('gender')}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <input type="submit" />
        </form>
      </Main>
    </>
  );
};

export default AdminDashboard;
