// Select all checkboxes
$("#selectAll").click(function() {
    $("input[type=checkbox]").prop('checked', $(this).prop('checked'));
});

// Toggle dropdown menu
function toggleDropdownMenu() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Approve selected users
document.getElementById('approveBtn').addEventListener('click', function() {
    alert('Selected users approved.');
    toggleDropdownMenu(); // Close dropdown after action
});

// Delete selected users
document.getElementById('deleteBtn').addEventListener('click', function() {
    alert('Selected users deleted.');
    toggleDropdownMenu(); // Close dropdown after action
});

// menuButton.js 파일에 추가

// 모든 체크박스를 선택하거나 해제하는 기능
$("#selectAll").click(function() {
    $("input[type=checkbox]").prop('checked', $(this).prop('checked'));
});

// 선택된 사용자를 승인하는 기능
document.getElementById('approveBtn').addEventListener('click', function() {
    alert('Selected users approved.');
});

// 선택된 사용자를 거절하는 기능
document.getElementById('rejectBtn').addEventListener('click', function() {
    alert('Selected users rejected.');
});
