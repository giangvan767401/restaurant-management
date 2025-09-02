export interface Food {
id?: number;
name: string;
price: number; // backend uses Double
description?: string;
category?: string;
available?: boolean;
imageUrl?: string;
}