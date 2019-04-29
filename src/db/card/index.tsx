import { store } from "../../utils/fb";
import moment from "moment";

import { DISPLAY_DATE_TIME } from "../../component/cardform";

import { getCardSummary } from "./summary";
import {
  CardType,
  CardSetting,
  Card,
  CardLog,
  CardID,
  CardLogs
} from "../../type";

export function createANewCard(
  uid: string,
  type: CardType,
  setting: CardSetting
) {
  const d = moment().unix();
  return store.collection("card").add({
    uid,
    type,
    setting,
    archive: false,
    created_at: d,
    updated_at: d
  });
}

export function editACard(id: CardID, setting: CardSetting) {
  const d = moment().unix();
  return store
    .collection("card")
    .doc(id)
    .update({
      setting,
      updated_at: d
    });
}

export function addALog(uid: string, card: Card, log: CardLog) {
  const d = moment().unix();
  const target_date = moment(
    log.target_date as string,
    DISPLAY_DATE_TIME
  ).unix();
  delete log.target_date;

  const logDoc = {
    uid,
    card_id: card.id,
    type: card.type,
    log,
    created_at: d,
    updated_at: d,
    target_date: target_date // Serch option
  };
  //  Validate 해야 할까? --> 각 컴포넌트에서 하는것이 나을까?
  return store
    .collection("cardlog")
    .add(logDoc)
    .then(r => {
      const summary = getCardSummary(card, target_date, log);
      const cardUpdateData = {
        updated_at: d,
        summary
      };

      return store
        .collection("card")
        .doc(card.id)
        .update(cardUpdateData)
        .then(() => r);
    });
}

export function archive(id: CardID) {
  return store
    .collection("card")
    .doc(id)
    .update({ archive: true, updated_at: moment().unix() });
}

export function getCardWithLogs(uid: string, card_id: CardID) {
  return Promise.all([
    store
      .collection("card")
      .doc(card_id)
      .get(),
    store
      .collection("cardlog")
      .where("uid", "==", uid)
      .where("card_id", "==", card_id)
      .get()
      .catch(e => {
        return null;
      })
  ]).then(r => {
    const cardSnap = r[0];
    const logsSnap = r[1];
    if (!cardSnap.exists) throw new Error(`Cannot found card [${card_id}]`);

    const card = cardSnap.data() as Card;
    card.logs = [];
    if (logsSnap != null) {
      logsSnap.forEach(doc => {
        const data = doc.data();
        let logs = card.logs;
        if (logs === undefined) {
          logs = card.logs = [] as CardLogs;
        }

        logs.push({
          ...data.log,
          id: doc.id,
          target_date: data.target_date,
          created_at: data.created_at,
          updated_at: data.updated_at
        });
      });
      // sort by target_date asc
      card.logs = card.logs.sort((a: CardLog, b: CardLog) => {
        if (a.target_date === undefined) return 1;
        if (b.target_date === undefined) return -1;
        return a.target_date > b.target_date ? 1 : -1;
      });
    }
    return card;
  });
}

//// Watch
function watchPreProcess(
  onChange: (changed: [Card], deleted: [CardID]) => void
) {
  return (q: firebase.firestore.QuerySnapshot) => {
    const deleted: [CardID] = new Array() as [CardID];
    const changed: [Card] = new Array() as [Card];

    q.docChanges().forEach((change: firebase.firestore.DocumentChange) => {
      if (change.type !== "removed") {
        changed.push({ ...change.doc.data(), id: change.doc.id } as Card);
      } else {
        deleted.push(change.doc.id);
      }
    });

    onChange(changed, deleted);
  };
}

/**
 *
 * @param {*} uid
 * @param {*} onChange
 * @param {*} onError
 * @return {() => void}  unSnapshot
 */
export function watchCard(
  uid: string,
  onChange: (changed: [Card], deleted: [CardID]) => void,
  onError: (error: Error) => void
) {
  return store
    .collection("card")
    .where("uid", "==", uid)
    .where("archive", "==", false)
    .onSnapshot({}, watchPreProcess(onChange), onError);
}

/**
 *
 * @param {*} uid
 * @param {*} card_id
 * @param {*} onChange
 * @param {*} onError
 * @return {() => void}  unSnapshot
 */
export function watchLogs(
  uid: string,
  card_id: CardID,
  onChange: (doc: firebase.firestore.QuerySnapshot) => void,
  onError: (error: Error) => void
) {
  return store
    .collection("cardlog")
    .where("uid", "==", uid)
    .where("card_id", "==", card_id)
    .onSnapshot({}, onChange, onError);
}
