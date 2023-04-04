import { useForm } from 'react-hook-form';

export default function AdminDashboard() {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      Address: '',
    },
  });

  return (
    <div className="h-screen bg-black">
      <form className="max-w-{500}">
        <label>Full Name</label>
        <input {...register('fullName')} defaultValue="test" />
        <label>Address</label>
        <input {...register('Address', { required: true })} />
        {errors.Address && <p>This field is required</p>}
        <input type="submit" />
      </form>
    </div>
  );
}
