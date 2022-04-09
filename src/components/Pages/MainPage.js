import {useState} from "react";
import {FormControl, InputLabel, OutlinedInput,} from "@mui/material";
import '../../App.css';
import {TableComponent} from "./TableComponent/TableComponent";
import tritium from "tritium";

export const MainPage = (props) => {
    const {remoteData, listFavorites, setListFavorites, setHistoryFlow, setRemoteData} = props;

    const [value, setValue] = useState('');
    const [searchData, setSearchData] = useState([]);

    const tree = tritium.ternarySearchTree();

    remoteData.forEach((el) => {
        tree.add(el.title);
    })

    function count(str, symb) {
        let counter = 0;
        let index;
        for (counter = -1, index = 0; index !== -1; counter++) {
            index = str.indexOf(symb, index + 1);
        }

        return counter;
    }

    const inputNameHandler = (event) => {
        const inputValue = event.target.value;

        setValue(event.target.value)

        let prefixSearch = tree.prefixSearch(inputValue);

        if (prefixSearch.length !== 0) {
            prefixSearch.forEach((el, id) => {
                const res = remoteData.find((row) => row.title === el);

                res.number_inputs = count(res.title, inputValue);

                if (res) {
                    setSearchData((prev) => [...prev, res]);
                }
            })
        } else {
            setSearchData([]);
        }
    }

    return (
        <div className="mainPage">
            <FormControl>
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    value={value}
                    onChange={inputNameHandler}
                    label="Name"
                />
            </FormControl>
            <br />
            <div className="TablesContainer">
                <div className="TableWrapper">
                    <h2>list</h2>
                    <TableComponent
                        view="main"
                        listFavorites={listFavorites}
                        setListFavorites={setListFavorites}
                        remoteData={remoteData}
                        setHistoryFlow={setHistoryFlow}
                        setRemoteData={setRemoteData}
                        searchData={searchData}
                        setSearchData={setSearchData}
                    />
                </div>
                <div className="TableWrapper">
                    <h2>list favorites</h2>
                    <TableComponent
                        view="favorites"
                        listFavorites={listFavorites}
                        setListFavorites={setListFavorites}
                        setHistoryFlow={setHistoryFlow}
                        setRemoteData={setRemoteData}
                        searchData={searchData}
                        setSearchData={setSearchData}
                    />
                </div>
            </div>
        </div>
    )
}