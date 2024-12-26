import Login from "../pages/auth/Login/Login";
/**
 * Enum for status values.
 */
export const ENUMFORSTATUS = {
  PENDING: "Pending",
  INPROGRESS: "Inprogress",
  COMPLETED: "Completed",
  INCOMPLETE: "Incomplete",
} as const;

export const ENUMFORFORGOTPASSWORDSTEPS = {
  EMAIL: "EMAIL",
  VERIFY_OTP: "VERIFY_OTP",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
};

export const ENUM_FOR_DONOR_TYPE = {
  INDIVIDUAL: "Individual",
  ORGANIZATION: "Organization",
};
export const ENUM_FOR_SIGNUP_STEPS = {
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
  VERIFY_OTP: "VERIFY_OTP",
  YOUR_DETAILS: "YOUR_DETAILS",
  PAYMENT_DETAILS: "PAYMENT_DETAILS",
  THANK_YOU: "THANK_YOU",
};

export const ENUMFORACCOUNTTAB = {
  PERSONAL_DETAILS: "Personal Details",
  UPDATE_PASSWORD: "Update Password",
  SETTINGS: "Settings",
  LANGUAGES_REGION: "Languages_Region",
  PAYMENT: "Payment"
} as const;

export const ENUMFORCHANGEEMAIL = {
  SEND_OTP: "Send Otp",
  Verify_OTP: "Verify Otp"
} as const;
/**
 * Enum for route paths.
 */
export const ENUMFORROUTES = {
  DASHBOARD: "/dashboard",
  REPORTS: "/reports",
  LOGIN: "/login",
  FORGOTPASSWORD: "/forgot-password",
  SIGNUP: "/signup",
  ACCESS_DENIED: "/access-denied",
  USER_MANGEMNET: "/user-mangemnet",
  All_CHARITY: "/all-charity",
  All_CHARITY_DETAILS: "/all-charity/all-charity-details",
  MY_CHARITY: "/my-charity",
  APPROVED_CHARITY_DETAILS: "/my-charity/approved-charity-details",
  CREATE_CHARITY: "/my-charity/create-charity",
  CREATE_CHARITY_ALL: "/all-charity/create-charity",
  OUR_BLOGS: "/our-blogs",
  CREATE_BLOG: "/create-blog",
  SINGLE_BLOG: "/our-blogs/single-blogs",
  SETTINGS: "/settings",
  MY_SUBSCRIPTION: "/my-subscription",
  SINGLE_CHARITY: "/single-charity",
  PGAE_NOT_FOUND: "/page-not-found",

};


/**
 * Response wrapper data transfer object interface.
 */
export interface ResponseWrapperDTO {
  status: string;
  message: string;
  data: any;
  path?: string;
  error: boolean;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  account?: string;
}
/**
 * Page request interface.
 */
export interface PageRequest {
  pageNo: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
  searchText?: string;
  ids?: any;
}
/**
 * Common props interface.
 */
export interface CommonProps {
  className: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  searchTxt: string | undefined;
  value: string | number | readonly string[] | undefined;
}
/**
 * Modal context props interface.
 */
export interface ModalContextProps {
  modal: boolean;
  handleModal: (content?: any, value?: any, dismissModal?: boolean) => void;
  modalContent: any;
  modalValue: any;
}
/**
 * Routes list interface.
 */
export interface RoutesList {
  path: string; // the url
  icon: JSX.Element;
  name: string; // name that appear in Sidebar
  exact: boolean;
}
/**
 * Pagination props interface.
 */
export interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  siblingCount?: 1 | undefined;
  currentPage: number;
  pageSize: number;
  className: string;
  onPageSizeChange: any;
  otherHtml?: any;
}
/**
 * Button props interface.
 */
export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text?: any;
  disabled?: any;
  icon?: JSX.Element;
  children?: any;
}

/**
 * Router props interface.
 */
export interface RouterProps {
  component?: any;
  path: string;
  caseSensitive?: boolean;
  accessType?: any;
  url?: any;
}

/**
 * Dropdown list format interface.
 */
export interface DropdownListFormat {
  label: string;
  value: any;
  sub?: Array<DropdownListFormat>;
  other?: any;
}
/**
 * Page interface.
 */
export interface Page {
  pageUrl: string;
  id: number;
  pageCode: string;
  status: number;
  accessType: string;
}
/**
 * Notification interface.
 */
export interface Notification {
  id: any;
  notificationType: string;
  isNotification: boolean;
}
/**
 * Login data interface.
 */
export interface LoginData {
  userEmail: string;
  password: string;
}

/**
 * User Model interface.
 */
export interface User {
  id: any;
  formated_id: string;
  user_type: any;
  user_category: string;
  donor_type: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  telephone_no: string;
  phone_code: string;
  mobile_no: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  receiveNewsAndUpdates: any;
  profile_pic_url: string;
  createdAt: any;
  createdBy: string;
  updatedAt: any;
  updatedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  is_verified: boolean;
  main_role: any;
  token: string;
  isAuthorizedForCharity: any;
}

export interface UserProfileResponse {
  first_name: string,
  last_name: string,
  email: string,
  mobile_no: any,
  city: any,
  state: any,
  country: any,
  zip_code: any,
  phone_code: string,
  address: string
  url?: any
}

export interface DropDownResponse {
  value: any,
  label: any
}

export interface ChangePasswordRequest {
  current_password: string,
  new_password: string,
  confirm_password: string
}


export interface BlogsReqBody {
  page: any;
  limit: any;
  sortBy?: string;
  orderBy?: string;
  search?: string;
  start_date?: any;
  end_date?: any;
  status?: any;
}

export interface BlogsResponse {
  id: any,
  formated_id?: string,
  heading: string,
  description: string,
  link: string,
  tags: any,
  status: string,
  likes?: any,
  main_role?: any,
  isActive?: any,
  is_verified?: any,
  isRejected?: any,
  isDeleted?: any,
  createdAt?: any,
  createdBy?: any,
  updatedAt?: any,
  lastModifiedBy?: any
  images?: any,
  author_name?: string,
  cover_image?: any,
  urls: any,
  blog_pic?: any,
  cover_image_name?: any,
  cover_image_url?: any,
  blog_pic_name?: any,
}

export interface BlogUploadedImages {
  file?: any;
  url?: string;
  doc_type?: string;
}

export interface TableHeader {
  displayName: string;
  keyName: string;
  sortOrder?: string;
  classname: string;
  isDisplay?: boolean;


}





/* ------------------------------charity -------------------------------- */
/** Charity Response  */
export interface CharityResponse {
  author?: any;
  blog_link?: string;
  charity_color?: any;
  charity_link?: string;
  charity_name?: string;
  charity_status?: string;
  collected_amount?: any;
  createdAt?: any;
  createdBy?: any;
  creator_main_role?: any;
  description?: string;
  formated_id?: any;
  goal_amount?: any;
  id?: any;
  is_verified?: any;
  isActive?: any;
  isDeleted?: any;
  isRejected?: any;
  lastModifiedBy?: any;
  monthly_amount?: any;
  price_id?: any;
  product_id?: string;
  publishedBy?: any;
  tags?: any;
  updatedAt?: any;
  blogsData?: BlogDropDown[];
  images: any

}



export interface BlogDropDown {

  label: string,
  value: number,
  other: BlogsResponse

}

export interface CreateCharityData {
  charity_name: string;
  charity_color: string;
  charity_status: any;
  goal_amount: any;
  description: any;
  cover_pic: any;
  icon_pic: any;
  cover_pic_name: any;
  icon_pic_name: any;
  charity_link: any;
  blog_link: any;
  tags: any;
  monthly_amount: any;
  new_charity_questions_acnc?: any;
  new_charity_questions_dgr?: any;
  new_charity_questions_act?: any;
  id?: any;
}

export interface GetMyCharityReq {

  charity_status?: string
  orderBy?: string,
  sortBy?: string,
  search?: string,
  start_date?: any,
  end_date?: any,
  page?: any,
  limit?: any
}