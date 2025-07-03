import { Table } from "react-bootstrap";
import { Inserto } from "./Inserto";


export const Planilla = ({tiempo, payload}) => {
    //console.log(payload);
    
    
   
    return (
         <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{tiempo}</th>
                    <th>Risposta</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Io</td>
                    <td><Inserto data={payload&&payload[0]}/></td>
                </tr>
                <tr>
                    <td>Tu</td>
                    <td><Inserto data={payload&&payload[1]}/></td>
                </tr>
                <tr>
                    <td>Lui/Lei</td>
                    <td><Inserto data={payload&&payload[2]}/></td>
                </tr>
                <tr>
                    <td>Noi</td>
                    <td><Inserto data={payload&&payload[3]}/></td>
                </tr>
                <tr>
                    <td>Voi</td>
                    <td><Inserto data={payload&&payload[4]}/></td>
                </tr>
                <tr>
                    <td>Loro</td>
                    <td><Inserto data={payload&&payload[5]}/></td>
                </tr>
            </tbody>
        </Table>
    )
}