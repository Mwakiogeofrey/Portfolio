
document.addEventListener('DOMContentLoaded', () => {
    const humbager = document.querySelector('.humbager');
    const navbars = document.querySelector('.navbars');
    const logo = document.querySelector('.logo');
    const close = document.querySelector('.close');
  
    humbager.addEventListener('click', function () {
        
        navbars.classList.toggle('active');
    })

    close.addEventListener('click', function () {
        navbars.classList.remove('active')
    })
  
    window.onscroll = () => {
        navbars.classList.remove('active');
         
    };
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = validateForm();
    
        if (isValid) {
            saveToLocalStorage();
            sendForm();
        }
    });
    
    function validateForm() {
        let isValid = true;
    
        // Name validation
        const name = document.getElementById('name').value;
        const nameError = document.getElementById('usernameError');
        if (name.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.classList.add('error');
            nameError.style.display = 'block';// Use a CSS class to toggle visibility
            isValid = false;
        } else {
            nameError.classList.remove('error');
        }
    
        // Email validation
        const email = document.getElementById('email').value;
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = 'Enter a valid email address';
            emailError.classList.add('error');
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.classList.remove('error');
        }
    
        // Message validation
        const message = document.getElementById('message').value;
        const messageError = document.getElementById('messageError');
        if (message.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageError.classList.add('error');
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.classList.remove('error');
        }
    
        return isValid;
    }
    
    function saveToLocalStorage() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
    
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('message', message);
    }
    
    function sendForm() {
        const form = document.getElementById('form');
        const formData = new FormData(form);
        const message = formData.get('message');
    
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset();
                alert(`Thank you for your message`);
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        alert(data['errors'].map(error => error['message']).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                });
            }
        }).catch(error => {
            console.error('Error submitting form:', error);
            alert('Oops! There was a problem submitting your form');
        });
    }
// apling my projects dynamicaly
const projects = [
  {
    name: "Project 1",
    image: "images/background.jpg",
    languages: ["React", "JavaScript", "Html", "Css"],
    link: "http://"
  },
  {
    name: "Project 2",
    image: "images/background.jpg",
    languages: ["JavaScript", "Html", "Css"],
    link: "http://"
  },
  {
    name: "Project 3",
    image: "images/background.jpg",
    languages: ["JavaScript", "Html", "Css"],
    link: "http://"
  },
  {
    name: "Project 4",
    image: "images/background.jpg",
    languages: ["JavaScript", "Html", "Css"],
    link: "http://"
  },
  {
    name: "Project 5",
    image: "images/background.jpg",
    languages: ["JavaScript", "Html", "Css"],
    link: "http://"
  },
  {
    name: "Project 6",
    image: "images/background.jpg",
    languages: ["JavaScript", "Html", "Css"],
    link: "http://"
  }
];

function generateProjectHTML(project) {
    return `
        <div class="project">
            <img src=${project.image} alt="screen shot of my project">
            <h2>${project.name}</h2>
            <ul class="languages">
                ${project.languages.map(lang => `<li>${lang}</li>`).join('')}
            </ul>
            <button>
                <a href="${project.link}">See Project</a>
            </button>
        </div>
    `;
}

// Function to render projects
function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = projects.map(generateProjectHTML).join('');
}

// Call renderProjects to populate the projects section
renderProjects();
   
  });