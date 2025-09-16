import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { key: 'all', label: '모두' },
    { key: 'electronics', label: '전자기기' },
    { key: 'jewelery', label: '쥬얼리' },
    { key: "men's clothing", label: '남성의류' },
    { key: "women's clothing", label: '여성의류' }
  ];

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.key}
          className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;