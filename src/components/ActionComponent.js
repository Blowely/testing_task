import {
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import {useState} from "react";

import StarBorderIcon from '@mui/icons-material/StarBorder';

import '../../App.css';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {TABLE_VIEWS} from "src/components/ActionComponent/constants.ts";



export const ActionComponent = (props) => {
    const {view, listFavorites, setListFavorites, remoteData, setListHistory, el} = props;


    const addToFavorites = (el) => {
        setListFavorites((prev) => {
            return {
                ...prev,
                [el.id]: {...el}
            };
        })
        setListHistory((prev) => {
            return {
                ...prev,
                'add': [
                    ...prev.add,
                    el
                ]
            }
        })
    }

    const removeFromFavorites = (el) => {
        const newArr = JSON.parse(JSON.stringify(listFavorites));
        delete newArr[el.id];
        setListFavorites({...newArr} || {});
        setListHistory((prev) => {
            return {
                ...prev,
                'rem': [
                    ...prev.rem,
                    el
                ]
            }
        })
    }

    console.log('view = ', TABLE_VIEWS.main);

    //const tableView = tableViews.find(view);

    const actionController = (tableView) => {
        switch (tableView){
            case 'main': return (
                <TableCell align="right" onClick={addToFavorites.bind(null, el)}>
                    <StarBorderIcon className="actionIcon"/>
                </TableCell>
            )
            case 'favorites': return (
                <TableCell align="right" onClick={removeFromFavorites.bind(null, el)}>
                    <DeleteOutlineIcon className="actionIcon"/>
                </TableCell>
            )
           /* case 'history': return (
                <TableCell align="right" onClick={addToFavorites.bind(null, el)}>
                    <StarBorderIcon className="actionIcon"/>
                </TableCell>
            )
            case 'addHistory': return (
                <TableCell align="right" onClick={addToFavorites.bind(null, el)}>
                    <StarBorderIcon className="actionIcon"/>
                </TableCell>
            )
            case 'remHistory': return (
                <TableCell align="right" onClick={addToFavorites.bind(null, el)}>
                    <StarBorderIcon className="actionIcon"/>
                </TableCell>
            )*/
            default: return;
        }
    }

    return (
        <>
           {/* {actionController(tableView)}*/}
        </>
    )
}