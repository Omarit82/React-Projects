import { Table } from "react-bootstrap";


export const Planilla = ({tiempo, payload}) => {
    console.log(payload);
    
    
   
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
                    <td><input type="text" name="Io" placeholder={payload && payload[0]} /></td>
                </tr>
                <tr>
                    <td>Tu</td>
                    <td><input type="text" name="Tu"/></td>
                </tr>
                <tr>
                    <td>Lui/Lei</td>
                    <td><input type="text" name="Lui/Lei"/></td>
                </tr>
                <tr>
                    <td>Noi</td>
                    <td><input type="text" name="Noi" /></td>
                </tr>
                <tr>
                    <td>Voi</td>
                    <td><input type="text" name="Voi"/></td>
                </tr>
                <tr>
                    <td>Loro</td>
                    <td><input type="text" name="Loro"/></td>
                </tr>
            </tbody>
        </Table>
    )
}