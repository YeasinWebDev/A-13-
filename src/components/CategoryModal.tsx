import React, { useState } from 'react';

function CategoryModal({ isOpen, onClose, onSave }:CategoryModalProps) {
  const [newCategory, setNewCategory] = useState('');

  const handleSave = () => {
    onSave(newCategory);
    setNewCategory('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-lg mb-4">Add New Category</h2>
        <input
          className="bg-gray-200 p-2 rounded w-full mb-4"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-purple-700 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;

type CategoryModalProps ={
    isOpen: boolean;
    onClose: () => void;
    onSave: (newCategory: string) => void;
  }
