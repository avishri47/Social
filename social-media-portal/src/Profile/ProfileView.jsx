import React, { useState } from "react";
import "./ProfileView.css";

const ProfileView = ({
  initialData,
  fields,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave?.(formData,formData.id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <h2>Profile Information</h2>
            <p>Manage your personal details</p>
          </div>

          {!isEditing ? (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="action-buttons">
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="profile-grid">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`form-group ${
                field.fullWidth ? "full-width" : ""
              }`}
            >
              <label>{field.label}</label>

              {isEditing ? (
                field.type === "textarea" ? (
                  <textarea
                   value={formData?.[field.name] || ""}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                   value={formData?.[field.name] || ""}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                  />
                )
              ) : (
                <div className="field-value">
  {formData?.[field.name] || "-"}
</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;