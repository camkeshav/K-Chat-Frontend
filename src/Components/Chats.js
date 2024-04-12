import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/Miscellaneous/SideDrawerModal";
import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <Box width="100%" minHeight="100vh" backgroundColor="#f0f2f5">
            {user && <SideDrawer />}
            <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                padding="20px"
                paddingBottom="80px" // Adjusted padding to accommodate the SideDrawer
                boxSizing="border-box"
            >
                {/* <iframe frameborder="0" src="https://itch.io/embed/2638442" width="552" height="167"><a href="https://chris766x.itch.io/puchu">puchu by Chris766X</a></iframe> */}
                {user && (
                    <MyChats
                        fetchAgain={fetchAgain}
                        style={{ flex: "0 0 30%", maxWidth: "30%" }}
                    />
                )}
                {user && (
                    <Chatbox
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                        style={{ flex: "1" }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default Chatpage;
