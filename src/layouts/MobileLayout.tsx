import { Box } from "@mui/joy";
import { FC } from "react";
import TopBar from "./TopBar";

interface MobileLayoutProps {
    children: React.ReactNode;
}
 
const MobileLayout: FC<MobileLayoutProps> = ({children}) => {
    return ( <Box sx={{
        height: '100vh',
        width: '100vw',
    }}>
        <TopBar />
        <Box sx={{
            height: 'calc(100vh - 60px)',
            overflowY: 'auto',
            padding: 2,
            backgroundColor: '#f5f5f5',
        }}>
        {children}
        </Box>
        
    </Box> );
}
 
export default MobileLayout;