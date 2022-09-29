import React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {createLog} from "../../reducers/auth-reducer";
import {Navigate} from "react-router-dom";

const Login = () => {
        const dispatch = useAppDispatch()
        const isLogin = useAppSelector(state => state.auth.isLogin)
        const formik = useFormik({
                initialValues: {
                    email: "",
                    password: "",
                    rememberMe: false
                },
                onSubmit: values => {
                    dispatch(createLog(values))
                },
                validate: values => {
                    if (!values.email) {
                        return {email: "Email is required"}
                    }
                    if (!values.password) {
                        return {password: "Password is required"}
                    }
                }
            }
        )
    if(isLogin){
        return <Navigate to={"/"}/>
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
                                {formik.errors.email ? formik.errors.email : null}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.errors.password ? formik.errors.password : null}
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