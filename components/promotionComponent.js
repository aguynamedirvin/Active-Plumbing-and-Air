// promotionComponent.js
function promotionComponent() {
    return {
        promotions: [],
        dateString: '',
        init() {
            this.getLastDayOfCurrentMonth();
        },
        getLastDayOfCurrentMonth() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let lastDay = new Date(year, month, 0).getDate();

            // Array of month names
            let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            // Add ordinal suffix
            let suffix;
            if (lastDay % 10 == 1 && lastDay != 11) {
                suffix = 'st';
            } else if (lastDay % 10 == 2 && lastDay != 12) {
                suffix = 'nd';
            } else if (lastDay % 10 == 3 && lastDay != 13) {
                suffix = 'rd';
            } else {
                suffix = 'th';
            }
            
            this.dateString = `${monthNames[month - 1]} ${lastDay}${suffix}, ${year}`;
        }
    }
}

window.promotions = promotionComponent();