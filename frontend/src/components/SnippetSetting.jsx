import { FaRegEdit, FaTrash } from "react-icons/fa";

function SnippetSetting({ onEdit, onDelete }) {
  return (
    <div className="snippetSetting">
      <ul>
        <li onClick={onEdit}>
          <FaRegEdit style={{ marginRight: "10px" }} />
          Edit
        </li>
        <li onClick={onDelete}>
          <FaTrash style={{ marginRight: "10px" }} />
          Delete
        </li>
      </ul>
    </div>
  );
}

export default SnippetSetting;
