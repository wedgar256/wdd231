document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Hidden Timestamp Field
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Handle Modal Open Buttons
    const openButtons = document.querySelectorAll(".open-modal");
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.querySelector(`#${modalId}`);
            if (modal) {
                modal.showModal(); // Opens modal backdrop natively
            }
        });
    });

    // 3. Handle Modal Close Buttons
    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // 4. Close Modal when clicking outside modal box
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            const dialogBounds = dialog.getBoundingClientRect();
            if (
                e.clientX < dialogBounds.left ||
                e.clientX > dialogBounds.right ||
                e.clientY < dialogBounds.top ||
                e.clientY > dialogBounds.bottom
            ) {
                dialog.close();
            }
        });
    });
});