import {TabContext, TabList} from '@mui/lab';
import {Box, Tab} from "@mui/material";
import '../App.css';

export const Header = (props) => {
    const {page, setPage} = props;

    const switchPageHandler = (event) => {
        setPage(event.target.name);
    }

    return (
        <TabContext value={page}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="header">
                <TabList aria-label="lab API tabs example" onChange={switchPageHandler}>
                    <Tab label="Main" value="Main" name="Main"/>
                    <Tab label="History" value="history" name="history"/>
                    <Tab label="History of additions" value="addHistory" name="addHistory"/>
                    <Tab label="Deletion history" value="remHistory" name="remHistory"/>
                </TabList>
            </Box>
        </TabContext>
    )
}