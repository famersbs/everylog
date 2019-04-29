import { CardStatus } from '../../../../modules/card'

import New from './new'
import Write from './write'
import View from './view'

export default {
  [CardStatus.NEW]: New,
  [CardStatus.WRITE]: Write,
  [CardStatus.VIEW]: View,
  [CardStatus.EDIT]: New,
  [CardStatus.DETAILVIEW]: View,
}
