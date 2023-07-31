import { useState } from 'react';
import s from './counter.module.scss';

export const Counter = () => {
    const [ counter, setCounter ] = useState(0);

    return (
        <div className={s['container']}>
            <button onClick={() => setCounter(prev => prev + 1)}>increment</button>
            <p>
                {counter}
            </p>
            <button onClick={() => setCounter(prev => prev - 1)}>decrement</button>
        </div>
    );
};
