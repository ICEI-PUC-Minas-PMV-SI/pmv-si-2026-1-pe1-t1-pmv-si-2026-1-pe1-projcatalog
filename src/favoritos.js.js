// ===========================
// CATALOG. — favoritos.js
// ===========================

function removerFavorito(btn) {
  const card = btn.closest('.card');

  // Animação de saída
  card.style.opacity = '0';
  card.style.transform = 'scale(0.95)';
  card.style.transition = 'all 0.25s ease';

  setTimeout(() => {
    card.remove();

    // Atualiza o contador
    const total = document.querySelectorAll('.card').length;
    const contador = document.getElementById('contador');
    contador.textContent =
      total + ' estabelecimento' + (total !== 1 ? 's' : '') +
      ' salvo' + (total !== 1 ? 's' : '');
  }, 250);
}