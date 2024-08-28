import React, { useEffect, useState } from 'react';

interface TimerProps {
    endTime: Date;
}

const Timer: React.FC<TimerProps> = ({ endTime }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endTime) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    const isTimeLeftZero = () => {
        return timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
    };

    return (
        <div className="timer">
            {isTimeLeftZero() ? (
                <span className="text-red-500">Expired</span>
            ) : (
                <>
                    {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
                    {timeLeft.hours > 0 && <span>{timeLeft.hours}h </span>}
                    {timeLeft.minutes > 0 && <span>{timeLeft.minutes}m </span>}
                    <span>{timeLeft.seconds}s</span>
                </>
            )}
        </div>
    );
};

export default Timer;
