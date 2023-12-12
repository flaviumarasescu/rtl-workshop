import React from 'react'


const Form = ({ children, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
            {children}
        </form>
    )
}

export default Form
