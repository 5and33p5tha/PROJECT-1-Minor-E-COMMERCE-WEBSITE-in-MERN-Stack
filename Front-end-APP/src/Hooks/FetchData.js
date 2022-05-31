// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const FetchData = () => {
//     // const [post, setPost] = useState([])
//     const [displaypost, setDisplaypost] = useState([])
//     const [limit, setLimit] = useState(20)
//     useEffect(() => {
//         axios.get('https://jsonplaceholder.typicode.com/posts')
//             .then(res =>
//                 // console.log(res.data)
//                 setDisplaypost(res.data))
//             .catch(err => console.log(err))
//         // setDisplaypost(post.slice(0,limit))
//     }, [])
//     return (
//         <div>

//             {displaypost.slice(0, limit).map(item => <li key={item.id}>{item.title}</li>)}

//             {(limit < displaypost.length) && <button onClick={() => { setLimit(limit + 20) }}>Show More</button>}
//             {(limit > 0) && <button onClick={() => { setLimit(limit - 20) }}>Show Less</button>}

//         </div>
//     )
// }

// export default FetchData

//ALTERNATIVELY, WE CAN DO AS FOLLOWS:-

import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchData = () => {
  // const [post, setPost] = useState([])
  const [displaypost, setDisplaypost] = useState([]);
  const [limit, setLimit] = useState(20);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) =>
        // console.log(res.data)
        setDisplaypost(res.data.slice(0, limit))
      )
      .catch((err) => console.log(err));
    // setDisplaypost(post.slice(0,limit))
  }, [limit]);
  return (
    <>
      {displaypost.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}

      {/* {(limit < displaypost.length) && <button onClick={() => { setLimit(limit + 20) }}>Show More</button>} For Some Resason, this will not work*/}
      {limit < 100 && (
        <button
          onClick={() => {
            setLimit(limit + 20);
          }}
        >
          Show More
        </button>
      )}

      {/* We know that ('https://jsonplaceholder.typicode.com/posts') has 100 posts */}

      {limit > 0 && (
        <button
          onClick={() => {
            setLimit(limit - 20);
          }}
        >
          Show Less
        </button>
      )}
    </>
  );
};

export default FetchData;
