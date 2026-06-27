const form = document.getElementById('form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const orderNum = document.getElementById('order-no');
const productCode = document.getElementById('product-code');
const quantity = document.getElementById('quantity');

const complaints = document.querySelectorAll('[name="complaint"]');
const complaintsOther =  document.getElementById('other-complaint');
const complaintDescContainer = document.getElementById('complaint-description-container');
const complaintDesc = document.getElementById('complaint-description');
complaintsOther.addEventListener("change", () => {
  if (complaintsOther.checked) {
    complaintDesc.required = true;
    complaintDescContainer.hidden = false;
  } else {
    complaintDesc.required = false;
    complaintDescContainer.hidden = true;
  }
})

const solutions = document.querySelectorAll('input[name="solutions"]');
const solutionDescContainer = document.getElementById('solution-description-container');
const solutionDesc = document.getElementById('solution-description');
let solutionsOther = document.getElementById('other-solution');
solutions.forEach(solution => {
  solution.addEventListener('change', (e) => {
    if (e.target.value == "other") {
      solutionDesc.required = true;
      solutionDescContainer.hidden = false;
    } else {
      solutionDesc.required = false;
      solutionDescContainer.hidden = true;
  }
  })
})

function validateForm() {
  return {
    "full-name": fullName.checkValidity(),
    "email": email.checkValidity(),
    "order-no": orderNum.checkValidity(),
    "product-code": productCode.checkValidity(),
    "quantity": quantity.checkValidity() && quantity.value > 0,
    "complaints-group": [...complaints].some(complaint => complaint.checked),
    "complaint-description": complaintDesc.value.length < 20 && complaintsOther.checked ? false : true,
    "solutions-group": [...solutions].some(solution => solution.checked),
    "solution-description": solutionDesc.value.length < 20 && solutionsOther.checked ? false : true,
  }
}

const inputFields = [fullName, email, orderNum, productCode, quantity, complaintDesc, solutionDesc];
inputFields.forEach((field) => {
  field.addEventListener("change", () => {
    handleFieldClass(field)
  })
})

function handleComplaintsFieldsetClass() {
  if ([...complaints].some(complaint => complaint.checked)) {
    complaintsFieldset.style.borderColor = "green";
  } else {
    complaintsFieldset.style.borderColor = "red";
  }
}

const complaintsFieldset = document.getElementById('complaints-group');
complaints.forEach(complaint => {
  complaint.addEventListener("change", () => {
    handleComplaintsFieldsetClass()
  })
})

function handleSolutionsFieldsetClass() {
  if ([...solutions].some(solution => solution.checked)) {
    solutionsFieldset.style.borderColor = "green";
  } else {
    solutionsFieldset.style.borderColor = "red";
  }
}

const solutionsFieldset = document.getElementById('solutions-group');
solutions.forEach(solution => {
  solution.addEventListener("change", () => {
    handleSolutionsFieldsetClass()
  })
})

function isValid(validateForm) {
  for (const value of Object.values(validateForm)) {
    if (value == false) { return false }
  }
  return true;
}

function handleFieldClass(field) {
  if (field.type == "textarea") {
    if (field.value.length >= 20) {
      field.style.borderColor = "green";
    } else {
      field.style.borderColor = "red";
    }
  } else {
    if (field.checkValidity()) {
      field.style.borderColor = "green";
    } else {
      field.style.borderColor = "red";
    }
  }
}

form.addEventListener("submit", (e) => {
  if (!isValid(validateForm())) {
    e.preventDefault();
    inputFields.forEach((field) => {
      handleFieldClass(field)
    })
    handleComplaintsFieldsetClass();
    handleSolutionsFieldsetClass();
  }
})