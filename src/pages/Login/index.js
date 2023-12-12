import React from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import Form from "../../components/Form";

const schema = yup
    .object({
        email: yup.string().required(),
        password: yup.string().required(),
    })
    .required()

const Index = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver: yupResolver(schema)})
    const onSubmit = (data) => console.log(data)


    return <div>
        <h1>Login</h1>
            <Form handleSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input id='email' {...register("email")} type='email' autoComplete='off'/>
                {errors.email?.message}

                <label htmlFor='password'>Password</label>
                <input id='password' {...register("password")}  type='password' autoComplete='new-password'/>
                {errors.password && <span>This field is required</span>}

                <input type="submit" />
            </Form>
    </div>
}

export default Index