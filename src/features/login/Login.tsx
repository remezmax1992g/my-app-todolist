import React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {FormikHelpers, useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {Navigate} from "react-router-dom";
import {LoginParamsType} from "../../api/auth-api";
import {createLog} from "../../reducers/auth-action";
import {authAction} from "./index";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Login = () => {
        const dispatch = useAppDispatch()
        const isLogin = useAppSelector(state => state.auth.isLogin)
        const formik = useFormik({
                initialValues: {
                    email: "",
                    password: "",
                    rememberMe: false
                },
                onSubmit: async (values:LoginParamsType, formikHelpers:FormikHelpers<LoginParamsType>) => {
                    const res = await dispatch(authAction.createLog(values))

                    if(createLog.rejected.match(res)){
                        if(res.payload?.fieldsErrors?.length){
                            const error = res.payload?.fieldsErrors[0]
                            formikHelpers.setFieldError(error.field, error.error)
                        }
                    }
                    // formik.resetForm()
                },
                validate: values => {
                    const error: FormikErrorType = {}
                    // if (!values.email) {
                    //     error.email = "Email is required"
                    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    //     error.email = 'Invalid email address'
                    // }
                    if (!values.password) {
                        error.password = "Password is required"
                    } else if(values.password.length <= 3){
                        error.password = "Password must me more than 3 symbols"
                    }
                    return error
                }
            }
        )
        if (isLogin) {
            return <Navigate to={"/my-app-todolist"}/>
        }
        return (
            <Grid container justifyContent="center">
                <Grid item xs={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <p>
                                    To log in get registered <a href="https://social-network.samuraijs.com/"
                                                                target={"_blank"}>here</a>
                                </p>
                                <p>
                                    or use common test account credentials:
                                </p>
                                <p>
                                    Email: free@samuraijs.com
                                </p>
                                <p>
                                    Password: free
                                </p>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email && <div style={{color:"red"}}>{formik.errors.email}</div>}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.touched.password && formik.errors.password && <div style={{color:"red"}}>{formik.errors.password}</div>}
                                <FormControlLabel
                                    label="Remember me"
                                    control={<Checkbox
                                        {...formik.getFieldProps("rememberMe")}
                                        checked={formik.values.rememberMe}/>}
                                />
                                <Button type="submit" variant="contained" color="primary">Login</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>

            </Grid>
        )
            ;
    }
;

export default Login;