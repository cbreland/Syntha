  
const md5 = require('md5');
import extractEmailFromUser from './extract-email-from-user';

export default function extractPhotoUrlFromUser (user) {
  const email = extractEmailFromUser(user);
  const provider = user.providerData.find(({ photoURL }) => photoURL);

  return (
    user.photoURL ||
    (provider && provider.photoURL) ||
    `https://www.gravatar.com/avatar/${md5(email)}`
  );
}
