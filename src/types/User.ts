export interface UserAddress {
  provinceId: string;
  provinceName: string;
  regencyId: string;
  regencyName: string;
  districtId: string;
  districtName: string;
  streetDetail?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: UserAddress;
  favorites: string[]; // Array of product IDs favorited by user
  createdAt: string;
}
