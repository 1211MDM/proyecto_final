let isLoggedIn = false;
let cows = [];

function showLogin() {
    document.getElementById('auth-content').style.display = 'block';
    document.getElementById('Register').style.display = 'none';
    document.getElementById('Login').style.display = 'block';
}

function showRegister() {
    document.getElementById('auth-content').style.display = 'block';
    document.getElementById('Login').style.display = 'none';
    document.getElementById('Register').style.display = 'block';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simular el inicio de sesión
    if (username && password) {
        isLoggedIn = true;
        showMainContent(username);
    } else {
        alert('Por favor ingresa tus credenciales');
    }
}

function register() {
    const newusername = document.getElementById('newusername').value;
    const newpassword = document.getElementById('newpassword').value;

    // Simular el registro
    if (newusername && newpassword) {
        isLoggedIn = true;
        showMainContent(newusername);
    } else {
        alert('Por favor ingresa todos los campos');
    }
}

function showMainContent(username) {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('username-display').textContent = username;
    document.getElementById('user-initials').textContent = username.charAt(0).toUpperCase();

    loadCowList();
}

function logout() {
    isLoggedIn = false;
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('main-header').style.display = 'none';
    cows = [];
}

function addCow() {
    const cowName = document.getElementById('cow-name').value;
    const cowWeight = document.getElementById('cow-weight').value;
    const cowBreed = document.getElementById('cow-breed').value;
    const cowId = document.getElementById('cow-id').value;
    const cowAge = document.getElementById('cow-age').value;
    const cowHealth = document.getElementById('cow-health').value;

    if (cowName && cowWeight && cowBreed && cowId && cowAge && cowHealth) {
        const newCow = {
            name: cowName,
            weight: parseFloat(cowWeight),
            breed: cowBreed,
            id: cowId,
            age: parseInt(cowAge),
            health: cowHealth
        };
        cows.push(newCow); // Añadir la vaca al arreglo
        loadCowList(); // Recargar la lista de vacas
        clearInputs(); // Limpiar los campos
    } else {
        alert("Por favor ingresa todos los datos de la vaca.");
    }
}

function loadCowList() {
    const cowList = document.getElementById('cow-list');
    cowList.innerHTML = ''; // Limpiar la lista antes de recargarla

    cows.forEach((cow, index) => {
        const cowCard = document.createElement('div');
        cowCard.classList.add('cow-card');

        // Mostrar detalles de la vaca al hacer clic
        cowCard.onclick = function() { showCowDetails(index); };

        const cowInfo = document.createElement('div');
        cowInfo.classList.add('cow-info');
        cowInfo.innerHTML = `
            <h4>${cow.name}</h4>
            <p>Raza: ${cow.breed}</p>
            <p>ID: ${cow.id}</p>
            <p>Edad: ${cow.age} años</p>
        `;
        
        // Botones de actualización y eliminación
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('cow-buttons');

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Actualizar';
        updateButton.onclick = function(event) {
            event.stopPropagation(); // Evitar que se abra la vista de detalles
            updateCow(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function(event) {
            event.stopPropagation(); // Evitar que se abra la vista de detalles
            deleteCow(index);
        };

        buttonContainer.appendChild(updateButton);
        buttonContainer.appendChild(deleteButton);
        cowCard.appendChild(cowInfo);
        cowCard.appendChild(buttonContainer);
        
        cowList.appendChild(cowCard);
    });
}

function updateCow(index) {
    const cow = cows[index];

    // Pre-cargar los datos en el formulario de agregar vacas
    document.getElementById('cow-name').value = cow.name;
    document.getElementById('cow-weight').value = cow.weight;
    document.getElementById('cow-breed').value = cow.breed;
    document.getElementById('cow-id').value = cow.id;
    document.getElementById('cow-age').value = cow.age;
    document.getElementById('cow-health').value = cow.health;

    // Cambiar el botón de agregar a actualizar
    const addButton = document.querySelector('.add-cow-form button');
    addButton.textContent = 'Actualizar Vaca';
    addButton.onclick = function() { saveUpdatedCow(index); };
}

function saveUpdatedCow(index) {
    const cowName = document.getElementById('cow-name').value;
    const cowWeight = document.getElementById('cow-weight').value;
    const cowBreed = document.getElementById('cow-breed').value;
    const cowId = document.getElementById('cow-id').value;
    const cowAge = document.getElementById('cow-age').value;
    const cowHealth = document.getElementById('cow-health').value;

    if (cowName && cowWeight && cowBreed && cowId && cowAge && cowHealth) {
        const updatedCow = {
            name: cowName,
            weight: parseFloat(cowWeight),
            breed: cowBreed,
            id: cowId,
            age: parseInt(cowAge),
            health: cowHealth
        };
        cows[index] = updatedCow; // Reemplazar la vaca existente con la actualizada
        loadCowList(); // Recargar la lista de vacas
        clearInputs(); // Limpiar los campos
        document.querySelector('.add-cow-form button').textContent = 'Agregar Vaca'; // Resetear el botón
        document.querySelector('.add-cow-form button').onclick = addCow; // Resetear la acción
    } else {
        alert("Por favor ingresa todos los datos de la vaca.");
    }
}

function deleteCow(index) {
    if (confirm('¿Estás seguro de que deseas eliminar esta vaca?')) {
        cows.splice(index, 1); // Eliminar la vaca del arreglo
        loadCowList(); // Recargar la lista de vacas
    }
}

function clearInputs() {
    document.getElementById('cow-name').value = '';
    document.getElementById('cow-weight').value = '';
    document.getElementById('cow-breed').value = '';
    document.getElementById('cow-id').value = '';
    document.getElementById('cow-age').value = '';
    document.getElementById('cow-health').value = '';
}

function showCowDetails(index) {
    const cow = cows[index];
    const detailsContainer = document.getElementById('cow-details');
    detailsContainer.innerHTML = `
        <p><strong>Nombre:</strong> ${cow.name}</p>
        <p><strong>Raza:</strong> ${cow.breed}</p>
        <p><strong>ID:</strong> ${cow.id}</p>
        <p><strong>Edad:</strong> ${cow.age} años</p>
        <p><strong>Estado de Salud:</strong> ${cow.health}</p>
        <p><strong>Peso:</strong> ${cow.weight} kg</p>
    `;
    document.getElementById('cow-details-container').style.display = 'block';
    document.getElementById('main-container').style.display = 'none';
}

function closeCowDetails() {
    document.getElementById('cow-details-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
}