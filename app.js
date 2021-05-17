const apiKey = 'd7PLUCql1DUVNbas9tgX';
const baseSearchURL = `https://api.winnipegtransit.com/v3/streets.json?usage=long&api-key=${apiKey}&name=`;
const baseStopURL = `https://api.winnipegtransit.com/v3/stops.json?usage=long&api-key=${apiKey}&street=`;

const getData = async url => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const getStopScheduleURL = stop => {
  const scheduleURL = `https://api.winnipegtransit.com/v3/stops/${stop.key}/schedule.json?usage=long&api-key=${apiKey}`;

  return scheduleURL;
}

const getStopSchedules = data => {
  const scheduledStops = [];

  data.stops.forEach(async (stop) => {
    const stopScheduleURL = getStopScheduleURL(stop);

    scheduledStops.push(getData(stopScheduleURL));
  })

  return Promise.all(scheduledStops);
}

const getStops = data => {
  // replace street key with target dataset key
  const streetKey = data.streets[0].key;
  const stops = getData(`${baseStopURL}${streetKey}`);

  return stops;
}

const search = searchString => {
  const searchURL = `${baseSearchURL}${searchString}`;

  return getData(searchURL);
}

search('kinver')
  // .then(data => buildHTMLLinks)
  // getStops on click
  .then(data => getStops(data))
  // .then(data => console.log(data))
  .then(data => getStopSchedules(data))
  .then(data => console.log(data[0]))
  // .then(data => console.log(data))