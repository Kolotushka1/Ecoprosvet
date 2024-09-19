import React, { useState } from 'react';

const tagsOptions = [
  { id: 1, label: 'Молодежь' },
  { id: 2, label: 'Природа' },
  { id: 3, label: 'Спорт' },
  { id: 4, label: 'Волонтёры' },
  { id: 5, label: 'Деревья' }
];

export const EventTags = () => {
  const [tags, setTags] = useState([{ id: 1, tag: '' }]);

  // Добавление нового тега
  const addTag = () => {
    setTags([...tags, { id: tags.length + 1, tag: '' }]);
  };

  // Удаление тега
  const removeTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  // Обновление значения тега
  const handleTagChange = (id, value) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, tag: value } : tag)));
  };

  return (
    <div>
      <h3>Теги мероприятия</h3>
      {tags.map((tag) => (
        <div key={tag.id} className="tag-row">
          <select
            value={tag.tag}
            onChange={(e) => handleTagChange(tag.id, e.target.value)}
          >
            <option value="">Выберите тег</option>
            {tagsOptions.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => removeTag(tag.id)}>
            Удалить
          </button>
        </div>
      ))}
      <button type="button" onClick={addTag}>
        Добавить тег
      </button>
    </div>
  );
};

