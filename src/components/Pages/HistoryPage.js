import '../../App.css';
import {TableComponent} from "./TableComponent/TableComponent";


export const HistoryPage = (props) => {
    const {listHistory, historyFlow, view} = props;

    return (
        <div className="TableWrapper">
            <h2>history</h2>
            <TableComponent
                view={view}
                listHistory={listHistory}
                historyFlow={historyFlow}
            />
        </div>
    )
}