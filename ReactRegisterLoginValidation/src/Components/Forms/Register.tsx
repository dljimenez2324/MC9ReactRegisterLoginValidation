// This component will be used for users to Register for the site using Zod form Validation with the requirements first and last name, email and password with confirm password fields
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import {z} from "zod";


const Register = () => {

    // to hold the registrants data, we can use schema
    const schema = z
    .object({
        firstName: z.string().toLowerCase().trim().min(2),
        lastName: z.string().toLowerCase().trim().min(2),
        email: z.string().trim().email(),
        password: z.string().trim().min(6),
        password2: z.string().trim().min(6)
    })
    .refine((data) => data.password === data.password2, { // checking for if passwords do not match
        message: "Passwords do not match",  // shows this message upon passwords not matching
        path: ["password2"]  // shows the error message for password 2
    })


  return (
    <>
        <div className="container">
            <h1 className="title text-center">Register New Account</h1>
            <form>

            </form>
        </div>
    </>
  )
}

export default Register