export function isFullNameValid(fullName) {
  switch (true) {
    case fullName.trim() === "":
      return "Full name required";
    case !/^[A-Z][a-z]*$/.test(fullName.split(" ")[0]):
      return "First name must start with  uppercase letter and not contain symbols";
    case !/^[A-Z][a-z]*$/.test(fullName.split(" ")[1]):
      return "Last name must start with uppercase letter and not contain symbols";
    case /[^A-Za-z\s-']/.test(fullName):
      return "special character not allowed in the full name";
  }
}

export const isPasswordValid = (password) => {
  const lengthCheck = /.{8,}/;
  const numberCheck = /\d/;
  const UpperCase = /[A-Z]/;
  const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  switch (true) {
    case !password.trim():
      return "Password is required";
    case !lengthCheck.test(password):
      return "Password must be at least 8 characters.";
    case !UpperCase.test(password):
      return "At least one uppercase letter";
    case !numberCheck.test(password):
      return "Password must contain at least one number.";
    case !specialCharCheck.test(password):
      return "Password must contain at least one special character.";
  }
};

export const isEmailValid = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  switch (true) {
    case !email.trim():
      return "Email feild is required";
    case !emailRegex.test(email.toLowerCase()):
      return "email not valide";
  }
};
 


export const calculateStrength = (password) => {

  const length = password.length;
  let score = 0;

    if (length >= 8) {
      score += 1;
    } else if (length >= 6) {
      score += 1;
    }

    if (/[A-Z]/.test(password) ) {
      score += 2;
    }

    if (/\d/.test(password)) {
      score += 1;
    }
    if(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)){
      score += 1;
    }

    return score;
} 