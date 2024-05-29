// This component will be used for users to Register for the site using Zod form Validation with the requirements first and last name, email and password with confirm password fields
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import {z} from "zod";

// NOW I NEED TO CREATE THE HELPER FUNCTION TO HANDLE THE ONSUBMIT FROM THE FORM
// THEN I WILL NEED TO SET UP HOW THE RETURN WILL LOOK WITH ITS INPUTS AND DISPLAY FIELDS

// to hold the registrants data, we can use schema
// notice that the schema is OUTSIDE of our function.
const schema = z
.object({
    firstName: z.string().toLowerCase().trim().min(2, {message: "First name must be at least 2 characters..."}),
    lastName: z.string().toLowerCase().trim().min(2, {message: "Last name must be at least 2 characters..."}),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().trim().min(6),
    password2: z.string().trim().min(6)
})
.refine((data) => data.password === data.password2, { // checking for if passwords do not match
    message: "Passwords do not match",  // shows this message upon passwords not matching
    path: ["password2"]  // shows the error message for password 2
})

// our interface with zod to hold our data
// Also notice this interface is outside our function
type FormData = z.infer<typeof schema>

const Register = () => {

    // in order to see the errors we destructure the formState

    // const {register, handleSubmit, formState:{errors, isValid}} = useForm<FormData>({resolver:zodResolver(schema)});
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)});

    console.log(errors);

    // make a helper function that we place into the onSubmit of the form tag to see our errors in the console log
    const onHelpSubmit = (data:FieldValues) => {
        console.log(data);
    }

  return (
    <>
        <div className="container m-5 p-5">
            <div className="row">
                <div className="col mb-4">
                    <h1 className="title text-center">Register New Account</h1>
                </div>
            </div>
            {/* originally had this below   onSubmit={handleSubmit(onHelpSubmit)}   */}
            <form onSubmit={handleSubmit(onHelpSubmit)}>
                <div className="myContainer">

                    <div className="row mySpacing">
                        <div className="col-6">
                            {/* First name portions */}
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input {...register('firstName')} id="firstName" type="text" className="form-control"/>
                            {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                        </div>
                        <div className="col-6">
                            {/* Last name portions */}
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input {...register('lastName')} id="lastName" type="text" className="form-control"/>
                            {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                        </div>

                    </div>
                    <div className="row mySpacing">
                        <div className="col-6">
                            {/* Email section */}
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input {...register('email')} id="email" type="email" autoComplete="email" className="form-control"/>
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="row mySpacing">
                        <div className="col-6">
                            {/* Password sections */}
                            <label htmlFor="password" className="form-label" >Password</label>
                            <input {...register('password')} id="password" type="password" className="form-control"/>
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </div>
                        <div className="col-6">
                            {/* Password sections */}
                            <label htmlFor="password2" className="form-label" >Confirm Password</label>
                            <input {...register('password2')} id="password2" type="password" className="form-control"/>
                            {errors.password2 && <p className="text-danger">{errors.password2.message}</p>}
                        </div>
                    </div>
                    <div className="row mySpacing">
                        <div className="col-2">
                            {/* add back to button after complete editing     disabled={!isValid}        */}
                            <button  className="btn btn-primary" >Submit</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </>
  )
}

export default Register