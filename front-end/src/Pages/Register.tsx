import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

const userSchema = yup.object({
  username: yup.string().min(5).required(),
  email: yup.string().email(),
  password: yup.string().required("This field is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("This field is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = async (data : any) => {
      const res = await axios.post('http://localhost:8000/v1/auth/register', data)
      console.log(res.data);
  }
  return (
    <div className="bg-base-cream flex">
      <div className="flex flex-col w-1/4 justify-center mx-14">
        <div className="flex justify-center">
          <Link to="/">
            <img
              className="w-52"
              src="/assets/img/primary-logo.png"
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Create your account</span>
          <span>
            Have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Log in
            </Link>{" "}
            now
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label>Username</label>
            <input
              className="input-field"
              type="text"
              {...register("username")}
            />
            <p className=" text-red-500">
              {errors.username?.message?.toString()}
            </p>
          </div>

          <div className="form-control">
            <label>Email</label>
            <input
              className="input-field"
              type="email"
              {...register("email")}
            />
            <p className=" text-red-500">{errors.email?.message?.toString()}</p>
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              className="input-field"
              type="password"
              {...register("password")}
            />
            <p className=" text-red-500">
              {errors.password?.message?.toString()}
            </p>
          </div>
          <div className="form-control">
            <label>Re-enter password</label>
            <input
              className="input-field"
              type="password"
              {...register("passwordConfirmation")}
            />
            <p className=" text-red-500">
              {errors.passwordConfirmation?.message?.toString()}
            </p>
          </div>
          <button className="button" type="submit">
            Sign up
          </button>
        </form>
      </div>
      <div className="w-3/4 flex">
        <img
          className=" object-cover h-screen w-screen"
          src="/assets/img/IMG_9934.JPG"
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
