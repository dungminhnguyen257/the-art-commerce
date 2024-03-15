import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CustomerPostBody } from '@lib/customer/dto';
import { CustomerPostBodySchema } from '@lib/customer/dto';
import { useErrorBoundary } from 'react-error-boundary';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import SubmitButton from '@/lib/common-ui/submit-button';
import { post } from '@/lib/utils/http';

export default function CreateAccount() {
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();
  const defaultValues: CustomerPostBody = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    emailVerified: false,
    role: 'user'
  };

  const {
    register,
    handleSubmit: onSubmit, 
    reset,
    formState: { errors },
  } = useForm<CustomerPostBody>({
    defaultValues,
    resolver: zodResolver(CustomerPostBodySchema),
  });

  const onSubmitHandler: SubmitHandler<CustomerPostBody> = async (data) => {
    const response = await post('/api/users', data);
    if (!response.error) {
      reset();
      router.push({
        pathname: '/success', 
        query: data,
      });
    } else {
      showBoundary(response.error);
    }
  };

  return (
    <form className="mt-8 ml-8 max-w-md" onSubmit={onSubmit(onSubmitHandler)}>
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-black">First Name</span>
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
          <span className="text-black">Last Name</span>
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
          <span className="text-black">Address</span>
          <input
            type="text"
            className="
                    w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500
                    focus:outline-none
                  "
            placeholder=""
            {...register('address')}
          />
          {errors.address && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>
        <label className="block">
          <span className="text-black">Email Address</span>
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
          <span className="text-black">Phone Number</span>
          <input
            type="tel"
            className="
                    w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500
                    focus:outline-none
                  "
            placeholder=""
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
