// import {useState} from 'react';

// export default function AccountPage () {
//   const [formData, setFormData] = useState ({
//     firstName : '',
//     lastName: '',
//     address: '',
//     email: '',
//     phoneNumber: ''
//   });
//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     // You can send the form data to the server here to process 
//     console.log(formData);
//   };
//   return(
//     <div>
//       <h1>Account Page</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           First Name:
//           <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
//         </label>
//         <label>
//           Last Name:
//           <input type='text' name='lastName' value={formData.lastName} onChange={handleChange}/>
//         </label>
//         <label>
//           Address:
//           <input type='text' name='address' value={formData.address} onChange={handleChange}/>
//         </label>
//         <label>
//           Email:
//         <input type='email' name='email' value={formData.email} onChange={handleChange}/>
//         </label>
//           Phone Number:
//           <input type='tel' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}/>
//         <button type='submit'>Submit</button>
//       </form>
//     </div>
//   )
// }

import { zodResolver } from '@hookform/resolvers/zod';
import type { CustomerPostBody } from '@lib/customer/dto';
import { CustomerPostBodySchema } from '@lib/customer/dto';
import { useErrorBoundary } from 'react-error-boundary';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import SubmitButton from '@/lib/common-ui/submit-button';
import { post } from '@/lib/utils/http';

export default function CreateAccount() {
  const { showBoundary } = useErrorBoundary();
  const defaultValues: CustomerPostBody = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    emailVerified: null,
    role: 'admin'
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerPostBody>({
    defaultValues,
    resolver: zodResolver(CustomerPostBodySchema),
  });

  const onSubmit: SubmitHandler<CustomerPostBody> = async (data) => {
    const response = await post('/api/account', data);
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
