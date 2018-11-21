import Time from 'react-time';

const DataComponent = ({date, open}) => (
    <tr>
        <td>
            <Time value={new Date(date)} titleFormat="YYYY/MM/DD HH:mm" relative/>
        </td>
        <td>{open
                ? 'Auki'
                : 'Kiinni'}</td>
    </tr>
);

export default (props) => {
    const DataList = props
        .data
        .reverse()
        .map(d => <DataComponent key={d.id} open={d.open} date={d.createdAt}/>);

    return (
        <table>
            <thead>
                <tr>
                    <th>Aika</th>
                    <th>tila</th>
                </tr>
            </thead>
            <tbody>
                {DataList}
            </tbody>
        </table>
    );
};
