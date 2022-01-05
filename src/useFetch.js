import { useState, useEffect } from 'react';


//custom hooks must start with use...., like useEffect, useFetch, etc

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal})
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                } else{
                    setError(err.message);
                    setIsPending(false);
                }    
            })
        }, 1000);

        return () => abortCont.abort();

    }, [url]);//this is a dependency array - the empty array only allows the useEffect hook to run on the intial render
    //without it, it will run everytime the state changes and the page is rerendered.

    return { data, isPending, error }
}

export default useFetch;