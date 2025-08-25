

export const Product = ({item})=>{
    
    return (
        <>
            <tr>
                <td>{item.properties.hs_object_id}</td>
                <td>{item.properties.name}</td>
                <td>{item.properties.description}</td>
                <td>{item.properties.info_uno_id}</td>
            </tr>
        </>
    )
}