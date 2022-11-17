const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));
function validate(mail) {
  if (mail.validity.typeMismatch) {
    mail.setCustomValidity("Please enter valid email.");
    mail.reportValidity();
  } else {
    mail.setCustomValidity("");
  }
}



function validateAge(today, dobobj) {
  var age = today.getFullYear() - dobobj.getFullYear();
  var m = today.getMonth() - dobobj.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobobj.getDate())) {
    age--;
  }
  return age;
}
let dobelement = document.getElementById("dob");
dobelement.addEventListener("change", () => {
  let [y,m,d] = document.getElementById("dob").value.split("-");
  let dob = new Date(y,m,d);
  let Today = new Date();
  age = validateAge(Today, dob);
  if (age < 18 || age > 55) {
    dobelement.setCustomValidity("Age should lie between 18 and 55.");
 
    return;
  } else {
    dobelement.setCustomValidity("");
  }
});
let form = document.getElementById("form");

const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let Entries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const tablerows = entries
    .map((entry) => {
      const name = `<td>${entry.name}</td>`;
      const email = `<td>${entry.email}</td>`;
      const password = `<td>${entry.password}</td>`;
      const dob = `<td>${entry.dob}</td>`;
      const acceptTerms = `<td>${entry.acceptTerms}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("displayTable");

  tableDiv.innerHTML = `<table>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
  </tr>
    ${tablerows}
  </table>`;
};

const saveUserFrom = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let acceptTerms = document.getElementById("acceptTerms").checked;

  let entry_obj = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};

form.addEventListener("submit", saveUserFrom);

displayEntries();