import React, { useState } from "react";
import "./ProfileView.css";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";
const ProfileView = ({
  initialData,
  fields,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const { avatarUrl } = useAuth();
const authCtx = useAuth();
  const fileInputRef = useRef(null);


  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave?.(formData, formData.id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

const handleAvatarChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  // Update preview immediately
  setFormData((prev) => ({
    ...prev,
    avatarUrl: imageUrl,
  }));

authCtx.setAvatar(imageUrl);

  // If avatarUrl is a state from parent
  // setAvatarUrl(imageUrl);

  // Store file if you need to upload later

};

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <img
            src={
              formData?.avatarUrl ||
              formData?.profilePicture ||
              formData?.imageUrl ||
              avatarUrl
            }
            alt="Profile"
            className="profile-avatar clickable-avatar"
            onClick={() => fileInputRef.current?.click()}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>

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
              className={`form-group ${field.fullWidth ? "full-width" : ""
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