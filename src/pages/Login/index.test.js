import React from 'react';
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import nock from 'nock';
import { renderWithRouter } from "../../../test-util/render-router";
import Login from "./index";
import Home from "../Home";

nock('http://localhost:3001')
    .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/users/1')
    .reply(200, { email: 'test1', password: 'p' });

console.log('Nock interceptors:', nock.activeMocks());

describe('Login page', ()=>{
    it('should render the form', async () => {
        const { finishLoading } = renderWithRouter(<Login/>)

        await finishLoading()

        expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i).value).toBe('test1')
        expect(screen.getByPlaceholderText(/password/i).value).toBe('p')
        expect(screen.getByRole('button', { name: /submit/i})).toBeInTheDocument()
    })

    it('should validate form fields', async () => {
        const { finishLoading } = renderWithRouter(<Login/>)

        await finishLoading()

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
        const { finishLoading } = renderWithRouter({
        element: <Login/>, path:'/login'
    }, [{
            element: <Home/>,
            path: '/'
        }])

        await finishLoading()

        const user = userEvent.setup()
        await user.type(screen.getByLabelText('Email'), 'test@test.com')
        await user.type(screen.getByLabelText('Password'), 'test@test.com')
        await user.click(screen.getByRole('button'))

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    })

    it('renders correctly', async () => {
        const { finishLoading, container } = renderWithRouter(<Login/>)

        await finishLoading()

        expect(container.firstChild).toMatchSnapshot()
    })
})