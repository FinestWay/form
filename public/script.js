const form = document.getElementById("#projectForm")

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById("#name")
    const email = document.getElementById("#email")
    const rollno = document.getElementById("#rollno")
    const div = document.getElementById("#div")
    const projectTitle = document.getElementById("#projectTitle")

    const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, rollno, div, projectTitle})
    });

    const result = await response.json();
    if(result.success){
        alert("Project Submitted Successfully")
    } else{
        alert("Error Submitting project")
    }

})