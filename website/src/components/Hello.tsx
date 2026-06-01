import { useCallback, useState } from "react";
import { Button } from "./ui/button";

const Hello = () => {
    const [count, setCount] = useState(0)
    // you should use named function as callback in react
    const handleClick = useCallback(() => {
            console.log('clicked');
            setCount(prev => prev + 1);
        }, [])
    return <div>
        <h1>hello</h1>
        <label>{count}</label><Button onClick={handleClick}>+1</Button>
    </div>
}

export default Hello;