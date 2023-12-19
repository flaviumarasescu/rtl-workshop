import React from 'react';
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "../../../test-util/render-router";
import Login from "./index";
import Home from "../Home";



describe('Login page', ()=>{
    it('should render the form', () => {
        renderWithRouter(<Login/>)
        expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument()
        expect(screen.getByRole('textbox', {name: /email/i })).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /submit/i})).toBeInTheDocument()
    })

    it('should validate form fields', async () => {
        renderWithRouter(<Login/>)

        const user = userEvent.setup()
        await user.type(screen.getByLabelText('Email'), 'test')
        await user.type(screen.getByLabelText('Password'), 'a')
        await user.click(screen.getByRole('button'))

        expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument()
        expect(screen.getByText(/password must contain at least 3 characters/i)).toBeInTheDocument()

        await user.type(screen.getByLabelText('Email'), 'test@test.com')
        await user.type(screen.getByLabelText('Password'), 'password')
        await user.click(screen.getByRole('button'))

        expect(screen.queryByText(/enter a valid email/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/password must contain at least 3 characters/i)).not.toBeInTheDocument()
    })

    test('form completion and redirect', async () => {
        renderWithRouter({
        element: <Login/>, path:'/login'
    }, [{
            element: <Home/>,
            path: '/'
        }])
        const user = userEvent.setup()
        await user.type(screen.getByLabelText('Email'), 'test@test.com')
        await user.type(screen.getByLabelText('Password'), 'test@test.com')
        await user.click(screen.getByRole('button'))

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    })
})