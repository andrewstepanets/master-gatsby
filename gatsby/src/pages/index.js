import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>Currently Slicing</p>
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <p>Hot Slices</p>
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();
  console.log(sliceMasters);
  return (
    <div className="center">
      <h1>The Best Pizza Downtown</h1>
      <p>Open 9:00 to 22:00 Every Single Day</p>
      <div>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
