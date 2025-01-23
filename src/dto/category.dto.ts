export type TreeCategoryCreate = {
    title: string;
    parent_id?: string; 
  };
  
  export type SingleTreeCategoryNode = {
    title: string;
    id: string; 
    parent_id?: string | null;  
    subCategories: Array<SingleTreeCategoryNode>; 
  };
