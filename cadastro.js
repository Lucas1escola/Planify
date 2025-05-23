document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const newUsernameInput = document.getElementById('newUsername');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', function(event) {
        // Previne o envio padrão do formulário
        event.preventDefault();

        errorMessage.textContent = ''; // Limpa qualquer mensagem de erro anterior

        const newUsername = newUsernameInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validação básica dos campos
        if (newUsername === '' || newPassword === '' || confirmPassword === '') {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            return;
        }

        // Validação de comprimento da senha (exemplo)
        if (newPassword.length < 6) {
            errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            return;
        }

        // Validação de correspondência de senhas
        if (newPassword !== confirmPassword) {
            errorMessage.textContent = 'As senhas não coincidem.';
            return;
        }

        // Simulação de registro (APENAS PARA EXEMPLO NO FRONTEND)
        // Em um cenário real, você enviaria esses dados para um servidor
        // para registro seguro, incluindo hashing de senha.
        alert('Cadastro bem-sucedido! Redirecionando para a página de login...');
        // Aqui você redirecionaria o usuário para a página de login ou para o painel
        window.location.href = 'index.html'; // Redireciona para a página de login
    });
});
