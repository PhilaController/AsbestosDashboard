
// Dimensions of data that be filtered
const DIMS = ["school_name", "application_date", "project_type", "operation_type", "school_level", "complete_date"]

const DATE_COLUMNS = ["application_date", "work_start", "complete_date"]

// Output
const OUTPUT_COLUMNS = {
    "application_date": "Application Date",
    "complete_date": "Planned Completion Date",
    "facility_name": "Facility Name",
    "facility_owner": "Facility Owner",
    "operation_type": "Operation Type",
    "permit_number": "Permit Number",
    "project_type": "Project Type",
    "school_address": "School Address",
    "school_level": "School Level",
    "school_name": "School Name",
    "school_website": "School Website",
    "status": "Status",
    "permit_url": "URL",
    "work_description": "Description",
    "work_start": "Planned Start Date"

}

// Categories for specific dimensions
const CATEGORIES = {
    "project_type": [
        'Non Friable Removal',
        'Small Removal Project',
        'Incidental Removal Project',
        'Minor Removal Project',
        'Major Removal Project'
    ],
    "operation_type": ['Renovation', 'Emergency Renovation', 'Abatement prior to Demolition'],
    "school_level": [
        'elementary',
        'elementary-middle',
        'middle',
        'middle-high',
        'high',
        'elementary-middle-high']
}

// Display aliases for dimensions
const ALIASES = {
    "school_level": {
        'elementary': "Elementary",
        'elementary-middle': "Elementary/Middle",
        'high': "High",
        'middle': "Middle",
        'middle-high': "Middle/High",
        'elementary-middle-high': "Elementary/Middle/High"
    }
}



export { DATE_COLUMNS, ALIASES, CATEGORIES, DIMS, OUTPUT_COLUMNS }