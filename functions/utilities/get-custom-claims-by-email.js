export default async function getCustomClaimsByEmail (ref, email) {
  const snap = await ref.once('value');

  const claimsMap = snap.val();
  let claims;

  for (const key in claimsMap) {
    const userClaims = claimsMap[key];

    if (userClaims.email == email) {
      claims = userClaims.claims;
      break;
    }
  }

  return claims;
}
