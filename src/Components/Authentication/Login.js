import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormErrorIcon } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { HTMLToJSON } from 'html-to-json-parser';

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const regex = new RegExp("[B b][0-9]+@skit\.ac\.in")
    const [error, setError] = useState(false)

    const handleEmailCheck = ()=>{
        setError(regex.test(email))
    }

    useEffect(()=>{
    handleEmailCheck()
    },[email])
    const history = useHistory();

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        // console.log(email, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://13.48.44.200:3443/api/user/login",
                { email, password },
                config
            );

            // console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Login error",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter your SKIT Email"
                    isInvalid={!error}
                    title="Enter a valid SKIT Domain ID"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                {!error ? ( 
                    <FormHelperText> 
                        Enter a valid SKIT Domain ID
                    </FormHelperText>
                ) : ( 
                    <FormHelperText> 
                        You are good to go... 
                    </FormHelperText> 
                )} 
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="orange"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
                isDisabled={!error}
            >
                Login as User
            </Button>
            {/* <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("user@guest.com");
                    setPassword("Guest123");
                }}
            >
                Login as Guest
            </Button> */}
        </VStack>
    );
};

export default Login;