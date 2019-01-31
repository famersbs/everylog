export const colorMap = {
    good :{
      backgroundColor: 'rgba(50,205,50,0.5)',
      borderColor: 'rgba(0,128,0,1)',
      pointHoverBackgroundColor: '#181818',
    },
    normal: {
      backgroundColor: 'rgba(255, 253, 97, 0.5)',
      borderColor: 'rgba(255,202,40,1)',
      pointHoverBackgroundColor: '#181818',
    },
    bad: {
      backgroundColor: 'rgba(255, 100, 52, 0.5)',
      borderColor: 'rgba(221, 44, 0, 1)',
      pointHoverBackgroundColor: '#181818',
    }
}

export const durationMap = {
  DAY: {
    label: "Day",
    value: "Day",
    momentDiffUnit: 'days',
  },
  WEEK: {
    label: "Week",
    value: "Week",
    momentDiffUnit: 'weeks',
  },
  MONTH: {
    label: "Month",
    value: "Month",
    momentDiffUnit: 'months',
  }
}

export const getDurationItemsForCardForm = () => Object.keys(durationMap).map(k => ({...durationMap[k]}))

// Default return Day duration
export const getDurationByValue = (v) => {
  let filtered = Object.keys(durationMap).filter( k => durationMap[k].value === v)
  if(filtered.length > 0) return durationMap[filtered[0]]
  else return durationMap.DAY
}
