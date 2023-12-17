import { useEffect, useState } from 'react';

const useCheckLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedInStatus = () => {
            const userEmail = localStorage.getItem('userEmail');
            setIsLoggedIn(!!userEmail);
        };

        checkLoggedInStatus();
    }, []);

    return isLoggedIn;
};

export default useCheckLoggedIn;
