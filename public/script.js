const form = document.getElementById('projectForm')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const div = document.getElementById('div').value
  const rollno = document.getElementById('rollno').value
  const projectTitle = document.getElementById('projectTitle').value

  const response = await fetch('https://form-v4uz.onrender.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, rollno, div, projectTitle })
  })

  const result = await response.json()
  if (result.success) {
    alert("Project Registered Successfully")
    // clearing all the values
    document.getElementById('name').value = ''
    document.getElementById('email').value = ''
    document.getElementById('div').value = ''
    document.getElementById('rollno').value = ''
    document.getElementById('projectTitle').value = ''
  } else {
    alert('Error Submitting project')
  }
})
