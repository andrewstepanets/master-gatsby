import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is working right now!</p>
      )}
      {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
    </div>
  );
}
function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>No one is working right now!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown</h1>
      <p>Open 9:00 to 22:00 Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
