// 페이지 이동 함수
function navigateTo(option) {
  switch (option) {
    case 'signup':
      window.location.href = 'signup.html'; // 계정 가입 페이지로 이동
      break;
    case 'login':
      window.location.href = 'login.html'; // 로그인 페이지로 이동
      break;
    case 'guest':
      window.location.href = 'recipe.html'; // 게스트로 요리 추천 페이지로 이동
      break;
    case 'admin':
      window.location.href = 'admin.html'; // 관리자 로그인 페이지로 이동
      break;
    default:
      alert("올바른 옵션을 선택해주세요.");
  }
}

// 계정 가입 기능
function signup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('아이디와 비밀번호를 입력하세요.');
    return;
  }

  // 비밀번호 암호화
  const encryptedPassword = btoa(password);

  // 로컬 스토리지에 계정 정보 저장
  localStorage.setItem(username, encryptedPassword);
  alert('회원 가입이 완료되었습니다!');
  window.location.href = 'login.html'; // 회원 가입 후 로그인 페이지로 이동
}

function submitRecommendation() {
  const recipe = document.getElementById('recipe').value;
  const details = document.getElementById('details').value;
  const messageElement = document.getElementById('message'); // 메시지 표시 요소

  if (!recipe) {
    alert('추천 요리를 입력하세요!');
    return;
  }

  // 서버로 데이터 전송 (임시 예제)
  fetch('cool-kitchen-recipe-site.up.railway.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipe, details }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('추천 전송 성공:', data);
      messageElement.style.display = 'block'; // "전송됨!" 메시지 표시
      setTimeout(() => {
        messageElement.style.display = 'none'; // 3초 후 메시지 숨기기
      }, 3000);
    })
    .catch(error => {
      console.error('추천 전송 실패:', error);
      alert('전송 중 오류가 발생했습니다.');
    });

  // 입력 필드 초기화
  document.getElementById('recipe').value = '';
  document.getElementById('details').value = '';
}

document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // 기본 폼 제출 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://your-netlify-app.netlify.app/.netlify/functions/server/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          window.location.href = data.redirect; // 로그인 성공 시 관리자 대시보드 이동
      } else {
          alert(data.message); // 로그인 실패 메시지 표시
      }
  })
  .catch(error => console.error("Error:", error));
});
