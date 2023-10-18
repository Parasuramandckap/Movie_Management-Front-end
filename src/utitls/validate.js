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
  const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  switch (true) {
    case !password.trim():
      return "Password is required";
    case !lengthCheck.test(password):
      return "Password must be at least 8 characters.";
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
/* 


 if (!/^[A-Z][a-z]*$/.test(firstName) ) {
        return "first name first later uppercase";
      }else if(!/^[A-Z][a-z]*$/.test(lastName)){
        return "last name first later uppercase"
      }else if(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(fullName)){
        return "contains symbols";
      }
*/
