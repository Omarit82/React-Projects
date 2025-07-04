import { Table } from "react-bootstrap";
import { Inserto } from "./Inserto";


export const Planilla = ({tiempo, payload}) => {
    
    return (
        <div className="m-auto">
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>{tiempo}</th>
                        <th>Risposta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Io</td>
                        <td><Inserto data={payload&&payload.io}/></td>
                    </tr>
                    <tr>
                        <td>Tu</td>
                        <td><Inserto data={payload&&payload.tu}/></td>
                    </tr>
                    <tr>
                        <td>Lui/Lei</td>
                        <td><Inserto data={payload&&payload.lui}/></td>
                    </tr>
                    <tr>
                        <td>Noi</td>
                        <td><Inserto data={payload&&payload.noi}/></td>
                    </tr>
                    <tr>
                        <td>Voi</td>
                        <td><Inserto data={payload&&payload.voi}/></td>
                    </tr>
                    <tr>
                        <td>Loro</td>
                        <td><Inserto data={payload&&payload.loro}/></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}