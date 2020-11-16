import extractEmailFromUser from './extract-email-from-user';

export default function extractDisplayNameFromUser (user) {
  const email = extractEmailFromUser(user);
  const provider = user.providerData.find(({ displayName }) => displayName);

  return user.displayName || (provider && provider.displayName) || email;
}
