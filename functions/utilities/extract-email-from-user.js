export default function extractEmailFromUser (user) {
  return user.email || user.providerData.find(({ email }) => email).email;
}
