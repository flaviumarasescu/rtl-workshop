import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"

import Form from "../../components/Form";

import './style.css'

const schema = yup
    .object({
        email: yup.string().email('Enter a valid email').required(),
        password: yup.string().min(3, 'Password must contain at least 3 characters').required(),
    })
    .required()

const Login = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({resolver: yupResolver(schema)})
    const onSubmit = (data) => {
        localStorage.setItem('userEmail', data.email);
        navigate('/')
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3001/users/1');
                const userData = await response.json();
                setValue('email', userData.email);
                setValue('password', userData.password);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setLoading(false)
        };

        fetchUserData();
    }, []);

    return <>
    {
        loading ? <div data-testid='spinner'></div>
            :
        <div>
            <h1>Login</h1>
            <Form handleSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input id='email' placeholder='email' {...register("email")} type='email' autoComplete='off'/>
                {errors.email?.message}

                <label htmlFor='password'>Password</label>
                <input id='password' placeholder='password' {...register("password")} type='password'
                       autoComplete='new-password'/>
                {errors.password?.message}

                <input type="submit"/>
            </Form>
        </div>
    }
    </>
}

export default Login