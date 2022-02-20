import { Match, UserType } from '@teamzero/types';

export function splitMatches(matches: Match[], type: UserType) {
  const pendingMatches: Match[] = [];
  const acceptedMatches: Match[] = [];
  const rejectedMatches: Match[] = [];
  const completedMatches: Match[] = [];
  matches.forEach((match) => {
    const myStatus =
      type === 'propertyOwner'
        ? match.propertyOwnerStatus
        : match.shelterStatus;
    const otherStatus =
      type === 'propertyOwner'
        ? match.shelterStatus
        : match.propertyOwnerStatus;
    if (myStatus === 'rejected' || otherStatus === 'rejected') {
      rejectedMatches.push(match);
    } else if (myStatus === 'accepted' && otherStatus === 'accepted') {
      completedMatches.push(match);
    } else if (myStatus === 'accepted' && otherStatus === 'pending') {
      acceptedMatches.push(match);
    } else {
      pendingMatches.push(match);
    }
  });
  return { pendingMatches, acceptedMatches, rejectedMatches, completedMatches };
}
