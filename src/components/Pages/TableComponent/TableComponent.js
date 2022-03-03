import {
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import {useState} from "react";
import '../../../App.css';
import {ActionComponent} from "../../ActionComponent";
import {v4} from "uuid";


export const TableComponent = (props) => {
    const {view, listFavorites, setListFavorites, remoteData, setHistoryFlow, historyFlow, setRemoteData, searchData, setSearchData} = props;

    const [page, setPage] = useState({
        'main': 0,
        'favorites': 0,
        'history': 0,
        'addHistory': 0,
        'remHistory': 0,
    });
    const [rowsPerPage, setRowsPerPage] = useState({
        'main': 10,
        'favorites': 10,
        'history': 10,
        'addHistory': 10,
        'remHistory': 10,
    });

    const handleChangePage = (event, newPage) => {
        setPage((prev) => {
            return {
                ...prev,
                [view]: newPage
            }
        });
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage((prev) => {
            return {
                ...prev,
                [view]: event.target.value
            }
        })
        setPage((prev) => {
            return {
                ...prev,
                [view]: 0
            }
        });
    };

    const sortData = () => {
        let data = searchData.sort((a, b) => b.number_inputs - a.number_inputs);
        let newArr = [];
        data.forEach((el, id) => {
            newArr.push({...el, local_id: id});
        })

        return newArr;
    }

    const dataController = () => {
        switch (view) {
            case 'main':
                if (searchData.length === 0) {
                    return remoteData;
                } else {
                    return sortData();
                }
            case 'favorites': return Object.values(listFavorites);
            case 'history': return historyFlow;
            case 'addHistory': return historyFlow.filter((el) => el.move_type === 'add');
            case 'remHistory': return historyFlow.filter((el) => el.move_type === 'rem');
            default: return;
        }
    }

    const actionControllerTitle = () => {
        switch (view) {
            case 'main': return <TableCell>Add to favorites</TableCell>;
            case 'favorites': return <TableCell>Add to favorites</TableCell>;
            case 'history': return (
                <>
                    <TableCell>Movement type</TableCell>
                    <TableCell>Date</TableCell>
                </>
            )
            case 'addHistory': return <TableCell>Date</TableCell>;
            case 'remHistory': return <TableCell>Date</TableCell>;
            default: return;
        }
    }

    return (
        <>
            <Table sx={{ minWidth: 400, maxWidth: 400 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Name</TableCell>
                        {actionControllerTitle()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataController().slice(page[view] * rowsPerPage[view], page[view] * rowsPerPage[view] + rowsPerPage[view]).map((el) => {
                        return (
                            <TableRow key={v4()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{el.id}</TableCell>
                                <TableCell>{el.title}</TableCell>
                                <ActionComponent
                                    view={view}
                                    listFavorites={listFavorites}
                                    setListFavorites={setListFavorites}
                                    remoteData={remoteData}
                                    setHistoryFlow={setHistoryFlow}
                                    setRemoteData={setRemoteData}
                                    searchData={searchData}
                                    setSearchData={setSearchData}
                                    el={el}
                                />
                            </TableRow>
                        )}
                    )}
                </TableBody>
            </Table>
            <TablePagination
            component="div"
            count={dataController().length}
            rowsPerPage={rowsPerPage[view]}
            page={page[view]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}