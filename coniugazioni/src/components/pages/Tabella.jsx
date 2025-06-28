import { Table } from "react-bootstrap"


export const Tabella = ({tempo, respuesta}) => {
    console.log(respuesta);
    return (
        <Table striped bordered hover className="m-2">
            <thead>
                <tr>
                    <th>{tempo}</th>
                    <th className="w-50">Risposta</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Io</td>
                    <td><input type="text" name="Io"/></td>
                </tr>
                <tr>
                    <td>Tu</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Lui/Lei</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Noi</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Voi</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Loro</td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    )
}