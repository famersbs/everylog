var moment = require('moment')
var { admin } = require('./fbadmin-dev')
// var { admin } = require('./fbadmin-prod')

var fs = admin.firestore()

var { getCardSummary } = require('../src/db/card/summary')

console.log("Regenerate Summary ...")

var twoWeeksAgo = moment().hour(0).minute(0).seconds(0).subtract(13, 'days').unix()

console.log(twoWeeksAgo)

var cur_idx = 0
var works = []

// Get all Card
fs.collection('card')
  .get()
  .then( qs => {
    qs.forEach( ds => {
      works.push( { id: ds.id, card: ds.data() } )
    })
    return generateSummary()
  })
  .then( () => {
    console.log("done")
  })

function generateSummary() {
  if (works.length == cur_idx) return Promise.resolve("done")
  var { id, card } = works[cur_idx]
  cur_idx += 1

  return fs.collection('cardlog')
    .where('card_id', '==', id)
    .where('target_date', '>=', twoWeeksAgo)
    .get()
    .then( ls => {
      card.summary = null
      card.updated_at = moment().unix()
      ls.forEach( ds => {
        var data = ds.data()
        card.summary = getCardSummary(card, data.target_date, data.log)
      })

      // console.log(card.summary)
      if( card.summary == null ) return Promise.resolve(true)

      // Update summary on card
      return fs.collection('card')
        .doc(id)
        .update({
          updated_at:  moment().unix(),
          summary: card.summary
        })
    })
    .catch( e => {
      console.log(e)
    })
    .then( () => generateSummary())
}
