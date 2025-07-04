import { Table } from "react-bootstrap";


export const Tabella = ({grupo,nome,tempo, register}) => {

    
    return (
        <div className="m-auto">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{nome}</th>
                        <th className="text-center">Maschille</th>
                        <th className="text-center">Femmenile</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Io</td>
                        <td><input type="text" name="Io"{...register(`${grupo}[${tempo}[io[0]]]`)} /></td>
                        <td><input type="text" name="Io"{...register(`${grupo}[${tempo}[io[1]]]`)} /></td>
                    </tr>
                    <tr>
                        <td>Tu</td>
                        <td><input type="text" name="Tu"{...register(`${grupo}[${tempo}[tu[0]]]`,{required:true})} /></td>
                        <td><input type="text" name="Tu"{...register(`${grupo}[${tempo}[tu[1]]]`)} /></td>
                    </tr>
                    <tr>
                        <td>Lui/Lei</td>
                        <td><input type="text" name="Lui/Lei"{...register(`${grupo}[${tempo}[lui[0]]]`,{required:true})} /></td>
                        <td><input type="text" name="Lui/Lei"{...register(`${grupo}[${tempo}[lui[1]]]`)} /></td>
                    </tr>
                    <tr>
                        <td>Noi</td>
                        <td><input type="text" name="Noi"{...register(`${grupo}[${tempo}[noi[0]]]`,{required:true})} /></td>
                        <td><input type="text" name="Noi"{...register(`${grupo}[${tempo}[noi[1]]]`)} /></td>
                    </tr>
                    <tr>
                        <td>Voi</td>
                        <td><input type="text" name="Voi"{...register(`${grupo}[${tempo}[voi[0]]]`,{required:true})} /></td>
                        <td><input type="text" name="Voi"{...register(`${grupo}[${tempo}[voi[1]]]`)} /></td>
                    </tr>
                    <tr>
                        <td>Loro</td>
                        <td><input type="text" name="Loro"{...register(`${grupo}[${tempo}[loro[0]]]`,{required:true})} /></td>
                        <td><input type="text" name="Loro"{...register(`${grupo}[${tempo}[loro[1]]]`)} /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}