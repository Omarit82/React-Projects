

export const PriorityBadge = ({ color, label }) => {
    
    return (
        <div className="d-flex align-items-center prioridad">
            {label}
            <div className={`${color}Point ms-2`} />
        </div>
    )
};