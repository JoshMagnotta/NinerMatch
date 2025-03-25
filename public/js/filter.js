document.addEventListener("DOMContentLoaded", function () {
    const genderFilters = document.querySelectorAll('input[name="gender"]');
    const styleFilters = document.querySelectorAll('input[name="style"]');
    const roommateCards = document.querySelectorAll('.roommate-card');
    const noResultsMessage = document.getElementById("no-results-message");

    function applyFilters() {
        const selectedGender = [...genderFilters].find(input => input.checked)?.value || "All";
        const selectedStyle = [...styleFilters].find(input => input.checked)?.value || "All";

        let visibleCount = 0;

        roommateCards.forEach(card => {
            const gender = card.getAttribute("data-gender");
            const style = card.getAttribute("data-style");

            const matchesGender = (selectedGender === "All" || gender === selectedGender);
            const matchesStyle = (selectedStyle === "All" || style === selectedStyle);

            if (matchesGender && matchesStyle) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        noResultsMessage.style.display = (visibleCount === 0) ? "block" : "none";
    }

    genderFilters.forEach(filter => filter.addEventListener("change", applyFilters));
    styleFilters.forEach(filter => filter.addEventListener("change", applyFilters));

    applyFilters(); 
});
