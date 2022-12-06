const sectionlogin = document.querySelector('#sectionlogin')

const checklogin = async () => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (!username || !token) {
        displayFormLogin()
    } else {
        displayLinkLogout(username)
    }
}

const displayFormLogin = () => {
    sectionlogin.innerHTML = `
        <form>
            <input type="text" name="username" placeholder="Usuario" size="6" class="inputlogin">
            <input type="password" name="password" placeholder="Senha" size="6" class="inputlogin">
            <button type="submit" class="buttonlogin">Fazer Login</button>
        </form>
        <a href="" class="buttoncadastrase">cadastre-se</a>`
    const formlogin = sectionlogin.querySelector('form')
    formlogin.addEventListener('submit', function (evento) {
        evento.preventDefault()
        const payload = new URLSearchParams(new FormData(this))
        sendLogin(payload)
    })
    const linkcad = sectionlogin.querySelector('a')
    linkcad.addEventListener('click', displayFormCadastro)
}

function displayFormCadastro(evento) {
    evento.preventDefault()
    sectionlogin.innerHTML = `
    <form>
        <input type="text" name="username" placeholder="Usuario" size="6" class="inputlogin">
        <input type="password" name="password" placeholder="Senha" size="6" class="inputlogin">
        <button type="submit" class="buttonfinalizar">Finalizar cadastro</button>
    </form>`
    const formcadastro = sectionlogin.querySelector('form')
    formcadastro.addEventListener('submit', function (evento) {
        evento.preventDefault()
        const payload = new URLSearchParams(new FormData(this))
        sendCadastro(payload)
    })
}

const sendCadastro = (payload) => {
    fetch('signin', {
        method: 'PUT',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (username && token) {
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
            }
            checklogin()
        })
}

const sendLogin = (payload) => {
    fetch('login', {
        method: 'POST',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (username && token) {
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
            }
            checklogin()
        })
}

const displayLinkLogout = (username) => {
    sectionlogin.innerHTML = `<span>${username}</span> <a href="#">logout</a>`
    const linklogout = sectionlogin.querySelector('a')
    linklogout.addEventListener('click', function (evento) {
        evento.preventDefault()
        sendLogout()
    })
}

const sendLogout = () => {
    fetch('login', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (!username || !token) {
                localStorage.removeItem('username')
                localStorage.removeItem('token')
            }
            checklogin()
        })
}

checklogin()
