import React from 'react'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import Form from "../../components/Form";

const schema = yup
    .object({
        email: yup.string().email('Enter a valid email').required(),
        password: yup.string().min(3, 'Password must contain at least 3 characters').required(),
    })
    .required()

const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver: yupResolver(schema)})
    const onSubmit = (data) => {
        console.log(data)
        localStorage.setItem('userEmail', data.email);
        navigate('/')
    }

    return <div>
        <h1>Login</h1>
            <Form handleSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input id='email' placeholder='email' {...register("email")} type='email' autoComplete='off'/>
                {errors.email?.message}

                <label htmlFor='password'>Password</label>
                <input id='password' placeholder='password' {...register("password")}  type='password' autoComplete='new-password'/>
                {errors.password?.message}

                <input type="submit" />
            </Form>
    </div>
}

export default Login