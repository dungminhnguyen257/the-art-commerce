import { zodResolver } from '@hookform/resolvers/zod';
import type { ProductRequestBody } from '@lib/product/dto';
import { ProductRequestBodySchema } from '@lib/product/dto';
import { useErrorBoundary } from 'react-error-boundary';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import SubmitButton from '@/lib/common-ui/submit-button';
import { post } from '@/lib/utils/http';

export default function CreateProduct() {
  const { showBoundary } = useErrorBoundary();
  const defaultValues: ProductRequestBody = {
    name: '',
    image: null,
    stock_quantity: 0,
    price: 0 as any,
    description: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductRequestBody>({
    defaultValues,
    resolver: zodResolver(ProductRequestBodySchema),
  });

  const onSubmit: SubmitHandler<ProductRequestBody> = async (data) => {
    console.log(data);
    const response = await post('/api/product', data);
    if (!response.error) {
      reset();
    } else {
      showBoundary(response.error);
    }
  };
  console.log(errors);
  return (
    <form className="mt-8 ml-8 max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-black">Product name</span>
          <input
            type="text"
            className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500 focus:outline-none"
            placeholder=""
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>

        <label className="block">
          <span className="text-black">Image</span>
          <input
            type="file"
            className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500 focus:outline-none"
            ref={register}
          />
        </label>

        <label className="block">
          <span className="text-black">Stock quantity</span>
          <input
            type="number"
            className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500 focus:outline-none"
            placeholder=""
            {...register('stock_quantity', { valueAsNumber: true })}
          />
          {!errors.stock_quantity && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>

        <label className="block">
          <span className="text-black">Price</span>
          <input
            type="number"
            className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500 focus:outline-none"
            placeholder=""
            {...register('price', { valueAsNumber: true })}
          />
          {!errors.price && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>

        <label className="block">
          <span className="text-black">Description</span>
          <input
            type="text"
            className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-indigo-500 focus:outline-none"
            placeholder=""
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-600">This field is required</p>
          )}
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
