import { Table } from "react-bootstrap";


export const Tabella = ({tempo, register}) => {
    
    const tiempos ={
        tempo: []
    }
    console.log(tiempos);
    
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{tempo}</th>
                    <th>Risposta</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Io</td>
                    <td><input type="text" name="Io"{...register(tiempos.tempo.push("io"),{required:true})} /></td>
                </tr>
                <tr>
                    <td>Tu</td>
                    <td><input type="text" name="Tu"{...register(tiempos.tempo.push("tu"),{required:true})} /></td>
                </tr>
                <tr>
                    <td>Lui/Lei</td>
                    <td><input type="text" name="Lui/Lei"{...register(tiempos.tempo.push("lei"),{required:true})} /></td>
                </tr>
                {/*<tr>
                    <td>Noi</td>
                    <td><input type="text" name="Noi"{...register(,{required:true})} /></td>
                </tr>
                <tr>
                    <td>Voi</td>
                    <td><input type="text" name="Voi"{...register(,{required:true})} /></td>
                </tr>
                <tr>
                    <td>Loro</td>
                    <td><input type="text" name="Loro"{...register(,{required:true})} /></td>
                </tr> */}
            </tbody>
        </Table>
    )
}