export const getAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;

  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const isEligibleByRole = (role, dateOfBirth) => {
  const age = getAge(dateOfBirth);

  if (age === null) return false;

  if (role === "Scout") {
    return age >= 18;
  }

  if (role === "Athlete") {
    return age >= 13;
  }

  return false;
};