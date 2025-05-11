const firebaseConfig = {
  apiKey: "AIzaSyAu_LBuaOE4fYavjI6oEHfiB9bRQAm4ZcI",
  authDomain: "fin-social-26a26.firebaseapp.com",
  projectId: "fin-social-26a26",
  storageBucket: "fin-social-26a26.firebasestorage.app",
  messagingSenderId: "708738574131",
  appId: "1:708738574131:web:cddcd972d247d415488046",
  measurementId: "G-H4L3JWTMDX"
};

// Inicializa o Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Referência para o serviço de autenticação
const auth = firebase.auth();

// Função para login com email e senha
async function signInWithEmail() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log('Usuário logado:', userCredential.user);
    // Redirecionar para a página principal após o login
    window.location.href = '/auth/setup';
  } catch (error) {
    console.error('Erro no login:', error);
    alert('Erro ao fazer login: ' + error.message);
  }
}

// Função para cadastro com email e senha
async function signUpWithEmail() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log('Usuário criado:', userCredential.user);
    // Redirecionar para a página de setup do perfil após o cadastro
     switchView('migration-choice');
  } catch (error) {
    console.error('Erro no cadastro:', error);
    alert('Erro ao criar conta: ' + error.message);
  }
}

// Função para login com Google
async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Configurar o provedor do Google com todas as opções possíveis
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.setCustomParameters({
    'prompt': 'select_account',
    'auth_type': 'reauthenticate',
    'include_granted_scopes': 'true'
  });
  
  try {
    const result = await auth.signInWithPopup(provider);
    // Verificar se é um novo usuário
    if (result.additionalUserInfo.isNewUser) {
      switchView('migration-choice');
    } else {
      window.location.href = '/main';
    }
  } catch (error) {
    console.error('Erro no login com Google:', error);
    alert('Erro ao fazer login com Google: ' + error.message);
  }
}

// Função para login com X (Twitter)
async function signInWithX() {
  const provider = new firebase.auth.TwitterAuthProvider();
  
  try {
    const result = await auth.signInWithRedirect(provider);
    // O redirecionamento será tratado automaticamente pelo Firebase
  } catch (error) {
    console.error('Erro no login com X:', error);
    alert('Erro ao fazer login com X: ' + error.message);
  }
}

// Função para resetar senha
async function resetPassword() {
  const email = document.getElementById('resetEmail').value;

  try {
    await auth.sendPasswordResetEmail(email);
    alert('Email de recuperação enviado! Verifique sua caixa de entrada.');
    switchView('login');
  } catch (error) {
    console.error('Erro ao enviar email de recuperação:', error);
    alert('Erro ao enviar email de recuperação: ' + error.message);
  }
}

// Listener para mudanças no estado de autenticação
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('Usuário autenticado:', user);
    // Se o usuário estiver autenticado e estiver na página de login/signup
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      
    }
  } else {
    console.log('Usuário não autenticado');
  }
});

// Adicionar tratamento do redirecionamento
auth.getRedirectResult().then((result) => {
  if (result.user) {
    console.log('Usuário logado:', result.user);
    // Verificar se é um novo usuário
    if (result.additionalUserInfo.isNewUser) {
       switchView('migration-choice');
    } else {
      window.location.href = '/main';
    }
  }
}).catch((error) => {
  console.error('Erro no redirecionamento:', error);
  alert('Erro ao processar o login: ' + error.message);
});

window.onload = function() {
    // Verificar se o parâmetro 'auth' já existe na URL
    if (window.location.href.indexOf('?aurhrequestidipemailfinlyscial=') === -1) {
        // Gerar um valor aleatório maior (200 caracteres)
        var randomValue = Math.random().toString(36).substring(2, 202);

        // Obter a URL atual
        var currentUrl = window.location.href;

        // Verificar se já existe um parâmetro na URL
        if (currentUrl.indexOf('?') === -1) {
            // Se não houver parâmetros, adicionar o parâmetro auth
            window.location.href = currentUrl + '?aurhrequestidipemailfinlyscial=' + randomValue;
        }
    }
};
