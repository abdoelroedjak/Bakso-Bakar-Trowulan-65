/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "BAKSO BAKAR" | "BAKSO KUAH" | "MINUMAN" | "CEMILAN";
  image: string;
  spicyCustomizable?: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  spicyLevel?: number; // 0 to 5
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  isCustom?: boolean;
}
