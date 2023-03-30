const showExportBtn = document.getElementById('show-export-btn')
const hideExportBtn = document.getElementById('hide-export-btn')

const showmodifyBtn = document.getElementById('show-modify-btn')
const hidemodifyBtn = document.getElementById('hide-modify-btn')

const showCopyBtn = document.getElementById('show-copy-btn')

const exportUserDiv = document.getElementById('exportuser')

const exoprtdescDiv = document.getElementById('exportuserdesciption')

const country = document.getElementById('country').value;

codigoallusers =  `Get-ADUser -Filter Enabled -eq 'True'`;


showExportBtn.addEventListener('click', () => {
  exportUserDiv.style.display = 'block'
  showExportBtn.style.display = 'none'
  showmodifyBtn.style.display = 'none'
  showCopyBtn.style.display='none'
  exoprtdescDiv.style.display = 'block'

})

hideExportBtn.addEventListener('click', () => {
  exportUserDiv.style.display = 'none'
  showExportBtn.style.display = 'block'
  showmodifyBtn.style.display = 'block'
  showCopyBtn.style.display='none'
  exoprtdescDiv.style.display = 'none'
  limpiarCampos()
})

let inputHabilitado = false
let grupo =""
let filtrogrupo =""
let filtrogrupos =""

function habilitarInput() {
  const input = document.getElementById("memberof");
  inputHabilitado = !inputHabilitado;
  input.disabled = !input.disabled;
  const texto = document.getElementById("memberof").value;
  if (input.disabled) 
  {
    input.value = "";
    textoResultado.textContent = ""; 
  }
}



//---
//----------------------------------------------------------------------------
var employeeCheckbox = document.getElementById("employeeTypeCheckbox");
var freelancerCheckbox = document.getElementById("freelanceruserCheckbox");
var permanentCheckbox = document.getElementById("permanentuserCheckbox");


employeeCheckbox.addEventListener("change", function() {
  if (!employeeCheckbox.checked) {
    freelancerCheckbox.disabled = false;
    permanentCheckbox.disabled = false;
   const country = document.getElementById('country').value; 
  } else {
    freelancerCheckbox.disabled = true;
    permanentCheckbox.disabled = true;
    document.getElementById("freelanceruserCheckbox").checked = false;
    document.getElementById("permanentuserCheckbox").checked = false;

   // freelancerCheckbox.disabled = false;
    const country = document.getElementById('country').value;
    
  }
});
freelancerCheckbox.addEventListener("change", function() {
  if (freelancerCheckbox.checked) {
    permanentCheckbox.checked = false;
   const country = document.getElementById('country').value;
  }
});


permanentCheckbox.addEventListener("change", function() {
  if (permanentCheckbox.checked) {
    freelancerCheckbox.checked = false;
    const country = document.getElementById('country').value;
  }
});



//----------------------------------------------------------------------------

  



//---


const form = document.getElementById('adForm');
const outputScript = document.getElementById('outputScript');
    

form.addEventListener('submit', event => {
 

  event.preventDefault();

  const texto = document.getElementById("memberof").value;
  const country = document.getElementById('country').value;
  const username = document.getElementById('username').value;
  const filename = document.getElementById('filename').value;

  const validFilename = filename.replace(/[^\w\s.-_]/gi, '');
  const finalFilename = validFilename === '' ? 'Export' : validFilename;
  

if (employeeCheckbox.checked){

  filtrogrupo =  "";
  filtrogrupos=""

}

if(freelancerCheckbox.checked){
  codigoallusers=""
  filtrogrupo =  `Get-ADUser -Filter "Enabled -eq 'True' -and employeeType -eq 'Freelancer'" `;
  filtrogrupos=""

}


if(permanentCheckbox.checked){
  codigoallusers=""
  filtrogrupo =  `Get-ADUser -Filter "Enabled -eq 'True' -and employeeType -eq 'Full Time Employee'" `;
  filtrogrupos=""
}

  if (username==="")
  {
    alert("Complete the AQ account username ")
  }else
  {

if (inputHabilitado & texto===""){
  alert("Complete the Gruop Name ")
}else
{
  if(inputHabilitado){
    grupo = `$groupName = "${texto}"
    $groupDN = (Get-ADGroup -Filter "Name -eq '$groupName'").DistinguishedName 
    `
    codigoallusers=""
   


    if (employeeCheckbox.checked){
      filtrogrupo = ` Get-ADUser -Filter "Enabled -eq 'True' -and MemberOf -eq '$groupDN'" `
    }else{
      filtrogrupos=""
    }

    if(freelancerCheckbox.checked){
      filtrogrupo = ` Get-ADUser -Filter "Enabled -eq 'True' -and employeeType -eq 'Freelancer' -and MemberOf -eq '$groupDN'" `
    }else{
      filtrogrupos=""
    }
    

    if(permanentCheckbox.checked){
      filtrogrupo = ` Get-ADUser -Filter "Enabled -eq 'True' -and employeeType -eq 'Full Time Employee' -and MemberOf -eq '$groupDN'" `
    }else{
      filtrogrupos=""
    }
  
  }else{

    codigoallusers=  `Get-ADUser -Filter "Enabled -eq 'True'" `;
    grupo=""
    filtrogrupos=""
  }
}
    

      let script = `${grupo}${codigoallusers}${filtrogrupo}${filtrogrupos}`

     script+= `-SearchBase "${country}" -Properties * | Select  `

      const checkboxes = [
      {
        id: 'SamAccountNameCheckbox',
        label: 'SamAccountName, ',
      },
      {
        id: 'surnameCheckbox',
        label: 'surname, ',
      },
      {
        id: 'givennameCheckbox',
        label: 'givenname, ',
      },
    
      {
        id: 'titleCheckbox',
        label: 'Title, ',
      },
      {
        id: 'departmentCheckbox',
        label: 'Department, ',
      },
      {
        id: 'managerCheckbox',
        label: '@{n=\'Manager\';e={(Get-ADUser $_.manager).name}}, ',
      },
      {
        id: 'emailCheckbox',
        label: 'EmailAddress, ',
      },
      {
        id: 'employeeTypeCheckbox',
        label: 'employeeType, ',
      },

      
      {
        id: 'freelanceruserCheckbox',
        label: 'employeeType, ',
      },


      {
        id: 'permanentuserCheckbox',
        label: 'employeeType, ',
      },


      {
        id: 'ExpirationTimeCheckbox',
        label: 'AccountExpirationDate, ',
      },
      {
        id: 'OfficeCheckbox',
        label: 'Office, ',
      },
      {
        id: 'CountryCheckbox',
        label: 'Country, ',
      },
      {
        id: 'CityCheckbox',
        label: 'City, ',
      },
      {
        id: 'PostalCodeCheckbox',
        label: 'PostalCode, ',
      },
      {
        id: 'StreetAddressCheckbox',
        label: 'StreetAddress, ',
      },
      ];

      let elementsAdded = 0;
      for (const checkbox of checkboxes) {
        const checkboxElement = document.getElementById(checkbox.id);
        if (checkboxElement.checked) {
          script += checkbox.label;
          elementsAdded++;
        }
      }

      if (elementsAdded === checkboxes.length) 
      {
        script = script.slice(0, -2); // Remove trailing comma and space
      } else {
        script = script.slice(0, -2); // Remove trailing comma
      }

      script += ` | export-csv "C:\\Users\\${username}\\Desktop\\${finalFilename}.csv" -NoTypeInformation`;

      outputScript.value = script;
      showCopyBtn.style.display="block"

    
  } 

})//final del lisener del boton generar script




showCopyBtn.addEventListener('click', () => {
    outputScript.select();
    document.execCommand('copy');
  });

function limpiarCampos() {
    const campos = document.querySelectorAll('input[type="text"], input[type="checkbox"], textarea');
    campos.forEach(campo => {
      if (campo.type === 'text') {
        campo.value = '';
      } else if (campo.type === 'checkbox') {
        campo.checked = false;
      } else if (campo.tagName.toLowerCase() === 'textarea') {
        campo.value = '';
      }
    });

    document.getElementById("memberof").disabled = true;
    SamAccountNameCheckbox.checked = true;
    employeeTypeCheckbox.checked= true;
    document.getElementById("country").value = "OU=OGAB,OU=Buenos Aires,OU=AR,OU=AMER,OU=Users,OU=HogarthWW,DC=hogarthww,DC=prv";
  }


