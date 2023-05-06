import {useState, useEffect} from 'react';

// 倒计时 Hook
export default function useCountdown(initialTime: number, start: boolean): [number, () => void] {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        // 是否开始倒计时
        if (!start) return
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);
        if (time === 0) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [start, time]);

    const reset = () => {
        setTime(initialTime);
    };

    return [time, reset];
}
