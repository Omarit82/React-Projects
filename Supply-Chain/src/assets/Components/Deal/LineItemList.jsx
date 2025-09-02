

export const LineItemList = ({ lineItems }) => (
    <ul className="p-0 ps-4">
        {lineItems.map((item, index) => (
            <li key={index}>
                {item.properties.name} -{" "}
                <span className="quantity">{item.properties.quantity}</span>
            </li>
        ))}
    </ul>
);