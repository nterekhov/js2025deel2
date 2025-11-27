// Component-functie die een HTML string teruggeeft voor een <li>

export function createUserCard(user) {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${user.getLabel()}</span>
            <span class="badge bg-primary">User</span>
        </li>
    `;
}