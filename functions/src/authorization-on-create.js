//const getCustomClaimsByEmail = require('../utilities/get-custom-claims-by-email');
//const extractEmailFromUser = require('../utilities/extract-email-from-user');
import extractEmailFromUser from '../utilities/extract-email-from-user';
import extractDisplayNameFromUser from '../utilities/extract-display-name-from-user';
import  extractPhotoURLFromUser from '../utilities/extract-photo-url-from-user';
//const setCustomClaims = require('../utilities/set-custom-claims');
import omitEmptyValues from '../utilities/omit-empty-values';

//module.exports = ({ admin, environment }) => async user => {
//  const db = admin.firestore();
//  const usersCollection = db.collection(environment.schema.users);
//  const customClaimsRef = admin.database().ref(environment.schema.customClaims);
//  const auth = admin.auth();
//  const email = extractEmailFromUser(user);
//
//  const claims = (await getCustomClaimsByEmail(customClaimsRef, email)) || {};
//
//  await setCustomClaims({ auth, uid: user.uid, claims });
//
//  const update = mapUserUpdate(claims, user);
//
//  return usersCollection.doc(user.uid).set(update, { merge: true });
//};

export default function mapUserUpdate (claims, user) {

  function removeFunctions (obj) {
    return JSON.parse(JSON.stringify(obj));
  }


  const email = extractEmailFromUser(user);
  const displayName = extractDisplayNameFromUser(user);
  const photoURL = extractPhotoURLFromUser(user);

  return omitEmptyValues({
    claims,
    displayName,
    email,
    photoURL,
    emailVerified: user.emailVerified,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
    providerData: user.providerData.map(removeFunctions)
  });
}