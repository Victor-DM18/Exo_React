import React, { useState } from "react";
import axios from "axios";

const Posts = ({ article, ...otherProps }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [updateContent, setUpdateContent] = useState("");

  const dateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  const handleIsEdit = () => {
    setIsEdit(true);
  };

  const handleValid = () => {
    const data = {
      author: article.author,
      content: updateContent ? updateContent : article.content,
      date: article.date,
      updateDate: Date.now(),
    };

    axios
      .put(`http://localhost:3004/articles/${article.id}`, data)
      .then(() => setIsEdit(false));
  };

  const handleUpdateContent = (e) => {
    setUpdateContent(e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm("Supprimer cet article ?")) {
      axios
        .delete(`http://localhost:3004/articles/${article.id}`)
        .then(() => setIsDelete(true))
        .then(() => window.location.reload());
    }
  };

  return !isDelete ? (
    <div
      className={
        isEdit
          ? "bg-cyan-100 p-5 shadow-lg  rounded-lg "
          : "bg-white p-5 shadow-lg  rounded-lg "
      }
    >
      <h2 className="font-extrabold mb-3">{article.author}</h2>
      {isEdit ? (
        <textarea
          onChange={handleUpdateContent}
          autoFocus
          defaultValue={updateContent ? updateContent : article.content}
          className="border border-black w-[100%] h-40"
        ></textarea>
      ) : (
        <p>{updateContent ? updateContent : article.content}</p>
      )}
      <p className="flex justify-end mt-5" {...otherProps}>
        {dateFormat(article.date)}
      </p>
      <div className="flex flex-row gap-5 text-xs">
        <button
          onClick={isEdit ? handleValid : handleIsEdit}
          className="bg-gray-200 border border-black p-2"
        >
          {isEdit ? "Valider" : "Edit"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-gray-200 border border-black p-2"
        >
          Supprimmer
        </button>
      </div>
    </div>
  ) : null;
};

export default Posts;
