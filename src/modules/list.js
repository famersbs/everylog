//export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
import moment from 'moment'

import {colorMap} from '../type'

export const CardType = {
    WORKOUT: 'workout',
    TEXT: 'text',
    BOOK: 'book',
}

const sampleSummary =  {
    labels: [-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0],
    datasets: [
        {
            borderWidth: 2,
            data: [10,10,10,10,14,10,13,10,10,10,100,10,10,10],  // 2주 데이터
            ...colorMap.good,
        }
    ],
    goal: 15,
}


const initialState = {
    rows: [
        {
            title: "Work out",
            cards: [
                {
                    id: 1,
                    type: CardType.WORKOUT,
                    title: "Push up 20 x 3",
                    summary: sampleSummary,
                    updated_at: moment().unix() - (60 * 60 * 24 * 3),

                },
                {
                    id: 2,
                    type: CardType.WORKOUT,
                    title: "Pull up 20 x 3",
                    summary: {
                        ...sampleSummary,
                        datasets: [{
                            ...sampleSummary.datasets[0],
                            ...colorMap.normal
                        }]
                    },
                    updated_at: moment().unix() - (60 * 60 * 24 * 3),
                },
                {
                    id: 3,
                    type: CardType.WORKOUT,
                    title: "Pull up 20 x 3",
                    summary: {
                        ...sampleSummary,
                        datasets: [{
                            ...sampleSummary.datasets[0],
                            ...colorMap.bad
                        }]
                    },
                    updated_at: moment().unix() - (60 * 60 * 24 * 3),
                },

            ]
        },
        {
            title: "Book",
            cards: [
                {
                    id: 4,
                    type: CardType.BOOK,
                    title: "Push up 20 x 3",
                    summary: {
                        progress: 10,
                    },
                    updated_at: moment().unix(),
                },
                {
                    id: 5,
                    type: CardType.BOOK,
                    title: "Push up 20 x 3",
                    summary: {
                        progress: 15,
                    },
                    updated_at: moment().unix() - (60 * 60 * 24),
                },
                {
                    id: 6,
                    type: CardType.BOOK,
                    title: "Push up 20 x 3",
                    summary: {
                        progress: 20,
                    },
                    updated_at: moment().unix() - (60 * 60 * 24 * 3),
                },
            ]
        },
    ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
