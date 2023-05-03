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
      <form className="max-w-{500}" action="/send-data-here" method="post">
        <label className="text-white">Full Name</label>
        <input {...register('fullName')} defaultValue="test" />
        <label className="text-white">Address</label>
        <input {...register('Address', { required: true })} />
        {errors.Address && <p color="red">This field is required</p>}
        <button className="text-white"> Submit</button>
      </form>
    </div>
  );
}
