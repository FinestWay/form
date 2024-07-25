const form = document.getElementById('projectForm')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const div = document.getElementById('div').value
  const rollno = document.getElementById('rollno').value
  const projectTitle = document.getElementById('projectTitle').value

  const response = await fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, rollno, div, projectTitle })
  })

  const result = await response.json()
  if (result.success) {
    alert('Project Registered Successfully')

    // clearing all the values
    form.name.value = ''
    form.email.value = ''
    form.div.value = ''
    form.rollno.value = ''
    form.projectTitle.value = ''
  } else {
    alert('Error Submitting project')
  }
})
