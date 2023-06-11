import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Reducers/AuthReducer";
import { AppDispatch } from "../Redux/store";


const userSchema = yup.object({
  username: yup.string().min(5).required("This field is required"),
  password: yup.string().required("This field is required"),
});

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = async (data: any) => {
    await dispatch(loginUser(data)).then(() => navigate("/"));
  };
  return (
    
    <div className="bg-base-cream flex">
      
      <div className="w-3/4">
        <img
          className="object-cover h-screen w-screen"
          src="/assets/img/IMG_9810.JPG"
          alt=""
        />
      </div>
      <div className="w-1/4 flex flex-col mx-14 mt-10">
        <div className="flex justify-center">
          <Link to="/">
            <img className="w-52" src="/assets/img/primary-logo.png" alt="" />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Log in to your account</span>
          <span>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Sign up
            </Link>
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
          <button className="button">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
