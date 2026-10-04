async function loadConversations() {
  const response = await fetch('/admin/conversations');
  const data = await response.json();
  const tbody = document.getElementById('conversationTableBody');
  tbody.innerHTML = '';

  if (!data.conversations.length) {
    tbody.innerHTML = '<tr><td colspan="5">No conversations yet.</td></tr>';
    return;
  }

  data.conversations.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.sender_id}</td>
      <td>${item.message || '—'}</td>
      <td>${item.selected_service || '—'}</td>
      <td>${item.created_at}</td>
    `;
    tbody.appendChild(row);
  });
}

async function clearConversations() {
  const confirmed = confirm('Clear all conversations?');
  if (!confirmed) return;

  await fetch('/admin/clear', { method: 'POST' });
  await loadConversations();
}

document.getElementById('clearBtn').addEventListener('click', clearConversations);
loadConversations();
setInterval(loadConversations, 5000);
