import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Box, FormControl, InputLabel, OutlinedInput, Tab} from "@mui/material";
import {useState} from "react";


export const FormControl = (props) => {
    const {setPage, page} = props;

    const [value, setValue] = useState('');


    const handler = (event) => {
        setValue(event.target.value)
        console.log('event = ', event.target.value);
    }


    return (
        <FormControl>
            <InputLabel htmlFor="component-outlined">Name</InputLabel>
            <OutlinedInput
                id="component-outlined"
                value={value}
                onChange={handler}
                label="Name"
            />
        </FormControl>
    )

}