import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./Miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("https://13.53.131.123:3443/api/chat", config);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: "Failed to load chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={3}
            backgroundColor="gray.100"
            borderRadius="lg"
            borderWidth="1px"
            width="100%"
            maxWidth={{ base: "100%", md: "31%" }}
        >
            <Box
                paddingBottom={3}
                paddingRight={3}
                fontSize={{ base: "20px", md: "24px" }}
                fontFamily="sans-serif"
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                width="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text marginBottom={{ base: 2, md: 0 }}>My Chats</Text>
                <GroupChatModal>
                    <Button
                        display="flex"
                        fontSize={{ base: "14px", md: "16px" }}
                        rightIcon={<AddIcon />}
                        backgroundColor="teal.400"
                        color="white"
                        _hover={{ bg: "teal.500" }}
                        marginTop={{ base: 2, md: 0 }}
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                padding={3}
                backgroundColor="#F8F8F8"
                width="100%"
                height="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                backgroundColor={selectedChat === chat ? "teal.400" : "gray.200"}
                                color={selectedChat === chat ? "white" : "black"}
                                paddingX={3}
                                paddingY={2}
                                borderRadius="lg"
                                key={chat._id}
                                marginBottom={2}
                                _hover={{ bg: "teal.300", color: "white" }}
                            >
                                <Text>
                                    {!chat.isGroupChat
                                        ? getSender(loggedUser, chat.users)
                                        : chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;
