import { useCallback, useState } from "react";

const Hello = () => {
    const [count, setCount] = useState(0)
    // you should use named function as callback in react
    const handleClick = useCallback(() => {
            console.log('clicked');
            setCount(prev => prev + 1);
        }, [])
    return <div>
        <h1>hello</h1>
        <label>{count}</label><button onClick={handleClick}>+1</button>
    </div>
}

export default Hello;