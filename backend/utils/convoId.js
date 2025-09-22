export function convoId(userA, userB) {
  return String(userA) < String(userB)
    ? `${userA}_${userB}`
    : `${userB}_${userA}`;
}
