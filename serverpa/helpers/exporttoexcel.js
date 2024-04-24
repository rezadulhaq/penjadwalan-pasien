const XLSX = require('xlsx');
function ExportData()
    {
            let filename='reports.xlsx';
       let data=[{"Market": "IN", "New Arrivals": "6", "Upcoming Appointments": "2", "Pending - 1st Attempt": "4"},
            {"Market": "KS/MO", "New Arrivals": "4", "Upcoming Appointments": "4", "Pending - 1st Attempt": "2"},
            {"Market": "KS/MO", "New Arrivals": "4", "Upcoming Appointments": "4", "Pending - 1st Attempt": "2"},
            {"Market": "KS/MO", "New Arrivals": "4", "Upcoming Appointments": "4", "Pending - 1st Attempt": "2"}]
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "People");
        XLSX.writeFile(wb,filename);
}

     ExportData()