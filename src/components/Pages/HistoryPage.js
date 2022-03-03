import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Box, FormControl, InputLabel, OutlinedInput, Tab} from "@mui/material";
import {useState} from "react";


export const HistoryPage = (props) => {
    const {setPage, page} = props;

    const [value, setValue] = useState('');


    const handler = (event) => {
        setValue(event.target.value)
        console.log('event = ', event.target.value);
    }


    return (
        <>
            <DataGrid
                columns={[
                    {
                        field: 'username',
                        headerName: 'Username',
                        description:
                            'The identification used by the person with access to the online service.',
                    },
                    { field: 'age', headerName: 'Age' },
                ]}
                rows={rows}
            />
        </>
    )

}