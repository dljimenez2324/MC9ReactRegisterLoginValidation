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
        <div className="row mainCont">
             <div className="row">
                <div className="col my-4">
                    <h1 className="title text-center">Login</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login