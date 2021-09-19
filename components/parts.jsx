export function Th (props){
    const {children} = props
    return(
        <th>
            {children}
        </th>
    )
}


export function Table (props){
    const {children} = props
    return(
        <table className="p-4 mt-2 mb-4">
            {children}
        </table>
    )
}



export function Thead (props){
    const {children} = props
    return(
        <thead className="bg-gray-400 text-2xl">
            {children}
        </thead>
    )
}


export function Tbody (props){
    const {children} = props
    return(
        <tbody  className="text-md">
            {children}
        </tbody >
    )
}




export function Tr (props){
    const {children} = props
    return(
        <tr className="py-2">
            {children}
        </tr>
    )
}




export function Td (props){
    const {children} = props
    return(
        <td className="px-2">
            {children}
        </td>
    )
}




export function Input (props){
    const {children} = props
    return(
        <input className="py-2 px-4 border-2 border-gray-300 rounded-sm" {...props}>
            {children}
        </input>
    )
}



export function Checkbox (props){
    const {children} = props
    return(
        <input type="checkbox" {...props}>
            {children}
        </input>
    )
}




