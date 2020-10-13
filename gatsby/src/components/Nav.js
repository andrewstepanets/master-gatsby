import React from 'react';
import { Link } from 'gatsby';

// Example of using navigate component from Gatsby
//
// function goToSliceMasters() {
//   // wait for 2 seconds
//   setTimeout(() => {
//     console.log('Go to slicers!!!');
//     navigate('/slicemasters', { replace: true });
//   }, 2000);
// }

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizzas Menu</Link>
        </li>
        <li>
          <Link to="/">Logo</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
        {/* <li>
          <button type="button" onClick={goToSliceMasters}>
            Push ot go to the slicemaasters page
          </button>
        </li> */}
      </ul>
    </nav>
  );
}
