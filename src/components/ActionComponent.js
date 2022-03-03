import {
    Button,
    TableCell,
} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import '../App.css';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const ActionComponent = (props) => {
    const {view, listFavorites, setListFavorites, el, setHistoryFlow, setRemoteData, searchData, setSearchData} = props;

    const TABLE_VIEWS = [
        "main",
        'favorites',
        'history',
        'addHistory',
        'remHistory'
    ];

    const addToFavorites = (el) => {
        setListFavorites((prev) => {
            return {
                ...prev,
                [el.id]: {...el}
            };
        })

        setHistoryFlow((prev) => {
            return [
                ...prev,
                {
                    ...el,
                    date: Date.now(),
                    move_type: 'add'
                }
            ]
        })

        setRemoteData((prev) => {
            const data = [...prev];
            const index = data.findIndex((row) => row.id === el.id);
            data.splice(index, 1);
            return data;
        })

        if (searchData.length !== 0) {
            setSearchData((prev) => {
                const data = [...prev];
                data.splice(el.local_id, 1);

                return data;
            })
        }

    }

    const removeFromFavorites = (el) => {
        const newArr = JSON.parse(JSON.stringify(listFavorites));
        delete newArr[el.id];

        setListFavorites({...newArr} || {});

        setHistoryFlow((prev) => {
            return [
                ...prev,
                {
                    ...el,
                    date: Date.now(),
                    move_type: 'rem'
                }
            ]
        })

        setRemoteData((prev) => {
            const data = [...prev];
            let spareIndex = '';
            const index = data.findIndex((row) => row.id === el.id + 1);

            if (index === -1) {
                spareIndex = data.findIndex((row) => row.id === el.id - 1);
            }

            data.splice(index ? index : spareIndex, 0, {...el});
            return data;
        })

        if (searchData && searchData.length !== 0) {
            setSearchData((prev) => {
                const data = [...prev];

                data.splice(el.local_id, 0, {...el});
                return data;
            })
        }
    }

    const moveTypeButton = () => {
        switch (el.move_type) {
            case 'add': return (
                <Button variant="contained" disabled color="success" className="addBut">
                    addition
                </Button>
            )
            case 'rem': return (
                <Button variant="contained" color="error" disabled className="remBut">
                    remove
                </Button>
            )
            default: return;
        }
    }

    const actionController = () => {
        if (!TABLE_VIEWS.includes(view)) {
            return;
        }

        const date = new Date(el.date);


        switch (view){
            case 'main': return (
                <TableCell align="right">
                    <StarBorderIcon className="actionIcon" onClick={addToFavorites.bind(null, el)}/>
                </TableCell>
            )
            case 'favorites': return (
                <TableCell align="right">
                    <DeleteOutlineIcon className="actionIcon" onClick={removeFromFavorites.bind(null, el)}/>
                </TableCell>
            )
            case 'history': return (
                <>
                    <TableCell align="right">
                        {moveTypeButton()}
                    </TableCell>
                    <TableCell align="right">
                        {date.toLocaleString()}
                    </TableCell>
                </>
            )
            case 'addHistory': return (
                <TableCell align="right">
                    {date.toLocaleString()}
                </TableCell>
            )
            case 'remHistory': return (
                <TableCell align="right">
                    {date.toLocaleString()}
                </TableCell>
            )
            default: return;
        }
    }

    return (
        <>
            {actionController(view)}
        </>
    )
}