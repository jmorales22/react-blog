import { useState, useEffect } from 'react';
import BlogList from './BlogList'

const Home = () => {

    const [blogs, setBlogs] = useState(null);

    const [name, setName] = useState('mario');

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setBlogs(data);
        })
    }, []);//this is a dependency array - the empty array only allows the useEffect hook to run on the intial render
    //without it, it will run everytime the state changes and the page is rerendered.

    return (
        <div className="home">
           {blogs && < BlogList blogs={ blogs } title="All Blogs!" />}
           {/* <button onClick={() => setName('luigi')}>change name</button>
           <p>{name}</p> */}
        </div>
    );
}
 
export default Home;