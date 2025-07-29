

export const Task = ({deal}) => {
 
    console.log(deal);
    
    
    return(
        <>
            <div>
                {deal.properties.dealname}
            </div>
        </>
    )
}