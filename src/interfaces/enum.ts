export const ENUM_FOR_LISTING_VIEW = {
    GRID_VIEW: "Grid View",
    LIST_VIEW: "List View"
}
export const ENUM_FOR_BLOG_TAB = {
    ALL_BLOG: "ALL_BLOG",
    MY_BLOGS: "MY_BLOGS"
}

export const ENUM_FOR_BLOGS_TABLE_HEADERS = {
    TITLE: "Title",
    AUTHOR: "Author",
    DATE: "Date",
    TAGS: "Tags",
    LIKES: "Likes",
    ACTIONS: "Actions",
}

export const ENUM_FOR_BLOGS_KEY_TABLE_HEADERS = {
    TITLE: "heading",
    AUTHOR: "author_name",
    DATE: "createdAt",
    TAGS: "tags",
    LIKES: "likes",
    ACTIONS: "",
}
export const ENUM_FOR_SORT_ORDER = {
    ASC: "ASC",
    DESC: "DESC",

}


export const ENUM_FOR_BLOG_CREATE_PRIVIEW = {
    CREATE_BLOG: "CREATE_BLOG",
    PREVIEW_BLOG: "PREVIEW_BLOG"
}

export const ENUM_FOR_STUTUS = [
    { value: "Published", label: "Published" },
    { value: "Unpublished", label: "Unpublished" },
    { value: "Requested", label: "Requested" },
    { value: "Draft", label: "Draft" },
    { value: "Cancelled", label: "Cancelled" },
]


export const ENUM_FOR_EDIT_BLOG_RIGHT = [
    "Published",
    "Unpublished",
    "Requested",
    "Draft"
]

export const ENUM_FOR_PUBLISH_BLOG_RIGHT = [
    "Unpublished",
    "Cancelled"
]

export const ENUM_FOR_UNPUBLISH_BLOG_RIGHT = [
    "Cancelled",
    "Published",
]

export const ENUM_FOR_DELETE_BLOG_RIGHT = [
    "Cancelled", "Published",
    "Unpublished",
    "Requested",
    "Draft"
]

export const ENUM_FOR_STATUS = {
    Cancelled: "Cancelled",
    Published: "Published",
    Unpublished: "Unpublished",
    Requested: "Requested",
    Draft: "Draft"
}

export const ENUM_FOR_CHARITY_STATUS = {

    Publish: "Publish",
    Unpublish: "Unpublish",

}

export const ENUM_FOR_MY_CHARITY_TAB = {
    APPROVED: "approved",
    REQUESTED: "requested",
}

export const ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT = {
    NAME_FOR_MANGEMENT: "Name",
    ID_FOR_MANGEMENT: "Charity Id",
    DESCRIPTION_FOR_MANGEMENT: "Description",
    AUTHOR_FOR_MANGEMENT: "Author",
    DATE_FOR_MANGEMENT: "Date",
    TARGET_FOR_MANGEMENT: "Target",
    COLLECTED_FOR_MANGEMENT: "Collected",
    PROGRESS_FOR_MANGEMENT: "Progress",
    STATUS_FOR_MANGEMENT: "Status",
    AMOUNT_FOR_MANAGEMENT: "Amount",

}
export const ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT = {
    NAME_FOR_MANGEMENT: "charity_name",
    ID_FOR_MANGEMENT: "formated_id",
    DESCRIPTION_FOR_MANGEMENT: "description",
    AUTHOR_FOR_MANGEMENT: "author",
    DATE_FOR_MANGEMENT: "createdAt",
    TARGET_FOR_MANGEMENT: "goal_amount",
    COLLECTED_FOR_MANGEMENT: "collected_amount",
    AMOUNT_FOR_MANAGEMENT: "monthly_amount",
    STATUS_FOR_MANGEMENT: "status"

}
export const ENUM_FOR_MY_CHARITY_TABLE_KEYS = {
    TITLE: "heading",
    AUTHOR: "author_name",
    DATE: "createdAt",
    TAGS: "tags",
    LIKES: "likes",
    ACTIONS: "",
}