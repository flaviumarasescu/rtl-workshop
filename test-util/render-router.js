import React, {cloneElement, isValidElement} from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'

export const renderWithRouter = (children, routes = [], ui, provider) => {
    const options = isValidElement(children)
        ? { element: children, path: '/'}
        : children;

    const router = createMemoryRouter([{ ...options}, ...routes], {
        initialEntries: [options.path],
        initialIndex: 1
    })

    const wrappedUi = provider ? cloneElement(provider, {}, ui) : ui

    const finishLoading = () => waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))

    const utils = render(<RouterProvider router={router}>
        {wrappedUi}
    </RouterProvider>)

    return {
        ...utils,
        finishLoading
    }
}