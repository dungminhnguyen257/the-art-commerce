import { zodResolver } from '@hookform/resolvers/zod';
import type { UserPostBody } from '@lib/user/dto';
import { UserPostBodySchema } from '@lib/user/dto';
import { useErrorBoundary } from 'react-error-boundary';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import SubmitButton from '@/lib/common-ui/submit-button';
import { post } from '@/lib/utils/http';

export default function CreateAdmin() {
  const { showBoundary } = useErrorBoundary();
  const defaultValues: UserPostBody = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: 'admin',
    emailVerified: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserPostBody>({
    defaultValues,
    resolver: zodResolver(UserPostBodySchema),
  });
  const onSubmit: SubmitHandler<UserPostBody> = async (data) => {
    const response = await post('/api/admin', data);
    if (!response.error) {
      reset();
    } else {
      showBoundary(response.error);
    }
  };

  return (
    <form className="mt-8 ml-8 max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-black">First name</span>
          <input
            type="text"
            className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500
                    focus:outline-none"
            placeholder=""
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>
        <label className="block">
          <span className="text-black">Last name</span>
          <input
            type="text"
            className="
                    w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500
                    focus:outline-none
                  "
            placeholder=""
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>

        <label className="block">
          <span className="text-black">Email address</span>
          <input
            type="email"
            className="
                    w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500
                    focus:outline-none
                  "
            placeholder="john@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>
        <label className="block">
          <span className="text-black">Phone</span>
          <input
            type="text"
            className="
                    w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500
                    focus:outline-none
                  "
            placeholder=""
            {...register('phone')}
          />
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
