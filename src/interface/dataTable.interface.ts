

 export interface Data {
    calories: number;
    carbs: number;
    dessert: string;
    fat: number;
    id: number;
    protein: number;
  }
  
 export interface ColumnData {
    dataKey: keyof Data;
    label: string;
    numeric?: boolean;
    width: number;
  }
  
