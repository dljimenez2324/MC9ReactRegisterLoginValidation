// This component will be used to Login to the site using Zod form Validation with the requirements email and password fields
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import {z} from "zod";

const schema = z
.object({
  email: z.string().toLowerCase().trim(),
  password: z.string().trim().min(6, {message: "Password must contain at least 6 characters"})  
})

// our interface with zod to hold our data
// Also notice this interface is outside our function
type FormData = z.infer<typeof schema>

const Login = () => {

  // to see errors we destructure our formdata
  const{register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver:zodResolver(schema)});

  console.log(errors);

  const onHelpSubmit = (data:FieldValues) => {console.log(data)}

  return (
    <>
        <div className="container contLogin">
            {/* Title of Container */}
            <div className="row">
                <div className="col">
                    <h1 className="title text-center">Login</h1>
                </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onHelpSubmit)}>
                {/* email */}
                <div className="row mySpacing">
                    <div className="col">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input {...register('email')} id="email" type="email" className="form-control"/>
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>
                </div>
                {/* password */}
                <div className="row mySpacing">
                    <div className="col">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input {...register('password')} type="password" id="password" className="form-control" />
                        {errors.password && <p className="text-danger mb-0">{errors.password.message}</p>}
                    </div>
                </div>
                    <button className="btn btn-primary tagStyle" >Submit</button>
                    <div className="tagStyle">
                        <a href="https://youtu.be/xvFZjo5PgG0?si=BQKqdNQu_l9KetuS" target="_blank" className="">Forgot Password</a>
                    </div>
            </form>
        </div>
    </>
  )
}

export default Login