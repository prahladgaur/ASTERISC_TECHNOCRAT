import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate()

    //state
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })

    //Handle change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/register', { username: inputs.name, email: inputs.email, password: inputs.password })
            if (data.success) {
                toast.success("user register Successfully");
                navigate("/login");
            }
        } catch (error) {
            console.log(error)
        }
        console.log(inputs);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    margin="auto"
                    margintop={5}
                    boxShadow="10px 10x 20px #ccc"
                    padding={4}
                    borderRadius={6}
                >
                    <Typography variant='h4'
                        padding={3}
                        textAlign={'center'} sx={{ textTransform: "uppercase" }}>
                        Register
                    </Typography>
                    <TextField
                        placeholder='name'
                        value={inputs.name}
                        name='name'
                        margin='normal'
                        type={"text"}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder='email'
                        value={inputs.email}
                        name='email'
                        margin='normal'
                        type={"email"}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder='password'
                        value={inputs.password}
                        name='password'
                        margin='normal'
                        type={"password"}
                        required
                        onChange={handleChange}
                    />

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        sx={{ borderRadius: 3, marginTop: 3 }}

                    >Submit</Button>
                    <Button
                        onClick={() => navigate("/login")}
                        type='submit'

                        color='primary'
                        sx={{ borderRadius: 3, marginTop: 3 }}>Already registered ? Please Login</Button>
                </Box>
            </form>
        </>
    )
}

export default Register
