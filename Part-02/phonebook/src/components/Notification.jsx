const Notification = ({message, classes}) =>{
    console.log(message)
    if(message === null){
        return null
    }
    const className = (classes ==='error')? 'error':'notification'
    return (
        <div className = {className}>
            {message}
        </div>
    )
}
export default Notification