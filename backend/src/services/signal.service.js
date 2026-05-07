const calculateSignalTimings = (
  lanes,
  weatherMultiplier = 1
) => {

  const totalVehicles = lanes.reduce(
    (acc, curr) => acc + curr,
    0
  );


  // if no traffic
  if (totalVehicles === 0) {

    return {
      activeLane: 0,
      timings: [10, 10, 10, 10],
    };

  }


  // proportional timings
  const timings = lanes.map((count) => {

    const proportion = count / totalVehicles;

    const rawTime = proportion * 120 * weatherMultiplier;

    return Math.max(
      10,
      Math.min(60, Math.round(rawTime))
    );

  });


  // highest traffic lane
  const maxVehicles = Math.max(...lanes);

  const activeLane = lanes.indexOf(maxVehicles);


  return {
    activeLane,
    timings,
  };

};


export {
  calculateSignalTimings,
};